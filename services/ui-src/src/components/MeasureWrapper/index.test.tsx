import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createElement } from "react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "./";
import { defaultMockValues, useApiMock } from "utils/testUtils/useApiMock";
import { useUser } from "hooks/authHooks";
import { CPUAD } from "measures/2024/CPUAD/index";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;
const MockMeasure = () => createElement("div");
const div = createElement(MockMeasure);

const useWatchReturnValues = {
  MeasurementSpecification: "Other",
  DidReport: "yes",
};

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useWatch: (obj: { name: keyof typeof useWatchReturnValues }) =>
    obj ? useWatchReturnValues[obj.name] : {},
}));

const mockToast = jest.fn();
jest.mock("@chakra-ui/toast", () => ({
  ...jest.requireActual("@chakra-ui/toast"),
  createStandaloneToast: jest.fn(() => ({
    toast: mockToast,
  })),
}));

jest.mock("config", () => ({
  isDevEnv: jest.fn(() => true),
}));

jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn(),
}));

const useParamsSpy = jest.spyOn(require("react-router"), "useParams");
const mockGetMeasureYear = getMeasureYear as jest.Mock;

const mockMutate = jest.fn((_variables: any, options?: any) => {
  if (typeof options?.onSettled === "function")
    return options.onSettled("data");
});

const renderMeasureWrapper = (props: any, apiData = {}) => {
  useApiMock(apiData);
  mockGetMeasureYear.mockReturnValue(Number(props.year ?? "2021"));
  return render(
    <RouterWrappedComp>
      <MeasureWrapper measure={div} name="testing" year="2021" {...props} />
    </RouterWrappedComp>
  );
};

describe("Test Measure Wrapper Component", () => {
  beforeEach(() => {
    mockGetMeasureYear.mockReturnValue(2021);
    mockUseUser.mockImplementation(() => {
      return { isStateUser: false };
    });
  });

  it("renders the form component", () => {
    renderMeasureWrapper({
      measure: div,
      name: "testing",
      year: "2021",
      measureId: "AMMAD",
    });
    expect(screen.getByTestId("measure-wrapper-form")).toBeInTheDocument();
  });

  it("renders the form component with different coreSetId CCS", () => {
    useParamsSpy.mockReturnValueOnce({
      year: "2021",
      state: "OH",
      coreSetId: "CCS",
      measureId: "FUH-AD",
    });
    renderMeasureWrapper({
      measure: div,
      name: "testing",
      year: "2021",
      measureId: "FUH-AD",
    });
    expect(screen.getByTestId("measure-wrapper-form")).toBeInTheDocument();
  });

  it("renders the form component with different coreSetId HHCS", () => {
    useParamsSpy.mockReturnValueOnce({
      year: "2021",
      state: "OH",
      coreSetId: "HHCS",
      measureId: "FUH-AD",
    });
    renderMeasureWrapper({
      measure: div,
      name: "testing",
      year: "2021",
      measureId: "FUH-AD",
    });
    expect(screen.getByTestId("measure-wrapper-form")).toBeInTheDocument();
  });

  it("does not break with missing params", () => {
    useParamsSpy.mockReturnValueOnce({
      coreSetId: "HHCS",
      measureId: "FUH-AD",
    });
    renderMeasureWrapper({
      measure: div,
    });
  });
});

describe("state user", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });

    renderMeasureWrapper({
      measure: div,
      name: "testing-active",
      year: "2021",
      measureId: "AMMAD",
    });
  });

  test("enabled fieldset for state user", () => {
    expect(screen.getByTestId("fieldset")).toBeInTheDocument();
    expect(screen.getByTestId("fieldset")).toBeEnabled();
  });

  test("should display the state layout container", () => {
    expect(screen.getByTestId("state-layout-container")).toBeInTheDocument();
    expect(screen.getByTestId("state-layout-container")).toHaveTextContent(
      "AMMAD"
    );
    expect(screen.getByTestId("state-layout-container")).toHaveTextContent(
      "2021"
    );
  });
});

describe("non-state user", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: false };
    });

    renderMeasureWrapper({
      measure: div,
      name: "testing-inactive",
      year: "2021",
      measureId: "AMMAD",
    });
  });

  test("disabed fieldset for non-state user", () => {
    expect(screen.getByTestId("fieldset")).toBeInTheDocument();
    expect(screen.getByTestId("fieldset")).toBeDisabled();
  });
});

describe("stratification reminder banner", () => {
  const renderBanner = (stratificationRequired: string[], year = "2026") => {
    useParamsSpy.mockReturnValue({ state: "OH", coreSetId: "ACSM", year });
    renderMeasureWrapper(
      { measureId: "AMM-AD", year },
      { useGetMeasureValues: { data: { Item: { stratificationRequired } } } }
    );
  };

  beforeEach(() => {
    mockUseUser.mockImplementation(() => ({ isStateUser: true }));
  });

  it("renders the banner when stratification is required for the core set", () => {
    renderBanner(["ACSM"]);
    expect(
      screen.getByText(/states are expected to report stratified/i)
    ).toBeInTheDocument();
  });

  it("renders the banner in 2025 when stratification is required for the core set", () => {
    renderBanner(["ACSM"], "2025");
    expect(
      screen.getByText(/states are expected to report stratified/i)
    ).toBeInTheDocument();
  });

  it("does not render the banner when stratification is not required", () => {
    renderBanner([]);
    expect(
      screen.queryByText(/states are expected to report stratified/i)
    ).not.toBeInTheDocument();
  });
});

