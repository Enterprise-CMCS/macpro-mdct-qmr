import { createElement, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { CognitoUser } from "@aws-amplify/auth";
import * as Views from "views";
import Measures from "measures";
import { measuresList, MeasuresListItem } from "measures/measuresList";
import { stateAbbreviations } from "utils/constants";

export type Params = "state" | "year" | "coreset" | "measure";

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

// For each state, and each year we want a unique route for each measure.
// eg. http://localhost:3000/AL/2021/AD/AMM-AD

const measureRoutes: MeasureRoute[] = [];

Object.keys(measuresList).forEach((year: string) => {
  stateAbbreviations.forEach((stateAbbr: string) => {
    measuresList[year].forEach(({ type, measure, name }: MeasuresListItem) => {
      // @ts-ignore
      if (measure in Measures[year]) {
        // @ts-ignore
        const Comp = Measures[year][measure];

        // if this is a child core set we want to create three locations to access the same measure
        // (combined, mediaid, and chip) so we create two extra routes if measure type is child

        if (type === "CH") {
          // add a path for child - chip
          measureRoutes.push({
            path: `${stateAbbr}/${year}/${type}C/${measure}`,
            el: createElement(Comp, { name }),
          });

          // add a path for child - medicaid
          measureRoutes.push({
            path: `${stateAbbr}/${year}/${type}M/${measure}`,
            el: createElement(Comp, { name }),
          });
        }

        measureRoutes.push({
          path: `${stateAbbr}/${year}/${type}/${measure}`,
          el: createElement(Comp, { name }),
        });
      }
    });
  });
});

export function AppRoutes({ user }: { user: CognitoUser }) {
  return (
    <main id="main-wrapper">
      <Routes>
        <Route path="/" element={<Views.Home user={user} />} />
        <Route path=":state/:year" element={<Views.StateHome />} />
        <Route
          path=":state/:year/add-child"
          element={<Views.AddChildCoreSet />}
        />
        <Route path=":state/:year/add-hh" element={<Views.AddHHCoreSet />} />
        <Route path=":state/:year/:coreset" element={<Views.CoreSet />} />
        <Route path="OH/2021/ACS/AIF-HH" element={<Views.DemoMeasure />} />
        {measureRoutes.map((m: MeasureRoute) => (
          <Route path={m.path} element={m.el} key={m.path} />
        ))}
        <Route path="components" element={<Views.DemoComponents />} />
        <Route path="*" element={<Views.NotFound />} />
      </Routes>
    </main>
  );
}
