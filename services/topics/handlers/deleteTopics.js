/* eslint-disable no-console */
const topics = require("../libs/topics-lib.js");

/**
 * Handler to be triggered in temporary branches by the destroy workflow, cleans up topics with the known namespace format
 * `--${event.project}--${event.stage}--`
 * @param {{ project: string | undefined, stage: string | undefined }} event
 * @param {*} _context
 * @param {*} _callback
 */
exports.handler = async function (event, _context, _callback) {
  console.log("Received event:", JSON.stringify(event, null, 2));

  return await topics.deleteTopics(
    process.env.BOOTSTRAP_BROKER_STRING_TLS.split(","),
    process.env.topicNamespace
  );
};
