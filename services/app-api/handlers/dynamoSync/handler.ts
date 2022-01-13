import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import aws from "aws-sdk";
import { parseAsync } from "json2csv";
import { flatten } from "flat";
import AWS from "aws-sdk";

export const syncDynamoToS3 = handler(async (event, context) => {
  const results = await dynamoDb.scan({
    TableName: process.env.measureTableName!,
  });

  const flattenedArray: any = results.Items?.map((item) => {
    return flatten(item);
  });

  //convert to csv
  const csvData = await parseAsync(flattenedArray);
  console.log(`The following data is about to be uploaded to S3: ${csvData}`);

  const bucket = new AWS.S3();

  const s3Promise = new Promise((resolve, reject) => {
    bucket.upload(
      {
        Bucket: process.env.uploadS3BucketName!,
        Key: "test.csv",
        Body: csvData,
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

  const data = await s3Promise;
  console.log(data);
});
