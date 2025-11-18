import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createElement } from "react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "./";
import { useApiMock } from "utils/testUtils/useApiMock";
import { useUser } from "hooks/authHooks";
import { CPUAD } from "measures/2024/CPUAD/index";

jest.mock("components/Title", () => ({
  Title: ({ pageTitle }: { pageTitle: string }) => (
    <div data-testid="mock-title">{pageTitle}</div>
  ),
}));

jest.mock("hooks/authHooks");

const mockUseUser = useUser as jest.Mock;
const div = createElement("div");

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

const useParamsSpy = jest.spyOn(require("react-router-dom"), "useParams");

const mockMutate = jest.fn((_variables: any, options?: any) => {
  if (typeof options?.onSettled === "function")
    return options.onSettled("data");
});

const renderMeasureWrapper = (props: any, apiData = {}) => {
  useApiMock(apiData);
  return render(
    <RouterWrappedComp>
      <MeasureWrapper measure={div} name="testing" year="2021" {...props} />
    </RouterWrappedComp>
  );
};

describe("Test Measure Wrapper Component", () => {
  beforeEach(() => {
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

  test("should run save when clicking the save button and show success toast", async () => {
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
    expect(screen.getByText("Data Source Error")).toBeInTheDocument();
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
    expect(screen.getByText("Validation Error")).toBeInTheDocument();
  });

  test("Validation modal comes up and is clickable", async () => {
    const completeButton = screen.getByText("Complete Measure");
    expect(completeButton).toBeInTheDocument();
    expect(completeButton).toBeEnabled();
    await waitFor(() => {
      fireEvent.click(completeButton);
    });

    const yesButton = screen.getByText("Yes");
    expect(yesButton).toBeInTheDocument();
    expect(yesButton).toBeEnabled();
    await waitFor(() => {
      fireEvent.click(yesButton);
    });
  });
});
