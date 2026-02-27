import KafkaSourceLib from "./kafka-source-lib";

let tempNamespace: string | undefined;
let tempBrokers: string | undefined;

const mockSendBatch = jest.fn();
const mockProducer = jest.fn().mockImplementation(() => {
  return {
    disconnect: () => {},
    removeListener: () => {},
    connect: () => {},
    sendBatch: mockSendBatch,
  };
});

jest.mock("kafkajs", () => ({
  Kafka: jest.fn().mockImplementation(() => {
    return { producer: mockProducer };
  }),
}));

const stage = "testing";
const namespace = "--qmr--test-stage--";
const table = { sourceName: `${stage}-aTable`, topicName: "aTable-reports" };
const brokerString = "brokerA,brokerB,brokerC";
const dynamoEvent = {
  Records: [
    {
      eventID: "2",
      eventName: "MODIFY",
      eventVersion: "1.0",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        Keys: {
          Id: {
            N: "101",
          },
        },
        NewImage: {
          Message: {
            S: "This item has changed",
          },
          Id: {
            N: "101",
          },
        },
        OldImage: {
          Message: {
            S: "New item!",
          },
          Id: {
            N: "101",
          },
        },
        SequenceNumber: "222",
        SizeBytes: 59,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN: `somePrefix/${table.sourceName}/someSuffix`,
    },
  ],
};

let consoleSpy: {
  log: jest.SpyInstance<void>;
} = {
  log: jest.fn() as jest.SpyInstance,
};

describe("Test Kafka Lib", () => {
  beforeAll(() => {
    tempNamespace = process.env.topicNamespace;
    tempBrokers = process.env.brokerString;

    process.env.topicNamespace = namespace;
    process.env.brokerString = brokerString;
  });

  afterAll(() => {
    process.env.topicNamespace = tempNamespace;
    process.env.brokerString = tempBrokers;
  });

  beforeEach(() => {
    consoleSpy.log = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Handles a dynamo event", async () => {
    const sourceLib = new KafkaSourceLib("qmr", "v0", [table]);
    await sourceLib.handler(dynamoEvent);
    expect(consoleSpy.log).toHaveBeenCalled();
    expect(mockSendBatch).toBeCalledTimes(1);
  });

  test("Handles events without versions", async () => {
    const sourceLib = new KafkaSourceLib("qmr", null, [table]);
    await sourceLib.handler(dynamoEvent);
    expect(consoleSpy.log).toHaveBeenCalled();
    expect(mockSendBatch).toBeCalledTimes(1);
  });

  test("Does not pass through events from unrelated tables", async () => {
    const sourceLib = new KafkaSourceLib("qmr", "v0", [
      { sourceName: "unrelated-table", topicName: "unrelated-topic" },
    ]);
    await sourceLib.handler(dynamoEvent);
    expect(consoleSpy.log).toHaveBeenCalled();
    expect(mockSendBatch).toBeCalledTimes(0);
  });

  test("Ignores items with bad keys or missing events", async () => {
    const sourceLib = new KafkaSourceLib("qmr", "v0", [table]);
    await sourceLib.handler({});
    expect(consoleSpy.log).toHaveBeenCalled();
    expect(mockSendBatch).toBeCalledTimes(0);
  });

  test("Handles dynamo events with no OldImage", async () => {
    const dynamoInsertEvent = {
      Records: [
        {
          eventSourceARN: `/${table.sourceName}/`,
          eventID: "test-event-id",
          eventName: "INSERT",
          dynamodb: {
            Keys: { foo: { S: "bar" } },
            NewImage: { foo: { S: "bar" } },
            StreamViewType: "NEW_AND_OLD_IMAGES",
          },
        },
      ],
    };
    const sourceLib = new KafkaSourceLib("qmr", "v0", [table]);
    await sourceLib.handler(dynamoInsertEvent);
    expect(consoleSpy.log).toHaveBeenCalled();
    expect(mockSendBatch).toBeCalledWith({
      topicMessages: [
        {
          messages: [
            expect.objectContaining({
              headers: {
                eventID: "test-event-id",
                eventName: "INSERT",
              },
              key: "bar",
              value: `{"NewImage":{"foo":"bar"},"OldImage":{},"Keys":{"foo":"bar"}}`,
            }),
          ],
          topic: "--qmr--test-stage--qmr.aTable-reports.v0",
        },
      ],
    });
  });
});
