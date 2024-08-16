const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  paginateScan,
} = require("@aws-sdk/lib-dynamodb");

const { MeasureTableName } = process.env;

const noöp = () => {};

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: "us-east-1",
    logger: {
      ...console,
      trace: noöp,
      debug: noöp,
      info: noöp,
    },
  })
);

async function scan () {
  console.log("Beginning scan", new Date());

  const memory = new Map();

  const pages = paginateScan(
    { client },
    { TableName: MeasureTableName }
  );
  let pageNumber = 0;
  for await (let page of pages) {
    pageNumber += 1;
    console.log("Scanning page #" + pageNumber);
    for (let measure of page.Items ?? []) {
      const DataSource = measure?.data?.DataSource;
      if (DataSource === undefined) {
        continue;
      }

      function remember (source) {
        const { state, year, measure: abbr } = measure;
        const stats = memory.get(source);
        if (!stats) {
          memory.set(source, {
            source,
            count: 1,
            years: new Set([year]),
            measures: new Set([abbr]),
            states: new Set([state]),
          });
        }
        else {
          stats.count += 1;
          stats.years.add(year);
          stats.measures.add(abbr);
          stats.states.add(state);
        }
      }

      if (!Array.isArray(DataSource)) {
        remember(DataSource);
      }
      else {
        for (let source of DataSource) {
          remember(`[${source}]`);
        }
      }
    }
  }

  console.log(memory);
  console.log("Scan complete", new Date());
};

scan();
