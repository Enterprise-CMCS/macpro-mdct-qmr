import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  DynamoDBDocumentPaginationConfiguration,
  paginateQuery,
  paginateScan,
  Paginator,
  QueryCommandInput,
  QueryCommandOutput,
  ScanCommandInput,
  ScanCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { logger } from "./logger.js";

const dynamoClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: "us-east-1",
    logger: {
      debug: () => {},
      info: () => {},
      warn: logger.warn,
      error: logger.error,
    },
  })
);

type PaginationConfigWithOptionalClient = Omit<
  DynamoDBDocumentPaginationConfiguration,
  "client"
> &
  Partial<Pick<DynamoDBDocumentPaginationConfiguration, "client">>;

/**
 * Helper method for performing a scan.
 *
 * Takes the same parameters as `paginateScan()`,
 * but yields individual items rather than pages of them.
 * Performs informational logging as it runs.
 *
 * The `client` config parameter is optional; one will be provided for you.
 */
export const iterateScan = <T>(
  { client = dynamoClient, ...config }: PaginationConfigWithOptionalClient,
  input: ScanCommandInput
) => {
  return iteratePageItems<T>(paginateScan({ ...config, client }, input));
};

/**
 * Helper method for performing a query.
 *
 * Takes the same parameters as `paginateQuery()`,
 * but yields individual items rather than pages of them.
 * Performs informational logging as it runs.
 *
 * The `client` config parameter is optional; one will be provided for you.
 */
export const iterateQuery = <T>(
  { client = dynamoClient, ...config }: PaginationConfigWithOptionalClient,
  input: QueryCommandInput
) => {
  return iteratePageItems<T>(paginateQuery({ ...config, client }, input));
};

const iteratePageItems = async function* <T>(
  paginator: Paginator<ScanCommandOutput | QueryCommandOutput>
) {
  let itemCount = 0;
  let pageCount = 0;
  for await (const page of paginator) {
    pageCount += 1;
    logger.info(`Processing query result page ${pageCount}...`);

    const items = (page.Items ?? []) as T[];
    itemCount += items.length;

    yield* items;
  }
  logger.info(`Processed ${itemCount} query results.`);
};

type BatchWriteParameters<T> = {
  /**
   * The client through which the Dynamo commands should be sent.
   * Optional; one will be provided for you.
   */
  client?: DynamoDBDocumentClient;

  /** The items to be stored. */
  itemIterator: AsyncGenerator<T>;

  /** The DynamoDB table into which the items should be Put. */
  TableName: string;

  /** Get identifying information for a specific item. Used for logging. */
  keySelector: (item: T) => string;

  /**
   * The number of items to include in each `BatchWriteCommand`.
   * The default is 25, because that's the maximum allowed by DynamoDB.
   */
  batchSize?: number;
};

/** Use (a) BatchWriteCommand(s) to store the given items. */
export const batchWriteItems = async <T extends object>({
  client = dynamoClient,
  itemIterator,
  TableName,
  keySelector,
  batchSize = 25,
}: BatchWriteParameters<T>) => {
  const createBatches = async function* () {
    let batch: T[] = [];
    for await (const item of itemIterator) {
      batch.push(item);
      if (batch.length >= batchSize) {
        yield batch;
        batch = [];
      }
    }
    if (batch.length > 0) {
      yield batch;
    }
  };

  let batchCount = 0;
  let successCount = 0;
  try {
    for await (const batch of createBatches()) {
      batchCount += 1;
      logger.debug(`Writing batch ${batchCount}...`);
      const command = new BatchWriteCommand({
        RequestItems: {
          [TableName]: batch.map((Item) => ({ PutRequest: { Item } })),
        },
      });
      const response = await client.send(command);
      const failures = response.UnprocessedItems?.[TableName];
      if (failures && failures.length > 0) {
        const ids = failures.map((req) =>
          keySelector(req.PutRequest!.Item as T)
        );
        successCount += batch.length - failures.length;
        throw new Error(`Failed to write item(s): [${ids}]`);
      }
      successCount += batch.length;
    }
  } finally {
    logger.info(`${successCount} item(s) written to the database.`);
  }
};
