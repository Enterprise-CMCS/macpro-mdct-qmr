import dynamoLib, { createDbClient } from "../dynamodb-lib";
import { MeasureStatus } from "../../types";
import AWS from "aws-sdk";

const mockPromiseCall = jest.fn();

jest.mock("aws-sdk", () => ({
  __esModule: true,
  default: {
    DynamoDB: {
      DocumentClient: jest.fn().mockImplementation((config) => {
        return {
          get: (x: any) => ({ promise: mockPromiseCall }),
          put: (x: any) => ({ promise: mockPromiseCall }),
          post: (x: any) => ({ promise: mockPromiseCall }),
          query: (x: any) => ({ promise: mockPromiseCall }),
          scan: (x: any) => ({ promise: mockPromiseCall }),
          update: (x: any) => ({ promise: mockPromiseCall }),
          delete: (x: any) => ({ promise: mockPromiseCall }),
        };
      }),
    },
  },
}));

describe("Test DynamoDB Interaction API Build Structure", () => {
  test("API structure should be callable", () => {
    dynamoLib.get(true);
    dynamoLib.put(true);
    dynamoLib.query(true);
    dynamoLib.scan(true);
    dynamoLib.update(true);
    dynamoLib.delete(true);
    dynamoLib.post({
      TableName: "",
      Item: {
        compoundKey: "dynamoKey",
        state: "FL",
        year: 2019,
        coreSet: "event!.pathParameters!.coreSet!",
        measure: "event!.pathParameters!.measure!",
        createdAt: Date.now(),
        lastAltered: Date.now(),
        lastAlteredBy: `event.headers["cognito-identity-id"]`,
        status: MeasureStatus.COMPLETE,
        description: "",
        ///@ts-ignore
        data: {},
      },
    });

    expect(mockPromiseCall).toHaveBeenCalledTimes(7);
  });

  describe("Checking Environment Variable Changes", () => {
    test("Check if statement with DYNAMADB_URL undefined", () => {
      process.env = { ...process.env, DYNAMODB_URL: undefined };
      jest.resetModules();

      createDbClient();
      expect(AWS.DynamoDB.DocumentClient).toHaveBeenCalledWith({
        region: "us-east-1",
      });
    });

    test("Check if statement with DYNAMADB_URL set", () => {
      process.env = { ...process.env, DYNAMODB_URL: "endpoint" };
      jest.resetModules();

      createDbClient();
      expect(AWS.DynamoDB.DocumentClient).toHaveBeenCalledWith({
        endpoint: "endpoint",
        accessKeyId: "LOCAL_FAKE_KEY",
        secretAccessKey: "LOCAL_FAKE_SECRET",
      });
    });
  });
});
