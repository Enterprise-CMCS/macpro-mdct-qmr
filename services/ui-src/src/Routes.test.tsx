import { act, render, renderHook, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useMeasureRoutes, AppRoutes } from "./Routes";
import { useGetMeasureListInfo } from "hooks/api/useGetMeasureListInfo";
import { useUser } from "hooks/authHooks";
import { UserRoles } from "types";
import { Suspense } from "react";

jest.mock("hooks/api/useGetMeasureListInfo");
jest.mock("hooks/authHooks");
jest.mock("measures", () => ({
  __esModule: true,
  default: {
    "2021": {
      "AMM-AD": () => null,
      Qualifier: () => null,
    },
  },
  QualifierData: [{ year: "2021", data: {} }],
}));

jest.mock("views/Home", () => ({
  Home: () => <div data-testid="home">Home</div>,
}));
jest.mock("views/StateHome", () => ({
  __esModule: true,
  default: () => <div data-testid="state-home">StateHome</div>,
}));
jest.mock("views/AdminHome", () => ({
  AdminHome: () => <div data-testid="admin-home">AdminHome</div>,
}));
jest.mock("views/AdminHome/AdminBannerView", () => ({
  AdminBannerView: () => <div data-testid="admin-banner">AdminBanner</div>,
}));
jest.mock("views/NotFound", () => ({
  NotFound: () => <div data-testid="not-found">NotFound</div>,
}));
jest.mock("views/AddHHCoreSet", () => ({
  AddHHCoreSet: () => <div data-testid="add-hh-core-set">AddHHCoreSet</div>,
}));
jest.mock("views/CoreSet", () => ({
  CoreSet: () => <div data-testid="core-set">CoreSet</div>,
}));
jest.mock("views/AddChildCoreSet", () => ({
  AddChildCoreSet: () => (
    <div data-testid="add-child-core-set">AddChildCoreSet</div>
  ),
}));
jest.mock("views/AddAdultCoreSet", () => ({
  AddAdultCoreSet: () => (
    <div data-testid="add-adult-core-set">AddAdultCoreSet</div>
  ),
}));
jest.mock("views/AddStateSpecificMeasure", () => ({
  AddStateSpecificMeasure: () => (
    <div data-testid="add-state-specific-measure">AddStateSpecificMeasure</div>
  ),
}));
jest.mock("views/ExportAll", () => ({
  ExportAll: () => <div data-testid="export-all">ExportAll</div>,
}));

const renderWithRouter = async (
  initialEntry: string,
  userRole = UserRoles.STATE_USER
) => {
  mockUseUser.mockReturnValue({ userRole } as any);

  let component: any;
  await act(async () => {
    component = render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </MemoryRouter>
    );
  });
  return component;
};

const mockUseGetMeasureListInfo = useGetMeasureListInfo as jest.MockedFunction<
  typeof useGetMeasureListInfo
>;
const mockUseUser = useUser as jest.MockedFunction<typeof useUser>;

