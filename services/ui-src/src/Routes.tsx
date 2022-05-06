import { ReactElement } from "react";
import { createElement } from "react";
import { Route, Routes } from "react-router-dom";
import * as Views from "views";
import * as QMR from "components";
import Measures from "measures";
import { measuresList, MeasuresListItem } from "measures/measuresList";

// Todo: Uncomment this segment when need to run S3 locally
///////////////////////////////////////////////////////////
// import AWS from "aws-sdk";
// import {
//   s3AmplifyUpload,
//   s3LocalUploader,
//   s3AmplifyGetURL,
//   s3LocalGetURL,
// } from "libs/awsLib";
// import config from "config";

interface MeasureRoute {
  path: string;
  el: ReactElement;
}

// For each year we want a route for each measure.
// The measures available for each year are defined in the measuresList
// eg. http://localhost:3000/:state/2021/:coreSetId/AMM-AD

const measureRoutes: MeasureRoute[] = [];

Object.keys(measuresList).forEach((year: string) => {
  measuresList[year].forEach(
    ({ measureId, name, autocompleteOnCreation }: MeasuresListItem) => {
      if (measureId in Measures[year]) {
        const Comp = Measures[year][measureId];

        measureRoutes.push({
          path: `:state/${year}/:coreSetId/${measureId}`,
          el: (
            <QMR.MeasureWrapper
              name={name}
              year={year}
              measureId={measureId}
              measure={createElement(Comp)}
              autocompleteOnCreation={autocompleteOnCreation ?? false}
            />
          ),
        });
      }
    }
  );
});

export function AppRoutes() {
  return (
    <main id="main-wrapper">
      <Routes>
        <Route path="/" element={<Views.Home />} />
        <Route path="/faq" element={<Views.FAQ />} />
        <Route path=":state/:year" element={<Views.StateHome />} />
        <Route path="admin" element={<Views.AdminHome />} />
        <Route
          path=":state/:year/add-child"
          element={<Views.AddChildCoreSet />}
        />
        <Route path=":state/:year/add-hh" element={<Views.AddHHCoreSet />} />
        <Route path=":state/:year/:coreSetId" element={<Views.CoreSet />} />
        <Route
          path=":state/:year/:coreSetId/add-ssm"
          element={<Views.AddStateSpecificMeasure />}
        />
        <Route path=":state/:year/ACS/CSQ" element={<Views.ACSQualifiers />} />
        <Route path=":state/:year/CCS/CSQ" element={<Views.CCSQualifiers />} />
        <Route
          path=":state/:year/CCSM/CSQ"
          element={<Views.CCSMQualifiers />}
        />
        <Route
          path=":state/:year/CCSC/CSQ"
          element={<Views.CCSCQualifiers />}
        />
        <Route path="api-test" element={<Views.ApiTester />} />
        {measureRoutes.map((m: MeasureRoute) => (
          <Route path={m.path} element={m.el} key={m.path} />
        ))}
        <Route path="*" element={<Views.NotFound />} />
      </Routes>
    </main>
  );
}
