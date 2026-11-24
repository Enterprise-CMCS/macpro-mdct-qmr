import { logger } from "./logger.js";
import { batchWriteItems, iterateScan } from "./migrationUtils.js";

/*
 * This migration updates the stratification specification of existing measures.
 *
 * When we released the 2026 measures, the values of this radio button were
 * "1997-omb", "2024-omb", and "not-reporting". After release, we renamed
 * the second option from "2024-omb" to "state-specific". When we deploy that
 * change, we will also run this migration, so that the appropriate option
 * will stay selected for any states who have already filled out this section.
 *
 * Environment variables:
 * - MeasuresTable: The name of the measures table in this environment
 * - DRY_RUN: Set to any truthy string to prevent database writes.
 *            Omit for the "live" invocation.
 * - Anything needed for AWS auth
 *
 * Example invocation:
 * MeasuresTable=production-measures DRY_RUN=true \
 *   node migrateStratificationSpec.ts
 */

/** Abbreviated version of the real type defined in the app. */
type Measure = {
  compoundKey: string;
  measure: string;
  year: number;
  data?: {
    OptionalMeasureStratification?: {
      version?: string;
    };
  };
};

const TableName = process.env.MeasuresTable!;
const isDryRun = !!process.env.DRY_RUN;

const main = async () => {
  logger.info("Beginning migration...");
  const itemIterator = getModifiedMeasures();
  if (isDryRun) {
    logger.info(
      "This is a DRY RUN. No changes will be saved. The following measures WOULD be modified:"
    );
    for await (const measure of itemIterator) {
      logger.debug(keySelector(measure));
    }
  } else {
    logger.warn("This is a LIVE RUN. Changes WILL be saved to the database.");
    await batchWriteItems({ itemIterator, TableName, keySelector });
  }
  logger.info("Complete!");
};

const keySelector = (meas: Measure) => meas.compoundKey + "#" + meas.measure;

/**
 * Pull all possibly-relevant measures from the database.
 * Change any that need changing, and yield them up to be stored.
 */
const getModifiedMeasures = async function* () {
  // The table structure does not allow us to query by year,
  // so unfortunately we must scan the whole table.
  // In 2026, napkin math says this will be fewer than 150k records.
  // That's a lot, but it's not a disaster.
  const measures = iterateScan<Measure>({}, { TableName });
  for await (const measure of measures) {
    const didModify = modifyMeasure(measure);
    if (didModify) {
      yield measure;
    }
  }
};

/**
 * Change the given measure, modifying the object in place.
 * @returns `true` if a change was made, `false` otherwise.
 */
const modifyMeasure = (measure: Measure) => {
  if (measure.year !== 2026) return false;

  const oms = measure.data?.OptionalMeasureStratification;
  if (oms?.version !== "2024-omb") return false;

  oms.version = "state-specific";
  return true;
};

main();
