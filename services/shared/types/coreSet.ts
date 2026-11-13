/**
 * The shape of an item in the coreSet table.
 *
 * There are 2-7 core sets per state per year: 1 or 2 adult core sets,
 * 1 or 2 child core sets, and (historically) up to 3 health home core sets.
 *
 * A core set contains several dozen Measures.
 *
 * PLEASE NOTE the difference between `CoreSetIdentifier` and `CoreSetAbbr`!
 */
export type CoreSet = {
  /** Includes state and year. The Dynamo partition key. @example "AK2021" */
  compoundKey: string;

  /** Which U.S. state does this core set belong to? @example "AK" */
  state: string;

  /** Which year does this core set pertain to? @example 2021 */
  year: number;

  /** What kind of core set is this? @example "ACS" "CCSC" "HHCS_18-006" */
  coreSet: CoreSetIdentifier;

  /**
   * Is this core set in progress? Has it been submitted?
   *
   * This property is absent on core sets which have not yet been started.
   * It is first set at update time, not at creation time.
   * @example "in progress"
   */
  status?: CoreSetStatus;

  submitted?: boolean;

  /**
   * How many measures does this core set contain? How many are complete?
   * @example { numAvailable: 35, numComplete: 13 }
   */
  progress: {
    numAvailable: number;
    numComplete: number;
  };

  /**
   * When was this core set created? Milliseconds since epoch.
   *
   * Note that core set creation happens lazily, _on first fetch_.
   * They don't exist until the first time a user loads the Core Sets page
   * (specifically, the first time `/coreset/{state}/{year}/list` is called).
   *
   * The exception is HHCS core sets, which are created manually by users.
   * @example 625825800000
   */
  createdAt: number;

  /**
   * When was this core set most recently modified? Milliseconds since epoch.
   *
   * If it has not been modified, this should match the creation time.
   * @example 1792185898472
   */
  lastAltered: number;

  /**
   * Which user performed the most recent modification?
   *
   * If it has not been modified, this is the `cognito-identity-id`
   * from the creation event (likely a call to `getAllCoreSets()`).
   * Otherwise, it is the user's first and last name from the last update event.
   * @example "Ben Martin"
   */
  lastAlteredBy?: string;
};

export const CoreSetStatuses = {
  InProgress: "in progress",
  Submitted: "submitted",
} as const;

export type CoreSetStatus =
  (typeof CoreSetStatuses)[keyof typeof CoreSetStatuses];

export function isCoreSetStatus(x: unknown): x is CoreSetStatus {
  return Object.values(CoreSetStatuses).includes(x as any);
}

/**
 * Indicates which kind of core set you're looking at.
 *
 * From a business perspective, there are five kinds of core sets:
 * Adult, Adult CHIP, Child, Child CHIP, and Health Home.
 *
 * We have seven. When a state has only one Adult core set, we call it ACS.
 * When they report CHIP separately, we call their two core sets ACSM & ACSC
 * (Adult Core Set Medicaid and Adult Core Set CHIP).
 *
 * Again, for emphasis: From a business perspective there is no difference
 * between "Adult" and "Adult Medicaid". The distinction only exists
 * in our code, for the convenience of our code.
 *
 * However, there are more than seven possible `CoreSetIdentifier` values;
 * this type is a `string` and not a more limited `enum`.
 * This is because Health Home identifiers include an underscore, followed by
 * the state-specific program ID, also known as a State Plan Amendment ID.
 * Some states don't have these; some states have more than one.
 * The full list, which varies by year, can be found in `spaLib.ts`
 *
 * @example
 * "ACS" // Adult Core Set
 * "ACSM" // Adult Core Set - Medicaid
 * "ACSC" // Adult Core Set - Children's Health Insurance Program
 * "CCS" // Child Core Set
 * "CCSM" // Child Core Set - Medicaid
 * "CCSC" // Child Core Set - Children's Health Insurance Program
 * "HHCS_22-0036" // Health Home Core Set (in Minnesota, in 2024)
 * "HHCS_24-0025" // (HHCS in Minnesota, in 2025)
 * "HHCS_23-0014-BHH" // (Maine 2025)
 * "HHCS_22-0033-CCT" // (also Maine 2025)
 */
