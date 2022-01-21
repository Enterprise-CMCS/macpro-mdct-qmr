const handler = require("../libs/handler-lib");
const dynamoDb = require("../dynamodb-lib");
const json2csv = require("json2csv");
const flat = require("flat");
const AWS = require("aws-sdk");

const csvToS3 = async (scanResult) => {
  const flattenedResults = scanResult.map((item) => flat.flatten(item));
  const resultsCsvData = await json2csv.parseAsync(flattenedResults);
  return resultsCsvData;
};

const uploadFileToS3 = async (filePath, scanResult) => {
  const bucket = new AWS.S3();

  const s3Promise = new Promise((resolve, reject) => {
    bucket.upload(
      {
        Bucket: process.env.uploadS3BucketName,
        Key: filePath,
        Body: scanResult,
      },
      function (err, data) {
        if (err) {
          reject(err);
          throw err;
        }
        if (data) {
          resolve(data);
        }
        console.log(`File (${data.Key}) uploaded to: ${data.Location}`);
      }
    );
  });

  return await s3Promise;
};

const scanAll = async (TableName) => {
  let startingData = await dynamoDb.scan({
    TableName,
  });
  let dataList = startingData.Items;
  let ExclusiveStartKey = startingData.LastEvaluatedKey;

  while (ExclusiveStartKey) {
    const params = {
      TableName,
      ExclusiveStartKey,
    };

    const results = await dynamoDb.scan(params);
    ExclusiveStartKey = results.LastEvaluatedKey;
    dataList = [...results.Items, ...dataList];
    console.log(results);
  }
  return dataList;
};

export const syncDynamoToS3 = handler(async (_event, _context) => {
  console.log("Syncing Dynamo to Uploads");
  const measureResults = (await scanAll(process.env.measureTableName)) ?? [];
  const coreSetResults = (await scanAll(process.env.coreSetTableName)) ?? [];

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
});
module.exports = {
  syncDynamoToS3: syncDynamoToS3,
};
