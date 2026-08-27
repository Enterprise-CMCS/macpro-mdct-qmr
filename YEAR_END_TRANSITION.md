# Year End Transition

Go into the `services/ui-src/src/measures` directory and one should see past years as
folders (2021, 2022, etc.). Ideally, changes to measures would be made from the previous
year to the next so one would make a copy the folder of the most recent year and rename
it to the next year (e.g. 2021 -> 2022). Then go into the folder and make any additions
or removals of measures as needed per requirements.

Once the directory for the new year has been made there are a couple of changes one needs
to make in order to get that year working.

1. Go into the `index.tsx` file for the directory you just created
   (`services/ui-src/src/measures/2022/index.tsx`) and update the name of the export
   (`twentyTwentyOneMeasures` -> `twentyTwentyTwoMeasures`) and change the import year for `import { Data } from "labels/{year}/qualifierFormsData"` to the next year;

2. Go to the `services/ui-src/src/measures/index.tsx` file and add that new export
   (before and after shown below)

   Before

   ![Before](./.images/beforeCode.png?raw=true)

   After

   ![After](./.images/afterCode.png?raw=true)

3. Go to the `services/app-api/handlers/dynamoUtils/measureList.ts` and copy the array of
   measures from the previous year and copy them into the new year. Make any additions or
   removals of measures as needed per requirements.

4. Update any import names from the past year to the latest year (e.g. 2021 -> 2022)

   Before

   ![Before](./.images/beforeImportUpdate.png?raw=true)

   After

   ![After](./.images/afterImportUpdate.png?raw=true)

5. Similar to Step 4, update import names from the previous year to the most recent year

   Before

   ![Before](./.images/beforeCommonComponentUpdate.png?raw=true)

   After

   ![After](./.images/afterCommonComponentUpdate.png?raw=true)

6. In `services/ui-src/src/libs/spaLib.ts`, copy over the prior year's entry into the array.

7. In `services/ui-src/src/measures/measureDescriptions.ts` , copy over the prior year's entry into the array.

8. In `src/labels` copy the past year’s folder to the latest year (e.g. 2021 -> 2022)

9. Go to the `src/labels/QualifierFormsDatas.tsx` and add the newly created files from `src/labels/{year}/qualifierFormsData` as an import

10. Go to the `src/labels/Labels.tsx` and add the newly created files from `src/labels/{year}/commonQuestionsLabel` as an import

11. Go to the `src/labels/RateLabelTexts.tsx` and add the newly created files from `src/labels/{year}/rateLabelText` as an import

12. In `services/app-api/libs/coreSetByYearPreloaded.ts` , copy over the prior year's entry into the array.

13. In `services/app-api/libs/coreSetStatesList.ts` , copy over the prior year's entry into the array.

14. In `services/ui-src/src/config.ts` change `currentReportingYear` to the new reporting year.

### Cypress

1. In `test/cypress/support/constants.ts` change the value of `testingYear` to the new reporting year.

### LaunchDarkly Flag

1. In `services/ui-src/src/views/StateHome/index.tsx` look for the a line of code similar to this `const releaseYearByFlag = useFlags()?.["release2026"];` change the year to the latest year and do a quick search and replace with the new variable name.

## Things to Look Out For (Gotchas)

If you are creating a new shared component (e.g. files under `/globalValidations`) while editing the previous year's files, it is possible that merge conflicts will arise. Make sure these concurrent changes are not overwriting or removing necessary code.
