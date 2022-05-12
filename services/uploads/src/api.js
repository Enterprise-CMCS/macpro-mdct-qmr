const utils = require("./utils");
const av = require("./antivirus");
const constants = require("./constants");
const s3 = new AWS.S3();

async function lambdaHandleEvent(event, context) {
  let s3ObjectKey = utils.extractKeyFromApiEvent(event);
  let s3ObjectBucket = utils.extractBucketFromApiEvent(event);

  try {
    await s3
      .putObjectTagging({
        Bucket: s3ObjectBucket,
        Key: s3ObjectKey,
        Tagging: {
          TagSet: [
            {
              Key: constants.VIRUS_STATUS_STATUS_KEY,
              Value: "PENDING",
            },
          ],
        },
      })
      .promise();
    utils.generateSystemMessage("PENDING TAG APPLIED");
  } catch (e) {
    console.log(e);
    utils.generateSystemMessage("PENDING TAG ERROR");
  }

  let virusScanStatus = (await av.isS3FileTooBig(s3ObjectKey, s3ObjectBucket))
    ? constants.STATUS_SKIPPED_FILE
    : await av.scanS3Object(s3ObjectKey, s3ObjectBucket);

  return virusScanStatus;
}

module.exports = {
  lambdaHandleEvent: lambdaHandleEvent,
};