describe("Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useMeasureRoutes", () => {
    it("returns loading route when no data", () => {
      mockUseGetMeasureListInfo.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
        isError: false,
      } as any);

      const { result } = renderHook(() => useMeasureRoutes());

      // loading route + 1 qualifier route
      expect(result.current).toHaveLength(2);
      expect(result.current[0].path).toBe(":state/:year/:coreSetId/:measure");
    });

    it("generates measure routes when data is available", () => {
      const mockData = {
        "2021": [
          {
            measure: "AMM-AD",
            description: "Test Measure",
            autocompleteOnCreation: false,
          },
        ],
      };
      mockUseGetMeasureListInfo.mockReturnValue({
        data: mockData,
        isLoading: false,
        error: null,
        isError: false,
      } as any);

      const { result } = renderHook(() => useMeasureRoutes());

      expect(result.current.length).toBeGreaterThan(1);

      // Check that we have routes for the measure
      const measureRoute = result.current.find(
        (route) => route.path === ":state/2021/:coreSetId/AMM-AD"
      );
      const combinedRateRoute = result.current.find(
        (route) => route.path === ":state/2021/combined-rates/AMM-AD"
      );

      expect(measureRoute).toBeDefined();
      expect(combinedRateRoute).toBeDefined();
    });

    it("generates qualifier routes", () => {
      mockUseGetMeasureListInfo.mockReturnValue({
        data: {},
        isLoading: false,
        error: null,
        isError: false,
      } as any);

      const { result } = renderHook(() => useMeasureRoutes());

      const qualifierRoute = result.current.find(
        (route) => route.path === ":state/2021/:coreSetId/CSQ"
      );
      expect(qualifierRoute).toBeDefined();
    });

    it("skips measures not in Measures object", () => {
      const mockData = {
        "2021": [
          {
            measure: "MISSING-MEASURE",
            description: "Missing",
            autocompleteOnCreation: false,
          },
          {
            measure: "AMM-AD",
            description: "Exists",
            autocompleteOnCreation: false,
          },
        ],
      };
      mockUseGetMeasureListInfo.mockReturnValue({
        data: mockData,
        isLoading: false,
        error: null,
        isError: false,
      } as any);

      const { result } = renderHook(() => useMeasureRoutes());

      const missingRoute = result.current.find((route) =>
        route.path.includes("MISSING-MEASURE")
      );
      const existingRoute = result.current.find((route) =>
        route.path.includes("AMM-AD")
      );

      expect(missingRoute).toBeUndefined();
      expect(existingRoute).toBeDefined();
    });
  });

  describe("AppRoutes", () => {
    beforeEach(() => {
      // Default mock for measure data
      mockUseGetMeasureListInfo.mockReturnValue({
        data: {},
        isLoading: false,
        error: null,
        isError: false,
      } as any);
    });

    it("renders home page for root route", async () => {
      await renderWithRouter("/");
      expect(screen.getByTestId("home")).toBeInTheDocument();
    });
    it("renders state home for state/year route", async () => {
      await renderWithRouter("/CA/2021");
      expect(screen.getByTestId("state-home")).toBeInTheDocument();
    });
    it("allows admin users to access admin route", async () => {
      await renderWithRouter("/admin", UserRoles.ADMIN);
      expect(screen.getByTestId("admin-home")).toBeInTheDocument();
    });
    it("redirects non-admin users from admin route", async () => {
      await renderWithRouter("/admin", UserRoles.STATE_USER);
      expect(screen.getByTestId("home")).toBeInTheDocument();
    });
    it("allows super admin to access banner route", async () => {
      await renderWithRouter("/admin/banner", UserRoles.ADMIN);
      expect(screen.getByTestId("admin-banner")).toBeInTheDocument();
    });
    it("redirects non-super-admin from banner route", async () => {
      await renderWithRouter("/admin/banner", UserRoles.APPROVER);
      expect(screen.getByTestId("admin-home")).toBeInTheDocument();
    });
    it("redirects non-admin from banner route", async () => {
      await renderWithRouter("/admin/banner", UserRoles.STATE_USER);
      expect(screen.getByTestId("home")).toBeInTheDocument();
    });
    it("renders add health home core set page", async () => {
      await renderWithRouter("/CA/2021/add-hh");
      expect(screen.getByTestId("add-hh-core-set")).toBeInTheDocument();
    });
    it("renders core set page", async () => {
      await renderWithRouter("/CA/2021/ACS");
      expect(screen.getByTestId("core-set")).toBeInTheDocument();
    });
    it("renders add child core set page", async () => {
      await renderWithRouter("/CA/2021/add-child");
      expect(screen.getByTestId("add-child-core-set")).toBeInTheDocument();
    });
    it("renders add adult core set page", async () => {
      await renderWithRouter("/CA/2021/add-adult");
      expect(screen.getByTestId("add-adult-core-set")).toBeInTheDocument();
    });
    it("renders state specific measure page", async () => {
      await renderWithRouter("/CA/2021/ACM/add-ssm");
      expect(
        screen.getByTestId("add-state-specific-measure")
      ).toBeInTheDocument();
    });
    it("renders pdf export page", async () => {
      await renderWithRouter("/CA/2021/ACM/pdf");
      expect(screen.getByTestId("export-all")).toBeInTheDocument();
    });
    it("renders not found for unknown routes", async () => {
      await renderWithRouter("/unknown-route");
      expect(screen.getByTestId("not-found")).toBeInTheDocument();
    });
  });
});
