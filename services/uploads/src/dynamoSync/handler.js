/* eslint-disable no-console */
const {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const { handler } = require("../libs/handler-lib");
const { scanAll } = require("../libs/dynamodb-lib");
const { flatten } = require("flat");
const { parseAsync } = require("json2csv");

const client = new S3Client({ region: "us-east-1" });

const arrayToCsv = async (scanResult) => {
  const flattenedResults = scanResult.map((item) => flatten(item));
  const resultsCsvData = await parseAsync(flattenedResults);
  return resultsCsvData;
};

const uploadFileToS3 = async (filePath, scanResult) => {
  const uploadParams = {
    Bucket: process.env.DYNAMO_BUCKET_NAME,
    Key: filePath,
    Body: scanResult,
  };
  await client.send(new PutObjectCommand(uploadParams));
  console.log(`File uploaded to: ${filePath}`);
};

const cleanupFolders = async () => {
  const paths = ["CSVmeasures", "CSVcoreSet", "CSVrate"];

  for (const folder of paths) {
    const path = `coreSetData/${folder}/`;
    const params = {
      Bucket: process.env.DYNAMO_BUCKET_NAME,
      Prefix: path,
      MaxKeys: 1000, // Limited by 1000 per delete
    };
    const response = await client.send(new ListObjectsV2Command(params));
    const files = response.Contents.map((file) => file.Key);

    const cutOffDate = new Date();
    cutOffDate.setDate(cutOffDate.getDate() - 7);

    const outdated = files.filter((file) => {
      const dateString = file.split("/").pop().slice(0, -4);
      return new Date(parseInt(dateString)) < cutOffDate;
    });

    if (outdated.length <= 0) continue;
    const deleteParams = {
      Bucket: process.env.DYNAMO_BUCKET_NAME,
      Delete: {
        Objects: outdated.map((file) => ({ Key: file })),
      },
    };
    await client.send(new DeleteObjectsCommand(deleteParams));
  }
};

const syncDynamoToS3 = handler(async (_event, _context) => {
  console.log("Syncing Dynamo to Uploads");
  let measureResults = await scanAll(process.env.MeasuresTable);
  let coreSetResults = await scanAll(process.env.QualityCoreSetsTable);
  let rateResults = await scanAll(process.env.CombinedRatesTable);

  /*
   * TODO: We currently have to account for legacy compound keys for the measure, coreSet and
   * rate tables until changes are made on the consumer end. We will be able to remove these
   * result reassigments (lines 38-61) once the proper updates are made on the consumer end.
   */
  measureResults = measureResults.map((measureResult) => {
    const { state, year, coreSet, measure } = measureResult;
    const legacyCompoundKey = `${state}${year}${coreSet}${measure}`;
    return {
      ...measureResult,
      compoundKey: legacyCompoundKey,
    };
  });
  coreSetResults = coreSetResults.map((coreSetResult) => {
    const { state, year, coreSet } = coreSetResult;
    const legacyCompoundKey = `${state}${year}${coreSet}`;
    return {
      ...coreSetResult,
      compoundKey: legacyCompoundKey,
    };
  });
  rateResults = rateResults.map((rateResult) => {
    const { state, year, coreSet, measure } = rateResult;
    const legacyCompoundKey = `${state}${year}${coreSet}${measure}`;
    return {
      ...rateResult,
      compoundKey: legacyCompoundKey,
    };
  });

  const measureCsv = await arrayToCsv(measureResults);
  await uploadFileToS3(`coreSetData/CSVmeasures/${Date.now()}.csv`, measureCsv);
  await uploadFileToS3(
    `coreSetData/JSONmeasures/${Date.now()}.json`,
    JSON.stringify(measureResults)
  );
  console.log("Uploaded measures file to s3");

  const coreSetCsv = await arrayToCsv(coreSetResults);
  await uploadFileToS3(`coreSetData/CSVcoreSet/${Date.now()}.csv`, coreSetCsv);
  await uploadFileToS3(
    `coreSetData/JSONcoreSet/${Date.now()}.json`,
    JSON.stringify(coreSetResults)
  );
  console.log("Uploaded coreSet file to s3");

  const rateCsv = await arrayToCsv(rateResults);
  await uploadFileToS3(`coreSetData/CSVrate/${Date.now()}.csv`, rateCsv);
  await uploadFileToS3(
    `coreSetData/JSONrate/${Date.now()}.json`,
    JSON.stringify(rateResults)
  );
  console.log("Uploaded rate file to s3");

  await cleanupFolders();
});

module.exports = {
  syncDynamoToS3: syncDynamoToS3,
};
