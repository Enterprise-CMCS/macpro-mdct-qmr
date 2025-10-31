/* eslint-disable no-console */
import * as readline from "readline";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  paginateScan,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

/** Possibly overwritten by user input */
let stage = "local";

// As recommended by https://stackoverflow.com/a/68504470
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const promptString = (query: string) =>
  new Promise<string>((resolve) => rl.question(query, resolve));
const promptYesNo = async (query: string) => {
  do {
    const userInput = await promptString(query);
    switch (userInput.toUpperCase()[0]) {
      case "Y":
        return true;
      case "N":
        return false;
      default:
        rl.write("Y or N only, please.\n");
    }
  } while (true);
};

async function remove2023QualifierHPCAD() {
  const isLocal = await promptYesNo(
    "Do you want to run this script locally? Y/N: "
  );
  if (!isLocal) {
    stage = await promptString(
      "What environment are we running on (e.g. master, val, production)? "
    );
  }

  const client = buildClient(isLocal);
  const statesWithHPC: string[] = [];

  console.log("Scanning...");
  for await (let measure of all2023CsqMeasures(client)) {
    if (hasHPC(measure)) {
      statesWithHPC.push(measure.compoundKey);
      console.log(`HPC FOUND! For ${measure.state} (${measure.coreSet})`);
      correctHPC(client, measure);
      console.log(`  - Corrected`);
    }
  }
  console.log("Scan complete");

  return statesWithHPC;
}

function hasHPC(measure: Record<string, any>) {
  if (!measure.data?.CoreSetMeasuresAuditedOrValidatedDetails) {
    return false;
  }
  for (let details of measure.data.CoreSetMeasuresAuditedOrValidatedDetails) {
    if (details.MeasuresAuditedOrValidated?.includes("HPC-AD")) {
      return true;
    }
  }
  return false;
}

async function correctHPC(
  client: DynamoDBDocumentClient,
  measure: Record<string, any>
) {
  const auditDetails = measure.data.CoreSetMeasuresAuditedOrValidatedDetails;
  console.log(measure);
  for (let details of measure.data.CoreSetMeasuresAuditedOrValidatedDetails) {
    const newDetails = details.MeasuresAuditedOrValidated.filter(
      (measureName: string) => measureName !== "HPC-AD"
    );
    details.MeasuresAuditedOrValidated = newDetails;
  }

  const command = new UpdateCommand({
    TableName: `${stage}-measure`,
    Key: {
      compoundKey: measure.compoundKey,
      coreSet: measure.coreSet,
    },
    UpdateExpression: "set #data.#auditDetails = :auditDetails",
    ExpressionAttributeValues: {
      ":auditDetails": auditDetails,
    },
    ExpressionAttributeNames: {
      "#data": "data",
      "#auditDetails": "CoreSetMeasuresAuditedOrValidatedDetails",
    },
  });
  await client.send(command);
}

async function* all2023CsqMeasures(client: DynamoDBDocumentClient) {
  const query = {
    TableName: `${stage}-measure`,
    FilterExpression: "#year = :year AND #measure = :measure",
    ExpressionAttributeNames: {
      "#year": "year",
      "#measure": "measure",
    },
    ExpressionAttributeValues: {
      ":year": 2023,
      ":measure": "CSQ",
    },
  };

  for await (const result of paginateScan({ client }, query)) {
    yield* result.Items ?? [];
  }
}

function buildClient(isLocal: boolean) {
  if (isLocal) {
    return DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: "localhost",
        endpoint: "http://localhost:8000",
        credentials: {
          accessKeyId: "LOCALFAKEKEY", // pragma: allowlist secret
          secretAccessKey: "LOCALFAKESECRET", // pragma: allowlist secret
        },
      })
    );
  } else {
    return DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: "us-east-1",
        logger: {
          debug: () => {
            /* Dynamo's debug logs are extremely noisy */
          },
          info: console.info,
          warn: console.warn,
          error: console.error,
        },
      })
    );
  }
}

remove2023QualifierHPCAD();
