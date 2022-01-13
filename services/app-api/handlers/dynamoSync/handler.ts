import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import aws from "aws-sdk";
import { parseAsync } from "json2csv";
import { flatten } from "flat";

export const syncDynamoToS3 = handler(async (event, context) => {
  const results = await dynamoDb.scan({
    TableName: process.env.coreSetTableName!,
  });

  //flatten
  const flattenedJson = flatten<any, any>(results.Items);

  //convert to csv
  const csvData = await parseAsync(flattenedJson);
  console.log(`The following data is about to be uploaded to S3: ${csvData}`);

  //upload file
  const bucket = new aws.S3();

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
