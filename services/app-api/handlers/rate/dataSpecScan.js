const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  paginateScan,
} = require("@aws-sdk/lib-dynamodb");

const { MeasureTableName } = process.env;
const region = "us-east-1";
const noöp = () => {};
const logger = {
  ...console,
  trace: noöp,
  debug: noöp,
  info: noöp,
};

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region, logger })
);

async function scan () {
  console.log("Beginning scan", new Date());

  const specs = new Map();

  const pages = paginateScan(
    { client },
    { TableName: MeasureTableName }
  );
  let pageNumber = 0;
  for await (let page of pages) {
    pageNumber += 1;
    console.log("Scanning page #" + pageNumber);
    for (let measure of page.Items ?? []) {
      const MeasurementSpecification = measure?.data?.MeasurementSpecification;
      if (MeasurementSpecification === undefined) {
        continue;
      }

      function remember (map, key) {
        const { state, year, measure: abbr } = measure;
        const stats = map.get(key);
        if (!stats) {
          map.set(key, {
            source: key,
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

      if (typeof MeasurementSpecification !== "string") {
        throw new Error("Unexpected type for MeasurementSpecification! type " + typeof MeasurementSpecification + ", value " + MeasurementSpecification.toString());
      }
      remember(specs, MeasurementSpecification);
    }
  }

  console.log("specs:")
  console.log(prettifyMap(specs));
  console.log("Scan complete", new Date());
};

function prettifyMap (map) {
  return [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, { count, states, years, measures }]) =>
      [
        key,
        "count: " + count,
        "states: " + prettifySet(states),
        "years: " + prettifySet(years),
        "measures: " + prettifySet(measures),
      ].join("\n    ")
    ).join("\n") + "\n\n";
}

function prettifySet(set) {
  return prettifyArray([...set]);
}

function prettifyArray (arr) {
  arr.sort();
  if (arr.length <= 5) {
    return arr.join(", ");
  }
  return arr.slice(0, 5).join(", ") + `... (${arr.length} total)`;
}

scan();
