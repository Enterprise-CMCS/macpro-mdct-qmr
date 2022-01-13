import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import aws from "aws-sdk";
import { parseAsync } from "json2csv";
import { flatten } from "flat";
import AWS from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

const csvToS3 = async (
  filePath: string,
  scanResult: PromiseResult<
    aws.DynamoDB.DocumentClient.ScanOutput,
    aws.AWSError
  >
) => {
  const flattenedResults: any = scanResult.Items?.map((item) => flatten(item));
  const resultsCsvData = await parseAsync(flattenedResults);

  console.log(
    `The following data is about to be uploaded to S3: ${resultsCsvData}`
  );

  const bucket = new AWS.S3();

  const s3Promise = new Promise((resolve, reject) => {
    bucket.upload(
      {
        Bucket: process.env.uploadS3BucketName!,
        Key: filePath,
        Body: resultsCsvData,
      },
      function (err: Error, data: aws.S3.ManagedUpload.SendData) {
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

export const syncDynamoToS3 = handler(async (_event, _context) => {
  const measureResults = await dynamoDb.scan({
    TableName: process.env.measureTableName!,
  });

  const coreSetResults = await dynamoDb.scan({
    TableName: process.env.coreSetTableName!,
  });

  await csvToS3(`coreSetData/measures/${Date.now()}.csv`, measureResults);
  console.log("Uploaded measures file to s3");
  await csvToS3(`coreSetData/coreSets/${Date.now()}.csv`, coreSetResults);
  console.log("Uploaded coreSet file to s3");
});
