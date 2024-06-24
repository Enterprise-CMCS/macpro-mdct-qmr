const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { handler } = require("../libs/handler-lib");
const { scan } = require("../libs/dynamodb-lib");
const { flatten } = require("flat");
const { parseAsync } = require("json2csv");

const csvToS3 = async (scanResult) => {
  const flattenedResults = scanResult.map((item) => flatten(item));
  const resultsCsvData = await parseAsync(flattenedResults);
  return resultsCsvData;
};

const uploadFileToS3 = async (filePath, scanResult) => {
  const client = new S3Client({ region: "us-east-1" });
  const uploadParams = {
    Bucket: process.env.dynamoSnapshotS3BucketName,
    Key: filePath,
    Body: scanResult,
  };
  try {
    await client.send(new PutObjectCommand(params)),
      console.log(`File (${data.Key}) uploaded to: ${data.Location}`);
  } catch (err) {
    throw err;
  }
};

const scanAll = async (TableName) => {
  let startingData = await scan({
    TableName,
  });
  let dataList = startingData.Items;
  let ExclusiveStartKey = startingData.LastEvaluatedKey;

  while (ExclusiveStartKey) {
    const params = {
      TableName,
      ExclusiveStartKey,
    };

    const results = await scan(params);
    ExclusiveStartKey = results.LastEvaluatedKey;
    dataList = [...results.Items, ...dataList];
    console.log(results);
  }
  return dataList;
};

const syncDynamoToS3 = handler(async (_event, _context) => {
  console.log("Syncing Dynamo to Uploads");
  const measureScanResults = await scanAll(process.env.measureTableName);
  const coreSetScanResults = await scanAll(process.env.coreSetTableName);
  const rateScanResults = await scanAll(process.env.rateTableName);
  const measureResults = measureScanResults ? measureScanResults : [];
  const coreSetResults = coreSetScanResults ? coreSetScanResults : [];
  const rateResults = rateScanResults ? rateScanResults : [];

  const measureCsv = await csvToS3(measureResults);
  await uploadFileToS3(`coreSetData/CSVmeasures/${Date.now()}.csv`, measureCsv);
  await uploadFileToS3(
    `coreSetData/JSONmeasures/${Date.now()}.json`,
    JSON.stringify(measureResults)
  );
  console.log("Uploaded measures file to s3");

  const coreSetCsv = await csvToS3(coreSetResults);
  await uploadFileToS3(`coreSetData/CSVcoreSet/${Date.now()}.csv`, coreSetCsv);
  await uploadFileToS3(
    `coreSetData/JSONcoreSet/${Date.now()}.json`,
    JSON.stringify(coreSetResults)
  );
  console.log("Uploaded coreSet file to s3");

  const rateCsv = await csvToS3(rateResults);
  await uploadFileToS3(`coreSetData/CSVrate/${Date.now()}.csv`, rateCsv);
  await uploadFileToS3(
    `coreSetData/JSONrate/${Date.now()}.json`,
    JSON.stringify(rateResults)
  );
  console.log("Uploaded rate file to s3");
});
module.exports = {
  syncDynamoToS3: syncDynamoToS3,
};
