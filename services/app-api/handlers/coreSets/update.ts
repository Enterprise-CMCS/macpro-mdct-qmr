import handler from "../../libs/handler-lib";
import dynamoDb from "../../libs/dynamodb-lib";
import aws from "aws-sdk";
import { parseAsync } from "json2csv";
import { flatten } from "flat";

export const editCoreSet = handler(async (event, context) => {
  const results = await dynamoDb.scan({
    TableName: process.env.measureTableName!,
  });

  const flattenedArray: any = results.Items?.map((item) => {
    return flatten(item);
  });

  //flatten
  const flattenedJson = flatten<any, any>(results.Items![0]);

  //convert to csv
  const csvData = await parseAsync(flattenedArray);
  console.log(`The following data is about to be uploaded to S3: ${csvData}`);
  return csvData;
  //upload file
  const bucket = new aws.S3();

  bucket.upload(
    {
      Bucket: process.env.uploadS3BucketName!,
      Key: "test.csv",
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
