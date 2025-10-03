module.exports = [
  {
    topicPrefix: "aws.mdct.qmr.cdc",
    version: ".v0",
    numPartitions: 1,
    replicationFactor: 3,
    topics: [".coreSet", ".measure", ".rate"],
  },
];
