import { logger } from "../../libs/debug-lib";
import dynamodbLib from "../../libs/dynamodb-lib";
import { CombinedRatesTableEntry } from "../../types";
import { calculateAndPutRate } from "./rateCalculations";

/**
 * This is a data migration function for the rates table.
 * During development of the feature, we changed the shape of its data.
 * This script will look at every entry in the table and,
 * if it is the old shape, recompute it from scratch and overwrite it.
 *
 * We should only need to run this twice: once in DEV, and once in VAL.
 * The API version that produced the old data shape was never active in PROD.
 *
 * Once this script has been run, delete it! It should be idempotent but
 * there is no need to keep it around. Be sure to delete the function from
 * app-api/serverless.yml as well.
 */
export const main = async () => {
  try {
    logger.info("Scanning for existing combined rates");

    const allExistingRates = await dynamodbLib.scanAll<CombinedRatesTableEntry>(
      {
        TableName: process.env.rateTable,
      }
    );
    logger.info(`Found ${allExistingRates.length} existing rates`);

    // The new shape for combined rates has an "AdditionalValues" property.
    // If a rate doesn't have that property, it's the old shape.
    const ratesNeedingMigration = allExistingRates.filter((rate) =>
      rate.measure.startsWith("PQI")
    );
    logger.info(`Of those, ${ratesNeedingMigration.length} are PQI`);

    for (let rate of ratesNeedingMigration) {
      const { state, year, coreSet, measure } = rate;
      const parameters = { state, year, coreSet, measure };
      logger.info(`Processing rate ${JSON.stringify(parameters)}`);

      // The combined core set is either ACS or CCS.
      // We can build a separated core set abbr by adding "M" or "C",
      // and it doesn't matter which. An update for either will combine both.
      await calculateAndPutRate({ ...parameters, coreSet: coreSet + "M" });
      logger.info("Calculation complete.");
    }

    logger.info("Migration complete!");
    return { status: 200 };
  } catch (err) {
    logger.error("Error!", err);
    return { status: 500 };
  }
};
