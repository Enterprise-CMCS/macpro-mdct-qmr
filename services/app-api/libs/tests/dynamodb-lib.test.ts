import dynamoLib, { getConfig } from "../dynamodb-lib";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";

const dynamoClientMock = mockClient(DynamoDBDocumentClient);

describe("DynamoDB Library", () => {
  let originalUrl: string | undefined;
  beforeAll(() => {
    originalUrl = process.env.DYNAMODB_URL;
  });
  afterAll(() => {
    process.env.DYNAMODB_URL = originalUrl;
  });

  beforeEach(() => {
    dynamoClientMock.reset();
  });

  test("Can put", async () => {
    const mockPut = jest.fn();
    dynamoClientMock.on(UpdateCommand).callsFake(mockPut);

    await dynamoLib.update({ TableName: "foos", Key: { id: "fid" } });

    expect(mockPut).toHaveBeenCalled();
  });

  test("Can get", async () => {
    const mockItem = { foo: "bar" };
    dynamoClientMock.on(GetCommand).resolves({
      Item: mockItem,
    });

    const foo = await dynamoLib.get({ TableName: "foos", Key: { foo: "bar" } });

    expect(foo).toBe(mockItem);
  });

  test("Can query", async () => {
    const mockItem = { foo: "bar" };
    dynamoClientMock.on(QueryCommand).resolves({
      Items: [mockItem],
    });

    const foos = await dynamoLib.queryAll({ TableName: "foos" });

    expect(foos[0]).toBe(mockItem);
  });

  test("Can scan all", async () => {
    const mockKey = {};
    const mockItem1 = { foo: "bar" };
    const mockItem2 = { foo: "baz" };
    const extraCall = jest.fn();
    dynamoClientMock
      .on(ScanCommand)
      .resolvesOnce({ Items: [mockItem1], LastEvaluatedKey: mockKey })
      .callsFakeOnce((command: ScanCommandInput) => {
        expect(command.ExclusiveStartKey).toBe(mockKey);
        return Promise.resolve({ Items: [mockItem2] });
      })
      .callsFake(extraCall);

    const result = await dynamoLib.scanAll({ TableName: "foos" });

    expect(result).toHaveLength(2);
    expect(result[0]).toBe(mockItem1);
    expect(result[1]).toBe(mockItem2);
    expect(extraCall).not.toHaveBeenCalled();
  });

  test("Can update", async () => {
    const mockUpdate = jest.fn();
    dynamoClientMock.on(UpdateCommand).callsFake(mockUpdate);

    await dynamoLib.update({ TableName: "foos", Key: { id: "fid" } });

    expect(mockUpdate).toHaveBeenCalled();
  });

  test("Can delete", async () => {
    const mockDelete = jest.fn();
    dynamoClientMock.on(DeleteCommand).callsFake(mockDelete);

    await dynamoLib.delete({ TableName: "foos", Key: { id: "fid" } });

    expect(mockDelete).toHaveBeenCalled();
  });

  test("Uses local config when appropriate", () => {
    process.env.DYNAMODB_URL = "mock url";
    const config = getConfig();
    expect(config).toHaveProperty("region", "localhost");
  });

  test("Uses AWS config when appropriate", () => {
    delete process.env.DYNAMODB_URL;
    const config = getConfig();
    expect(config).toHaveProperty("region", "us-east-1");
  });
});
