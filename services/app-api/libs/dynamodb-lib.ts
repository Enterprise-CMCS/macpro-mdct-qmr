import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommandInput,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput,
  paginateScan,
  paginateQuery,
} from "@aws-sdk/lib-dynamodb";
import { CoreSet, Measure, Banner, CombinedRatesTableEntry } from "../types";
import { logger } from "./debug-lib";

export type QmrDynamoTableType =
  | CoreSet
  | Measure
  | Banner
  | CombinedRatesTableEntry;

const localConfig = {
  endpoint: process.env.DYNAMODB_URL,
  region: "localhost",
  credentials: {
    accessKeyId: "LOCALFAKEKEY", // pragma: allowlist secret
    secretAccessKey: "LOCALFAKESECRET", // pragma: allowlist secret
  },
  logger,
};

const awsConfig = {
  region: "us-east-1",
  logger,
};

export const getConfig = () => {
  return process.env.DYNAMODB_URL ? localConfig : awsConfig;
};

const client = DynamoDBDocumentClient.from(new DynamoDBClient(getConfig()), {
  marshallOptions: { removeUndefinedValues: true },
});

export default {
  put: (params: PutCommandInput) => client.send(new PutCommand(params)),
  get: async <Result extends QmrDynamoTableType>(params: GetCommandInput) => {
    const result = await client.send(new GetCommand(params));
    return result.Item as Result | undefined;
  },
  queryAll: async <Result extends QmrDynamoTableType>(
    params: QueryCommandInput
  ) => {
    let items: Result[] = [];
    for await (let page of paginateQuery({ client }, params)) {
      items = items.concat((page.Items as Result[]) ?? []);
    }
    return items;
  },
  scanAll: async <Result extends QmrDynamoTableType>(
    params: ScanCommandInput
  ) => {
    let items: Result[] = [];
    for await (let page of paginateScan({ client }, params)) {
      items = items.concat((page.Items as Result[]) ?? []);
    }
    return items;
  },
  update: (params: UpdateCommandInput) =>
    client.send(new UpdateCommand(params)),
  delete: (params: DeleteCommandInput) =>
    client.send(new DeleteCommand(params)),
};
