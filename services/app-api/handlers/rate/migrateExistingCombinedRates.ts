import { logger } from "../../libs/debug-lib";
import dynamodbLib from "../../libs/dynamodb-lib";
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
    
    const allExistingRates = await dynamodbLib.scanAll<any>({
      TableName: process.env.rateTableName,
    });
    logger.info(`Found ${allExistingRates.length} existing rates`);
    
    // The new shape for combined rates has an "AdditionalValues" property
    const ratesNeedingMigration = allExistingRates
      .filter(rate => !("AdditionalValues" in rate.data));
    logger.info(`Of those, ${ratesNeedingMigration.length} are out-of-date`);

    for (let rate of ratesNeedingMigration) {
      const key = rate.compoundKey;
      if (!key) {
        logger.warn("One of the rates has no compoundKey! That shouldn't be possible.");
        continue;
      }
      const state = key.substring(0, 2);
      const year = key.substring(2, 6);
      // Not all core sets are 3 letters long. But both the combined ones are!
      const coreSet = key.substring(6, 9);
      const measure = key.substring(9);
      const parameters = { state, year, coreSet, measure };
      logger.info(`Processing rate ${JSON.stringify(parameters)}`);

      // The combined core set is either ACS or CCS.
      // We can build a separated core set abbr by adding "M" or "C",
      // and it doesn't matter which.
      await calculateAndPutRate({ ...parameters, coreSet: coreSet + "M" });
      logger.info("Calculation complete.");
    }

    logger.info("Migration complete!");
  }
  catch (err) {
    logger.error("Error!", err);
  }
};