describe("test auto-completed measures", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });

    renderMeasureWrapper({
      measure: div,
      name: "testing-inactive",
      year: "2021",
      measureId: "NCIDDSAD",
      autocompleteOnCreation: true,
    });
  });

  test("auto-completed measures should not have validate and complete buttons", () => {
    const completeMeasureButton = screen.queryByLabelText("Complete Measure");
    const validateMeasureButton = screen.queryByLabelText("Validate Measure");
    expect(completeMeasureButton).toBeNull();
    expect(validateMeasureButton).toBeNull();
  });
});

describe("test measure functions", () => {
  beforeEach(() => {
    mockMutate.mockClear();
    mockToast.mockClear();
    defaultMockValues.useGetMeasureValues.refetch.mockClear();
    mockGetMeasureYear.mockReturnValue(2021);
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });

    //
    const apiData: any = {
      useUpdateMeasureValues: {
        mutate: mockMutate,
      },
    };
    useApiMock(apiData);
    render(
      <RouterWrappedComp>
        <MeasureWrapper
          measure={
            <CPUAD
              name={
                "Avoidance of Antibiotic Treatment for Acute Bronchitis/Bronchiolitis: Age 18 And Older"
              }
              year={"2024"}
              measureId={"AAB-AD"}
            ></CPUAD>
          }
          name="testing-active"
          year="2021"
          measureId="AMMAD"
        />
      </RouterWrappedComp>
    );
  });

  test("should refetch and show success when saving returns an empty response", async () => {
    mockMutate.mockImplementationOnce((_variables, options) =>
      options.onSettled(null, null)
    );
    const textArea = await screen.findByLabelText(
      "I am reporting provisional data."
    );
    fireEvent.click(textArea);
    const saveBtn = screen.getByText("Save");
    fireEvent.click(saveBtn);
    await waitFor(() => {
      expect(defaultMockValues.useGetMeasureValues.refetch).toHaveBeenCalled();
    });
    expect(mockToast).toHaveBeenCalledWith({
      status: "success",
      description: "Successfully saved measure data.",
      duration: 4000,
    });
  });

  test("should run save when clicking the save button and show error toast on error", async () => {
    mockMutate.mockImplementationOnce((_variables: any, options?: any) => {
      return options.onError();
    });
    const textArea = await screen.findByLabelText(
      "I am reporting provisional data."
    );
    fireEvent.click(textArea);
    const saveBtn = screen.getByText("Save");
    fireEvent.click(saveBtn);
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
    expect(mockToast).toHaveBeenCalledWith({
      status: "error",
      description: "Failed to save or submit measure data.",
      duration: 4000,
    });
  });

  test("Validation button is visible and clickable", async () => {
    const button = screen.getByText("Validate Measure");
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    await waitFor(() => {
      fireEvent.click(button);
    });
    expect(await screen.findByText("Data Source Error")).toBeInTheDocument();
    const closeBtn = screen.getAllByTestId("close");
    expect(closeBtn).toHaveLength(8);
    await waitFor(() => {
      fireEvent.click(closeBtn[0]);
    });
  });

  test("Clear data button is visible and clickable", async () => {
    const button = screen.getByText("Clear Data");
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    await waitFor(() => {
      fireEvent.click(button);
    });
  });

  test("Complete measure button is visible and clickable", async () => {
    const button = screen.getByText("Complete Measure");
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    await waitFor(() => {
      fireEvent.click(button);
    });
    expect(await screen.findByText("Validation Error")).toBeInTheDocument();
  });

  test("Validation modal comes up and is clickable", async () => {
    const completeButton = screen.getByText("Complete Measure");
    expect(completeButton).toBeInTheDocument();
    expect(completeButton).toBeEnabled();
    await waitFor(() => {
      fireEvent.click(completeButton);
    });

    const yesButton = await screen.findByText("Yes");
    expect(yesButton).toBeInTheDocument();
    expect(yesButton).toBeEnabled();
    await waitFor(() => {
      fireEvent.click(yesButton);
    });
  });
});

describe("measure updates with empty responses", () => {
  const mockNavigate = jest.fn();
  let navigateSpy: jest.SpyInstance;

  beforeEach(() => {
    mockNavigate.mockClear();
    mockMutate
      .mockReset()
      .mockImplementation((_variables, options) =>
        options.onSettled(null, null)
      );
    mockToast.mockClear();
    defaultMockValues.useGetMeasureValues.refetch.mockClear();
    navigateSpy = jest
      .spyOn(require("react-router"), "useNavigate")
      .mockReturnValue(mockNavigate);
    mockUseUser.mockReturnValue({ isStateUser: true });
    renderMeasureWrapper(
      { measureId: "AMMAD", year: "2021" },
      { useUpdateMeasureValues: { mutate: mockMutate } }
    );
  });

  afterEach(() => {
    navigateSpy.mockRestore();
  });

  test("should refetch and return to the measure list after clearing data with an empty response", async () => {
    fireEvent.click(screen.getByText("Clear Data"));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(-1));
    expect(defaultMockValues.useGetMeasureValues.refetch).toHaveBeenCalled();
    expect(mockMutate).toHaveBeenCalledWith(
      { data: {}, status: "incomplete", reporting: undefined },
      expect.any(Object)
    );
  });

  test("should not refetch or navigate when the measure update fails", async () => {
    const error = new Error("Update failed");
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    mockMutate.mockImplementationOnce((_variables, options) => {
      options.onSettled(undefined, error);
      options.onError(error);
    });

    fireEvent.click(screen.getByText("Clear Data"));

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({ status: "error" })
      )
    );
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(
      defaultMockValues.useGetMeasureValues.refetch
    ).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(error);
    logSpy.mockRestore();
  });
});
