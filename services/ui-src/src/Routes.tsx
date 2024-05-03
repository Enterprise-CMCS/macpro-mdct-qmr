import { ReactElement, Fragment, lazy } from "react";
import { createElement } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Measures, { QualifierData } from "measures";
import { useGetMeasureListInfo } from "hooks/api/useGetMeasureListInfo";
import { useUser } from "hooks/authHooks";
import { measureDescriptions } from "measures/measureDescriptions";
import { UserRoles } from "types";
import { CombinedRatesPage } from "views";

const Home = lazy(() =>
  import("views/Home").then((module) => ({ default: module.Home }))
);
const StateHome = lazy(() => import("views/StateHome"));
const AdminHome = lazy(() =>
  import("views/AdminHome").then((module) => ({ default: module.AdminHome }))
);
const AdminBannerView = lazy(() =>
  import("views/AdminHome/AdminBannerView").then((module) => ({
    default: module.AdminBannerView,
  }))
);

const AddHHCoreSet = lazy(() =>
  import("views/AddHHCoreSet").then((module) => ({
    default: module.AddHHCoreSet,
  }))
);
const CoreSet = lazy(() =>
  import("views/CoreSet").then((module) => ({ default: module.CoreSet }))
);
const AddChildCoreSet = lazy(() =>
  import("views/AddChildCoreSet").then((module) => ({
    default: module.AddChildCoreSet,
  }))
);
const AddAdultCoreSet = lazy(() =>
  import("views/AddAdultCoreSet").then((module) => ({
    default: module.AddAdultCoreSet,
  }))
);
const AddStateSpecificMeasure = lazy(() =>
  import("views/AddStateSpecificMeasure").then((module) => ({
    default: module.AddStateSpecificMeasure,
  }))
);
const ApiTester = lazy(() =>
  import("views/ApiTester").then((module) => ({ default: module.ApiTester }))
);
const NotFound = lazy(() =>
  import("views/NotFound").then((module) => ({ default: module.NotFound }))
);
const MeasuresLoading = lazy(() =>
  import("views/MeasuresLoading").then((module) => ({
    default: module.MeasuresLoading,
  }))
);
const MeasureWrapper = lazy(() =>
  import("components/MeasureWrapper").then((module) => ({
    default: module.MeasureWrapper,
  }))
);
const ExportAll = lazy(() =>
  import("views/ExportAll").then((module) => ({
    default: module.ExportAll,
  }))
);

interface MeasureRoute {
  path: string;
  element: ReactElement;
  key: string;
}

// For each year we want a route for each measure.
// The measures available for each year are defined in the measuresList
// eg. http://localhost:3000/:state/2021/:coreSetId/AMM-AD
export function useMeasureRoutes(): MeasureRoute[] {
  const { data } = useGetMeasureListInfo();

  const measureRoutes: MeasureRoute[] = [];

  // Add qualifier routes separately from regular measures
  // Qualifiers all share one component with an additional data object passed in for core-set variance
  for (const qualYear of QualifierData) {
    measureRoutes.push({
      key: `:state/${qualYear.year}/:coreSetId/CSQ`,
      path: `:state/${qualYear.year}/:coreSetId/CSQ`,
      element: (
        <MeasureWrapper
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
                <MeasureWrapper
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
  const { userRole } = useUser();
  const measureRoutes = useMeasureRoutes();
  const isSuperAdmin = userRole === UserRoles.ADMIN;
  const isAdminTypeUser = userRole !== UserRoles.STATE_USER;

  return (
    <main id="main-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":state/:year" element={<StateHome />} />
        {/* admin route available to any admin-type user (admin, approver, help desk, internal) */}
        <Route
          path="admin"
          element={isAdminTypeUser ? <AdminHome /> : <Navigate to="/" />}
        />
        {/* admin/banner route available only to admin user (not approver, help desk, internal) */}
        <Route
          path="admin/banner"
          element={
            isSuperAdmin ? <AdminBannerView /> : <Navigate to="/admin" />
          }
        />
        <Route path=":state/:year/add-child" element={<AddChildCoreSet />} />
        <Route path=":state/:year/add-adult" element={<AddAdultCoreSet />} />
        <Route path=":state/:year/add-hh" element={<AddHHCoreSet />} />
        <Route path=":state/:year/:coreSetId" element={<CoreSet />} />
        <Route path=":state/:year/:coreSetId/pdf" element={<ExportAll />} />
        <Route
          path=":state/:year/:coreSetId/add-ssm"
          element={<AddStateSpecificMeasure />}
        />
        <Route path="combined-rates" element={<CombinedRatesPage />}/>
        <Route path="api-test" element={<ApiTester />} />
        {measureRoutes.map((m: MeasureRoute) => (
          <Route {...m} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}
