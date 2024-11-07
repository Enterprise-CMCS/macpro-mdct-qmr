import KafkaSourceLib from "../../../libs/kafka-source-lib";

const version = "v0";
const topicPrefix = "aws.mdct.qmr.cdc";
const tables = [
  { sourceName: process.env.coreSetTable!, topicName: "coreSet" },
  { sourceName: process.env.measureTable!, topicName: "measure" },
  { sourceName: process.env.rateTable!, topicName: "rate" },
];

const postKafkaData = new KafkaSourceLib(topicPrefix, version, tables);

exports.handler = postKafkaData.handler.bind(postKafkaData);
