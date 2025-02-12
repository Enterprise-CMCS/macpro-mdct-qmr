import dynamodbLib from "../../libs/dynamodb-lib";
import { CombinedRatesTableEntry } from "../../types";
import { calculateAndPutRate } from "./rateCalculations";

/**
 * This is a data migration function for the combined rates table.
 * During development of the feature, we broke the calculation for PQI measures.
 * The broken calculation was deployed all the way to production,
 * and states submitted data against it.
 *
 * The measure data itself is not affected,
 * but the Combined Rates page for any PQI measure will display
 * a rate that is 1000x smaller than it should be.
 *
 * Now that the calculation is fixed,
 * this migration will correct all existing combined rate entries.
 *
 * IN ORDER TO RUN THIS SCRIPT YOU MUST SET THESE ENVIRONMENT VARIABLES
 *   - rateTable (eg "val-rate")
 *   - measureTable (eg "val-measure")
 * AND UNCOMMENT THE `main()` CALL AT THE BOTTOM
 */
export const main = async () => {
  try {
    console.info("Scanning for existing combined rates");

    const allExistingRates = await dynamodbLib.scanAll<CombinedRatesTableEntry>(
      {
        TableName: process.env.rateTable,
      }
    );
    console.info(`Found ${allExistingRates.length} existing rates`);

    const ratesNeedingMigration = allExistingRates.filter((rate) =>
      rate.measure.startsWith("PQI")
    );
    console.info(`Of those, ${ratesNeedingMigration.length} are PQI`);

    for (let rate of ratesNeedingMigration) {
      const { state, year, coreSet, measure } = rate;
      const parameters = { state, year, coreSet, measure };
      console.info(`Processing rate ${JSON.stringify(parameters)}`);

      // The combined core set is either ACS or CCS.
      // We can build a separated core set abbr by adding "M" or "C",
      // and it doesn't matter which. An update for either will combine both.
      await calculateAndPutRate({ ...parameters, coreSet: coreSet + "M" });
      console.info("Calculation complete.");
    }

    console.info("Migration complete!");
    return { status: 200 };
  } catch (err) {
    console.error("Error!", err);
    return { status: 500 };
  }
};

// main(); // <- uncomment this to make the script actually, like, do stuff
