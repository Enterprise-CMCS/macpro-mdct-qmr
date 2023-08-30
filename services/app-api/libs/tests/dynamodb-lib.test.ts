import dynamoLib, { createDbClient } from "../dynamodb-lib";
import { CoreSetAbbr, MeasureStatus } from "../../types";
import AWS from "aws-sdk";

const mockPromiseCall = jest.fn();
const mockScanPromiseCall = jest
  .fn()
  .mockReturnValue({})
  .mockReturnValueOnce({ LastEvaluatedKey: { key: "val" } });

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
          scan: (x: any) => ({ promise: mockScanPromiseCall }),
          update: (x: any) => ({ promise: mockPromiseCall }),
          delete: (x: any) => ({ promise: mockPromiseCall }),
        };
      }),
    },
  },
}));

describe("Test DynamoDB Interaction API Build Structure", () => {
  test("API structure should be callable", async () => {
    const testKeyTable = {
      Key: { compoundKey: "testKey", coreSet: CoreSetAbbr.ACS },
      TableName: "testTable",
    };
    const testItem = {
      compoundKey: "dynamoKey",
      state: "FL",
      year: 2019,
      coreSet: CoreSetAbbr.ACS,
      measure: "event!.pathParameters!.measure!",
      createdAt: Date.now(),
      lastAltered: Date.now(),
      lastAlteredBy: `event.headers["cognito-identity-id"]`,
      status: MeasureStatus.COMPLETE,
      description: "",
      data: {},
    };
    await dynamoLib.query(true);
    await dynamoLib.get(testKeyTable);
    await dynamoLib.delete(testKeyTable);
    await dynamoLib.put({ TableName: "testTable", Item: testItem });
    await dynamoLib.scan({
      ...testKeyTable,
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    });
    await dynamoLib.scanOnce({
      ...testKeyTable,
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    });
    await dynamoLib.update({
      ...testKeyTable,
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    });
    await dynamoLib.post({
      TableName: "",
      Item: testItem,
    });

    expect(mockPromiseCall).toHaveBeenCalledTimes(6);
    expect(mockScanPromiseCall).toHaveBeenCalledTimes(3);
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
        accessKeyId: "LOCALFAKEKEY", // pragma: allowlist secret
        secretAccessKey: "LOCALFAKESECRET", // pragma: allowlist secret
      });
    });
  });
});
