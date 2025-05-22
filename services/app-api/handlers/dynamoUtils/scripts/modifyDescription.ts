import prompt from "prompt-sync";
import dynamoDb from "../../../libs/dynamodb-lib";
import { states } from "../../../utils/constants/constants";

// the year, environment, measure, and text to change to need to be passed in
const fetchMeasuresByName = async () => {
  const p = prompt();

  const coreType = p(
    "Enter the measure type (e.g. 'C' for Child, 'A' for Adult): "
  );
  const measureName = p("Name of measure to change: ");
  const year = p("What year would you like to modify: ");
  const tableName = p("What table would you like to modify: ");
  let changeDescriptionTo;

  for (const abbreviation of states) {
    const foundMeasure = (await dynamoDb.queryAll({
      TableName: tableName,
      KeyConditionExpression: "compoundKey = :compoundKey",
      ExpressionAttributeValues: {
        ":compoundKey": `${abbreviation}${year}${
          coreType === "C" ? "CCS" : "ACS"
        }${measureName.toUpperCase()}`,
      },
    })) as any[];

    if (foundMeasure && foundMeasure.length > 0 && !changeDescriptionTo) {
      console.log(`The current description is: ${foundMeasure[0].description}`);
      changeDescriptionTo = p("What would you like to change it to: ");
      console.log(changeDescriptionTo);
    }

    if (foundMeasure && foundMeasure.length > 0 && changeDescriptionTo) {
      foundMeasure[0].description = changeDescriptionTo;
      const params = {
        TableName: tableName,
        Key: {
          compoundKey: foundMeasure[0].compoundKey,
          coreSet: foundMeasure[0].coreSet,
        },
        UpdateExpression: "set #description = :description",
        ExpressionAttributeValues: {
          ":description": changeDescriptionTo,
        },
        ExpressionAttributeNames: {
          "#description": "description",
        },
      };

      await dynamoDb.update(params);

      console.log(
        `Updated description for ${abbreviation} to '${changeDescriptionTo}'`
      );
    }
  }
};

fetchMeasuresByName();

//Follow-Up After Hospitalization for Mental Illness: Age 18 and Older
