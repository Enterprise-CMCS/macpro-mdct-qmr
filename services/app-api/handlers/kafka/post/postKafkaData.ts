import KafkaSourceLib from "../../../libs/kafka-source-lib";

const version = "v0";
const topicPrefix = "aws.mdct.qmr.cdc";
const tables = [
  { sourceName: process.env.QualityCoreSetsTable!, topicName: "coreSet" },
  { sourceName: process.env.MeasuresTable!, topicName: "measure" },
  { sourceName: process.env.CombinedRatesTable!, topicName: "rate" },
];

const postKafkaData = new KafkaSourceLib(topicPrefix, version, tables);

exports.handler = postKafkaData.handler.bind(postKafkaData);
