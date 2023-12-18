const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");

const TABLE_NAME = "local-measures";
const LOCAL = true;

async function lookForMisplacedHPCAD() {
  const client = buildClient();
  const statesWithHPC = [];

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

function hasHPC(measure) {
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

async function correctHPC(client, measure) {
  const auditDetails = measure.data.CoreSetMeasuresAuditedOrValidatedDetails;
  console.log(measure);
  for (let details of measure.data.CoreSetMeasuresAuditedOrValidatedDetails) {
    const newDetails = details.MeasuresAuditedOrValidated.filter(
      (n) => n !== "HPC-AD"
    );
    details.MeasuresAuditedOrValidated = newDetails;
  }

  const command = new UpdateCommand({
    TableName: TABLE_NAME,
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

async function* all2023CsqMeasures(client) {
  const query = {
    TableName: TABLE_NAME,
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
  let ExclusiveStartKey = undefined;

  do {
    const result = await client.send(
      new ScanCommand({ ...query, ExclusiveStartKey })
    );
    if (result.Items) {
      yield* result.Items;
    }
    ExclusiveStartKey = result.LastEvaluatedKey;
  } while (ExclusiveStartKey);
}

function buildClient() {
  if (LOCAL) {
    return DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: "localhost",
        endpoint: "http://localhost:8000",
        accessKeyId: "LOCALFAKEKEY", // pragma: allowlist secret
        secretAccessKey: "LOCALFAKESECRET", // pragma: allowlist secret
      })
    );
  } else {
    return DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: "us-east-1",
      })
    );
  }
}

lookForMisplacedHPCAD();
