import { fireEvent, render, screen } from "@testing-library/react";
import { defaultMockValues, useApiMock } from "./useApiMock";
import * as CUI from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Api from "hooks/api";
import { CoreSetAbbr, MeasureStatus } from "types";

const useAddCoreSetFunction = () => {
  const mutation = Api.useAddCoreSet();
  const results = mutation.mutate(CoreSetAbbr.ACS);
  expect(results).toEqual("mock add coreset for ACS");
};

const useAddMeasureFunction = () => {
  const mutation = Api.useAddMeasure();
  const results = mutation.mutate({
    body: {
      description: "",
      userCreated: undefined,
      userState: "",
    },
    coreSet: CoreSetAbbr.ACS,
    measure: "AAB-AD",
    state: "MN",
    year: "2025",
  });
  expect(results).toEqual("mock add measure for AAB-AD");
};

const useDeleteBannerFunction = () => {
  const mutation = Api.useDeleteBanner();
  const results = mutation.mutate("12345");
  expect(results).toEqual("mock delete banner 12345");
};

const useWriteBannerFunction = () => {
  const mutation = Api.useWriteBanner();
  const results = mutation.mutate({
    key: "12345",
    title: "",
    description: "",
  });
  expect(results).toEqual("mock write banner 12345");
};

const useUpdateMeasuresFunction = () => {
  const mutation = Api.useUpdateMeasure();
  const results = mutation.mutate({
    data: { measure: "AAB-AD" },
    status: MeasureStatus.COMPLETE,
  });
  expect(results).toEqual("mock update measure for AAB-AD");
};

describe("Test useApiMock", () => {
  beforeEach(() => {
    useApiMock(defaultMockValues);
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CUI.Button onClick={() => useAddCoreSetFunction()}>
          Add Core Set
        </CUI.Button>
        <CUI.Button onClick={() => useAddMeasureFunction()}>
          Add Measure
        </CUI.Button>
        <CUI.Button onClick={() => useDeleteBannerFunction()}>
          Delete Banner
        </CUI.Button>
        <CUI.Button onClick={() => useWriteBannerFunction()}>
          Write Banner
        </CUI.Button>
        <CUI.Button onClick={() => useUpdateMeasuresFunction()}>
          Update Measure
        </CUI.Button>
      </QueryClientProvider>
    );
  });
  it("Test useAddCoreSet function", () => {
    fireEvent.click(screen.getByRole("button", { name: "Add Core Set" }));
    expect(Api.useAddCoreSet).toHaveBeenCalled();
  });
  it("Test useAddCoreSet function", () => {
    fireEvent.click(screen.getByRole("button", { name: "Add Measure" }));
    expect(Api.useAddMeasure).toHaveBeenCalled();
  });
  it("Test useDeleteBanner function", () => {
    fireEvent.click(screen.getByRole("button", { name: "Delete Banner" }));
    expect(Api.useDeleteBanner).toHaveBeenCalled();
  });
  it("Test useWriteBanner function", () => {
    fireEvent.click(screen.getByRole("button", { name: "Write Banner" }));
    expect(Api.useWriteBanner).toHaveBeenCalled();
  });
  it("Test useUpdateMeasure function", () => {
    fireEvent.click(screen.getByRole("button", { name: "Update Measure" }));
    expect(Api.useUpdateMeasure).toHaveBeenCalled();
  });
});