export type CoreSetIdentifier =
  | Exclude<CoreSetAbbr, CoreSetAbbr.HHCS>
  | `${CoreSetAbbr.HHCS}_${string}`;

/**
 * A CoreSetIdentifier is like a CoreSetAbbr, but includes the suffix for HHCS.
 * @example
 * isCoreSetIdentifer("ACS")          // true
 * isCoreSetIdentifer("CCSC")         // true
 * isCoreSetIdentifer("HHCS")         // FALSE!
 * isCoreSetIdentifer("HHCS_22-0025") // true
 */
export const isCoreSetIdentifier = (x: string): x is CoreSetIdentifier => {
  if (typeof x !== "string") {
    return false;
  }

  const standalones = Object.values(CoreSetAbbr).filter((a) => a !== "HHCS");
  if (standalones.includes(x as any)) {
    return true;
  }

  return x.startsWith(CoreSetAbbr.HHCS + "_");
};

/**
 * Convert a CoreSetIdentifier to a CoreSetAbbr.
 *
 * - If the input is a CoreSetIdentifier, the result is a CoreSetAbbr.
 * - If the input is undefined, the result is undefined.
 * - If the input is some other string, the result is undefined.
 */
export function abbreviationFor(coreSet: CoreSetIdentifier): CoreSetAbbr;
export function abbreviationFor(
  coreSet: CoreSetIdentifier | undefined
): CoreSetAbbr | undefined;
export function abbreviationFor(
  coreSet: string | undefined
): CoreSetAbbr | undefined;
export function abbreviationFor(
  coreSet: string | undefined
): CoreSetAbbr | undefined {
  if (coreSet === undefined) return undefined;
  const abbr = coreSet.split("_")[0];
  if (isCoreSetAbbr(abbr)) return abbr;
  return undefined;
}

type CoreSetParseResult =
  | [undefined, undefined]
  | [Exclude<CoreSetAbbr, CoreSetAbbr.HHCS>, undefined]
  | [CoreSetAbbr.HHCS, string];

/**
 * Split a CoreSetIdentifer into [CoreSetAbbr, spaId].
 *
 * The CoreSetAbbr is only provided if the input is a valid CoreSetIdentifier.
 * The spaId is only provided if the CoreSetAbbr is HHCS.
 * @example
 * parseIdentifier(undefined) // [undefined, undefined]
 * parseIdentifier("foo_bar") // [undefined, undefined]
 * parseIdentifier("ACSC") // [CoreSetAbbr.ACSC, undefined]
 * parseIdentifier("HHCS_32-0015") // [CoreSetAbbr.HHCS, "32-0015"]
 */
export const parseCoreSet = (
  coreSet: string | undefined
): CoreSetParseResult => {
  if (coreSet === undefined) return [undefined, undefined];
  const [abbr, spa] = coreSet.split("_");
  if (!isCoreSetAbbr(abbr)) return [undefined, undefined];
  if (abbr !== CoreSetAbbr.HHCS) return [abbr, undefined];
  return [abbr, spa];
};

/**
 * Indicates which kind of core set you're looking at.
 * See `CoreSetIdentifier` for more information.
 *
 * Does NOT include the suffix for HHCS.
 * This type is essentially `coreSet.split("_")[0]`.
 */
export enum CoreSetAbbr {
  /** Adult (combined) */
  ACS = "ACS",
  /** Adult CHIP */
  ACSC = "ACSC",
  /** Adult Medicaid */
  ACSM = "ACSM",
  /** Child (combined) */
  CCS = "CCS",
  /** Child CHIP */
  CCSC = "CCSC",
  /** Child Medicaid */
  CCSM = "CCSM",
  /** Health Home */
  HHCS = "HHCS",
}

/**
 * A CoreSetAbbr is like a CoreSetIdentifier, but omits the suffix for HHCS.
 * @example
 * isCoreSetAbbr("ACS")          // true
 * isCoreSetAbbr("CCSC")         // true
 * isCoreSetAbbr("HHCS")         // true
 * isCoreSetAbbr("HHCS_22-0025") // FALSE!
 */
export const isCoreSetAbbr = (x: unknown): x is CoreSetAbbr =>
  Object.values(CoreSetAbbr).includes(x as any);
