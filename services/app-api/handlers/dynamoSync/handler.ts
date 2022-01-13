import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import aws from "aws-sdk";
import { parseAsync } from "json2csv";

export const syncDynamoToS3 = handler(async (event, context) => {
  const results = await dynamoDb.scan({
    TableName: process.env.coreSetTableName!,
  });

  //convert to csv
  const csvData = await parseAsync(results);
  console.log(`The following data is about to be uploaded to S3: ${csvData}`);

  //upload file
  const bucket = new aws.S3();

  bucket.upload(
    {
      Bucket: process.env.uploadS3BucketName!,
      Key: "filename goes here",
      Body: csvData,
    },
    function (err: Error, data: aws.S3.ManagedUpload.SendData) {
      if (err) {
        throw err;
      }
      console.log(`File (${data.Key}) uploaded to: ${data.Location}`);
    }
  );
});
