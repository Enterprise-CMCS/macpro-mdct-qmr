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

const arrayToCsv = async (scanResult) => {
  const flattenedResults = scanResult.map((item) => flatten(item));
  const resultsCsvData = await parseAsync(flattenedResults);
  return resultsCsvData;
};

const uploadFileToS3 = async (client, filePath, scanResult) => {
  const uploadParams = {
    Bucket: process.env.dynamoSnapshotS3BucketName,
    Key: filePath,
    Body: scanResult,
  };
  try {
    await client.send(new PutObjectCommand(uploadParams));
    console.log(`File uploaded to: ${filePath}`);
  } catch (err) {
    throw err;
  }
};

const cleanupFolders = async (client) => {
  const paths = ["CSVmeasures", "CSVcoreSet", "CSVrate"];

  for (const folder of paths) {
    const path = `coreSetData/${folder}/`;
    const params = {
      Bucket: process.env.dynamoSnapshotS3BucketName,
      Prefix: path,
      MaxKeys: 1000, // Limited by 1000 per delete
    };
    const response = await client.send(new ListObjectsV2Command(params));
    console.log(response);
    const files = response.Contents.map((file) => file.Key);
    console.log("Files found:");
    console.log(files);

    const cutOffDate = new Date();
    cutOffDate.setMonth(cutOffDate.getMonth() - 3);

    const outdated = files.filter((file) => {
      const dateString = file.split("/").pop().slice(0, -4);
      return new Date(parseInt(dateString)) < cutOffDate;
    });

    console.log("Files to delete:");
    console.log(outdated);

    if (outdated.length <= 0) continue;
    const deleteParams = {
      Bucket: process.env.dynamoSnapshotS3BucketName,
      Delete: {
        Objects: outdated.map((file) => ({ Key: file })),
      },
    };
    await client.send(new DeleteObjectsCommand(deleteParams));
  }
};

const syncDynamoToS3 = handler(async (_event, _context) => {
  const client = new S3Client({ region: "us-east-1" });

  console.log("Syncing Dynamo to Uploads");
  const measureResults = await scanAll(process.env.measureTable);
  const coreSetResults = await scanAll(process.env.coreSetTable);
  const rateResults = await scanAll(process.env.rateTableName);

  const measureCsv = await arrayToCsv(measureResults);
  await uploadFileToS3(
    client,
    `coreSetData/CSVmeasures/${Date.now()}.csv`,
    measureCsv
  );
  await uploadFileToS3(
    client,
    `coreSetData/JSONmeasures/${Date.now()}.json`,
    JSON.stringify(measureResults)
  );
  console.log("Uploaded measures file to s3");

  const coreSetCsv = await arrayToCsv(coreSetResults);
  await uploadFileToS3(
    client,
    `coreSetData/CSVcoreSet/${Date.now()}.csv`,
    coreSetCsv
  );
  await uploadFileToS3(
    client,
    `coreSetData/JSONcoreSet/${Date.now()}.json`,
    JSON.stringify(coreSetResults)
  );
  console.log("Uploaded coreSet file to s3");

  const rateCsv = await arrayToCsv(rateResults);
  await uploadFileToS3(
    client,
    `coreSetData/CSVrate/${Date.now()}.csv`,
    rateCsv
  );
  await uploadFileToS3(
    client,
    `coreSetData/JSONrate/${Date.now()}.json`,
    JSON.stringify(rateResults)
  );
  console.log("Uploaded rate file to s3");

  await cleanupFolders(client);
});

module.exports = {
  syncDynamoToS3: syncDynamoToS3,
};
