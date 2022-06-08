import { ReactElement, Fragment } from "react";
import { createElement } from "react";
import { Route, Routes } from "react-router-dom";
import * as Views from "views";
import * as QMR from "components";
import Measures, { QualifierData } from "measures";
import { useGetMeasureListInfo } from "hooks/api/useGetMeasureListInfo";

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
  element: ReactElement;
  key: string;
}

// For each year we want a route for each measure.
// The measures available for each year are defined in the measuresList
// eg. http://localhost:3000/:state/2021/:coreSetId/AMM-AD
function useMeasureRoutes(): MeasureRoute[] {
  const { data } = useGetMeasureListInfo();

  const measureRoutes: MeasureRoute[] = [];

  // Add qualifier routes separately from regular measures
  // Qualifiers all share one component with an additional data object passed in for core-set variance
  for (const qualYear of QualifierData) {
    measureRoutes.push({
      key: `:state/${qualYear.year}/:coreSetId/CSQ`,
      path: `:state/${qualYear.year}/:coreSetId/CSQ`,
      element: (
        <QMR.MeasureWrapper
          name={""}
          year={qualYear.year}
          measureId={"CSQ"}
          measure={createElement(
            Measures?.[qualYear.year]?.["Qualifier"] ?? Fragment
          )}
          autocompleteOnCreation={false}
          defaultData={qualYear.data}
        />
      ),
    });
  }

  if (data) {
    Object.keys(data).forEach((year: string) => {
      data[year].forEach(
        ({ measure, description, autocompleteOnCreation }: any) => {
          if (measure in Measures[year]) {
            const Comp = Measures[year][measure];
            measureRoutes.push({
              key: `:state/${year}/:coreSetId/${measure}`,
              path: `:state/${year}/:coreSetId/${measure}`,
              element: (
                <QMR.MeasureWrapper
                  name={description}
                  year={year}
                  measureId={measure}
                  measure={createElement(Comp)}
                  autocompleteOnCreation={autocompleteOnCreation ?? false}
                />
              ),
            });
          }
        }
      );
    });
  }

  return data ? measureRoutes : [...measureRoutes];
}

export function AppRoutes() {
  const measureRoutes = useMeasureRoutes();

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
        <Route path="api-test" element={<Views.ApiTester />} />
        {measureRoutes.map((m: MeasureRoute) => (
          <Route {...m} />
        ))}
        <Route path="*" element={<Views.NotFound />} />
      </Routes>
    </main>
  );
}
