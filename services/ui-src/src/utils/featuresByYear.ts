import { getMeasureYear } from "./getMeasureYear";

export const featuresByYear = {
  /**
   * Prior to 2024, Adult Core Sets were always reported combined.
   * In 2024, we separated Adult-CHIP from Adult-Medicaid, for some states.
   * At the same time, we added the Combined Rates feature,
   * to provide a summary view for data across the new separation.
   * This goes hand-in-hand with other small features,
   * like more specific core set titles in the header and breadcrumbs.
   */
  get hasCombinedRates() {
    return getMeasureYear() >= 2024;
  },
  /**
   * Prior to 2023, rate identification was largely done by string manipulation.
   * IDs were generated on the fly by joining the qualifier to the category.
   * For example, the first rate of APM-CH was `Ages1to11.BloodGlucose`
   *
   * In 2023, we introduced short programmatic IDs, separate from label text.
   * Unique rate-level IDs are the category's ID, joined to the qualifier's.
   * For example, the first rate of APM-CH is now `rcmfbq.rJQSKZ`
   *
   * Note that in addition to swapping "cleaned" labels for IDs,
   * we changed the order from `qual.cat` to `cat.qual`
   */
  get hasQualCatLabels() {
    return getMeasureYear() <= 2022;
  },
  /**
   * Beginning in 2024, states are required to report all of the measures
   * on the child core set and the behavioral health measures on the adult
   * core set. Also states with health home are required to report all of
   * the measures on the health home core sets.
   */
  get hasMandatoryReporting() {
    return getMeasureYear() >= 2024;
  },
  /**
   * Prior to 2023, users were always required to fill out the measure dates,
   * even when they matched the Core Set's standard, specified range.
   * In 2023, we wrapped the dates in a "are your dates standard?" radio button,
   * so that users could just click "yes" and save some typing.
   */
  get allowImplicitMeasureDates() {
    return getMeasureYear() >= 2023;
  },
  /**
   * All years have been released except for 2025 so this checks to make sure
   * the year is any year except 2025
   */
  get reportingYearReleased() {
    return getMeasureYear() !== 2025;
  },
  /**
   * Prior to 2024, we didn't distinguish mandatory measures from optional ones.
   * In 2024, we added the mandatory flag as column in the measure table,
   * so that users can see at a glance which measures are mandatory.
   * In 2025, we turned this column into the Type column
   */
  get displayMandatoryMeasuresColumn() {
    return getMeasureYear() == 2024;
  },
  /**
   * In 2025 we changed the mandatory boolean into a measureType enum
   * it allows us to have more options and control over what is displayed
   */
  get displayTypeMeasuresColumn() {
    return getMeasureYear() >= 2025;
  },
  /**
   * Beginning in 2023, the category for a complex rate needs to be set to
   * human readable label for display in Mathematica
   */
  get setCategoryForComplexRate() {
    return getMeasureYear() >= 2023;
  },
  /**
   * Prior to 2024, we would display a warning if users entered rates for 65+
   * qualifiers, without marking Dual-Eligible in the Definition of Population.
   * In 2024, we removed this validation at the request of CMS.
   */ get shouldValidateDuallyEligibleCheckbox() {
    return getMeasureYear() >= 2023;
  },
  /**
   * Prior to 2024, we asked if measurements had "deviations" from the spec.
   * In 2024, we rephrased this question to ask about "variations" instead.
   */
  get displayDeviationlanguage() {
    return getMeasureYear() <= 2023;
  },
  /**
   * Prior to 2023, the OMS section included every rate from the PM section,
   * allowed for subcategorization of every category, and included categories
   * such as "primary language" and "disability status".
   *
   * In 2023 we excluded some rates, disabled some custom subcategorizations,
   * and removed several categories and sub-categories entirely.
   */
  get hasStreamlinedOms() {
    return getMeasureYear() >= 2023;
  },
  /**
   * Prior to 2025, we displayed FFY before the year name. This was done in part
   * to differentiate Federal Fiscal Year and HEDIS Medical Year.
   *
   * In 2025, stakeholders decided this explicit differentiation was unneeded.
   */
  get displayFFYLanguage() {
    return getMeasureYear() < 2025;
  },
  /**
   * Prior to 2025, we want to display questions that involve referencing
   * the COVID-19 pandemic.
   *
   * In 2025 and beyond, we do not want to display this language.
   *
   */
  get displayCovidLanguage() {
    return getMeasureYear() < 2025;
  },
  /**
   * Prior to 2025, the Measure Stratification section was called Optional Measure Stratification
   *
   * In 2025 and beyond, we want to hide an instance of it being referenced as such
   */
  get displayOptionalLanguage() {
    return getMeasureYear() < 2025;
  },

  /**
   * Prior to 2025, the report name was "Medicaid (Title XIX & XXI)"
   *
   * In 2025 and beyond, we want to change it to "Medicaid (inclusive of both Title XIX-funded Medicaid and Title XXI-funded Medicaid Expansion CHIP)"
   */
  get hasMedicaidInclusiveReportName() {
    return getMeasureYear() >= 2025;
  },
};
