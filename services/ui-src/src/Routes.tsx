import { ReactElement, Fragment, lazy } from "react";
import { createElement } from "react";
import { Route, Routes } from "react-router-dom";
import * as QMR from "components";
import Measures, { QualifierData } from "measures";
import { useGetMeasureListInfo } from "hooks/api/useGetMeasureListInfo";
import { measureDescriptions } from "measures/measureDescriptions";

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

const Home = lazy(() => import("views/Home"));
const FAQ = lazy(() => import("views/FAQ"));
const StateHome = lazy(() => import("views/StateHome"));
const AdminHome = lazy(() => import("views/AdminHome"));
const AddHHCoreSet = lazy(() => import("views/AddHHCoreSet"));
const CoreSet = lazy(() => import("views/CoreSet"));
const AddChildCoreSet = lazy(() => import("views/AddChildCoreSet"));
const AddStateSpecificMeasure = lazy(
  () => import("views/AddStateSpecificMeasure")
);
const ApiTester = lazy(() => import("views/ApiTester"));
const NotFound = lazy(() => import("views/NotFound"));
const MeasuresLoading = lazy(() => import("views/MeasuresLoading"));

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
            const foundMeasureDescription =
              measureDescriptions?.[year]?.[measure] || description;
            measureRoutes.push({
              key: `:state/${year}/:coreSetId/${measure}`,
              path: `:state/${year}/:coreSetId/${measure}`,
              element: (
                <QMR.MeasureWrapper
                  name={foundMeasureDescription}
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

  return data
    ? measureRoutes
    : [
        {
          key: ":state/:year/:coreSetId/:measure",
          path: ":state/:year/:coreSetId/:measure",
          element: <MeasuresLoading />,
        },
        ...measureRoutes,
      ];
}

export function AppRoutes() {
  const measureRoutes = useMeasureRoutes();

  return (
    <main id="main-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path=":state/:year" element={<StateHome />} />
        <Route path="admin" element={<AdminHome />} />
        <Route path=":state/:year/add-child" element={<AddChildCoreSet />} />
        <Route path=":state/:year/add-hh" element={<AddHHCoreSet />} />
        <Route path=":state/:year/:coreSetId" element={<CoreSet />} />
        <Route
          path=":state/:year/:coreSetId/add-ssm"
          element={<AddStateSpecificMeasure />}
        />
        <Route path="api-test" element={<ApiTester />} />
        {measureRoutes.map((m: MeasureRoute) => (
          <Route {...m} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}
