/* eslint-disable no-console */
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { Kafka, Producer } from "kafkajs";

type KafkaPayload = {
  key: string;
  value: string;
  partition: number;
  headers: {
    eventName: string;
    eventTime?: string;
    eventID?: string;
  };
};
type SourceTopicMapping = {
  sourceName: string;
  topicName: string;
};

let kafka: Kafka;
let producer: Producer;

class KafkaSourceLib {
  /*
   * Event types:
   * cmd – command; restful publish
   * cdc – change data capture; record upsert/delete in data store
   * sys – system event; send email, archive logs
   * fct – fact; user activity, notifications, logs
   *
   * topicPrefix = "[data_center].[system_of_record].[business_domain].[event_type]";
   * version = "some version";
   * tables = [list of table mappings];
   */

  topicPrefix: string;
  version: string | null;
  tables: SourceTopicMapping[];
  connected: boolean;
  topicNamespace: string;
  stage: string;
  constructor(
    topicPrefix: string,
    version: string | null,
    tables: SourceTopicMapping[]
  ) {
    if (!process.env.BOOTSTRAP_BROKER_STRING_TLS) {
      throw new Error("Missing Broker Config. ");
    }
    // Setup vars
    this.stage = process.env.STAGE ? process.env.STAGE : "";
    this.topicNamespace = process.env.topicNamespace
      ? process.env.topicNamespace
      : "";
    this.topicPrefix = topicPrefix;
    this.version = version;
    this.tables = tables;

    const brokerStrings = process.env.BOOTSTRAP_BROKER_STRING_TLS;
    kafka = new Kafka({
      clientId: `qmr-${this.stage}`,
      brokers: brokerStrings!.split(","),
      retry: {
        initialRetryTime: 300,
        retries: 8,
      },
      ssl: {
        rejectUnauthorized: false,
      },
    });

    // Attach Events
    producer = kafka.producer();
    this.connected = false;
    const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2", "beforeExit"];
    signalTraps.map((type) => {
      process.removeListener(type, producer.disconnect);
    });
    signalTraps.map((type) => {
      process.once(type, producer.disconnect);
    });
  }

  stringify(e: any, prettyPrint?: boolean) {
    if (prettyPrint === true) return JSON.stringify(e, null, 2);
    return JSON.stringify(e);
  }

  /**
   * Checks if a streamArn is a valid topic. Returns undefined otherwise
   * @param streamARN - DynamoDB streamARN
   * @returns
   */
  determineDynamoTopicName(streamARN: string) {
    for (const table of this.tables) {
      if (streamARN.includes(`/${table.sourceName}/`))
        return this.topic(table.topicName);
    }
    console.log(`Topic not found for table arn: ${streamARN}`);
  }

  unmarshall(r: any) {
    if (!r) return {};
    return unmarshall(r);
  }

  createDynamoPayload(record: any): KafkaPayload {
    const dynamodb = record.dynamodb;
    const { eventID, eventName } = record;
    const dynamoRecord = {
      NewImage: this.unmarshall(dynamodb.NewImage),
      OldImage: this.unmarshall(dynamodb.OldImage),
      Keys: this.unmarshall(dynamodb.Keys),
    };
    return {
      key: Object.values(dynamoRecord.Keys).join("#"),
      value: this.stringify(dynamoRecord),
      partition: 0,
      headers: { eventID: eventID, eventName: eventName },
    };
  }

  topic(t: string) {
    if (this.version) {
      return `${this.topicNamespace}${this.topicPrefix}.${t}.${this.version}`;
    } else {
      return `${this.topicNamespace}${this.topicPrefix}.${t}`;
    }
  }

  async createOutboundEvents(records: any[]) {
    let outboundEvents: { [key: string]: any } = {};
    for (const record of records) {
      let payload, topicName;
      topicName = this.determineDynamoTopicName(
        String(record.eventSourceARN.toString())
      );
      if (!topicName) continue;
      payload = this.createDynamoPayload(record);

      //initialize configuration object keyed to topic for quick lookup
      if (!(outboundEvents[topicName] instanceof Object))
        outboundEvents[topicName] = {
          topic: topicName,
          messages: [],
        };

      //add messages to messages array for corresponding topic
      outboundEvents[topicName].messages.push(payload);
    }
    return outboundEvents;
  }

  async handler(event: any) {
    if (!this.connected) {
      await producer.connect();
      this.connected = true;
    }

    // Warmup events have no records.
    if (!event.Records) {
      console.log("No records to process. Exiting.");
      return;
    }

    // if dynamo
    const outboundEvents = await this.createOutboundEvents(event.Records);

    const topicMessages = Object.values(outboundEvents);
    console.log(`Batch configuration: ${this.stringify(topicMessages, true)}`);

    if (topicMessages.length > 0) await producer.sendBatch({ topicMessages });
    console.log(`Successfully processed ${event.Records.length} records.`);
  }
}

export default KafkaSourceLib;
