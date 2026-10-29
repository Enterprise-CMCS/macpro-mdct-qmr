# Year End Transition

## LaunchDarkly Flag

1. Create a new LaunchDarkly Flag named "releaseYEAR" for the new year, e.g. "release2027".

2. In `services/ui-src/src/views` directory, update the following files with the new flag:

- `AdminHome/index.tsx`
- `CombinedRatesPage/index.tsx`
- `Home/index.tsx`
- `StateHome/index.tsx`

## Create New Report Year

Find the `services/ui-src/src/measures` directory. You should see past years as folders (2021, 2022, etc.). Ideally, changes to measures would be made from the previous year to the next, so you make a copy of the folder of the most recent year and rename it to the next year (e.g. 2021 -> 2021 Copy -> 2022).

### Update the measures directory files

In the `services/ui-src/src/measures` directory, update the following files:

1. `index.tsx`

- update the name of the export (`twentyTwentyOneMeasures` -> `twentyTwentyTwoMeasures`)
- change the import year for `import { Data } from "labels/{year}/qualifierFormsData"` to the next year
- add the new export
  (before and after shown below)

  Before

  ![Before](./.images/beforeCode.png?raw=true)

  After

  ![After](./.images/afterCode.png?raw=true)

2. `measureDescriptions.ts`

- copy over the prior year's entry into the array

3. For each of the measures described in the directory, ensure each associated file is updated to the new year as needed.

### Update the labels directory files

In the `services/ui-src/src/labels` directory, copy the past year's folder to create the new latest year, e.g. 2021 -> 2021 Copy -> 2022. Then update the following files:

1. `QualifierFormsDatas.tsx`

- add the newly created files from `src/labels/{year}/qualifierFormsData` as an import

2. `Labels.tsx`

- add the newly created files from `src/labels/{year}/commonQuestionsLabel` as an import

3. `RateLabelTexts.tsx`

- add the newly created files from `src/labels/{year}/rateLabelText` as an import

4. `MeasureDatas.tsx`

- add the newly created files from `src/labels/{year}/measureDatas` as an import

### Update the dynamoUtils directory files

In the `services/app-api/handlers/dynamoUtils` directory, update the following files:

1. Create the new year's `measureListYEAR.ts`

- copy the array of measures from the previous year and paste them into the new year's file. Make any additions or removals of measures as needed per requirements.

2. `measureList.ts`

- import the new year's new `measureListYEAR.ts` file and include it in the list of interfaces

### Update the ui-src shared directory files

In `services/ui-src/src/shared` directory, update the following files:

1. `coreSetByYear.ts`

- copy over the prior year's entry into the array with the new year

### Update the ui-src libs directory files

In `services/ui-src/src/libs` directory, update the following files:

1. `spaLib.ts`

- copy over the prior year's entry into the array with the new year

### Update the app-api libs directory files

In `services/app-api/src/libs` directory, update the following files:

1. `coreSetByYearPreloaded.ts`

- copy over the prior year's entry into the array with the new year

2. `coreSetStatesList.ts`

- copy over the prior year's entry into the array with the new year

### Update the config file

In `services/ui-src/src/config.ts` change `currentReportingYear` to the new reporting year.

## Cypress Updates

1. In `test/cypress/support/constants.ts` change the value of `testingYear` to the new reporting year.

## Gotchas

If you are creating a new shared component (e.g. files under `/globalValidations`) while editing the previous year's files, it is possible that merge conflicts will arise. Make sure these concurrent changes are not overwriting or removing necessary code.
