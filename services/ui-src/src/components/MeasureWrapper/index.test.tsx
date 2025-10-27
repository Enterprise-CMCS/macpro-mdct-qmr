import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createElement } from "react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "./";
import { useApiMock } from "utils/testUtils/useApiMock";
import { useUser } from "hooks/authHooks";
import { CPUAD } from "measures/2024/CPUAD/index";
import { FormProvider, useForm } from "react-hook-form";

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

const mockMutate = jest.fn((_variables: any, options?: any) => {
  if (typeof options?.onSuccess === "function") return options.onSuccess();
});
const div = createElement("div");
const TestComponent = (props: any) => {
  return (
    <RouterWrappedComp>
      <MeasureWrapper name="testing" year="2021" measureId="AMMAD" {...props} />
    </RouterWrappedComp>
  );
};

describe("Test Measure Wrapper Component", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: false };
    });
    useApiMock({});
    render(
      <TestComponent
        measure={div}
        name="testing"
        year="2021"
        measureId="AMMAD"
      />
    );
  });

  it("renders the form component", () => {
    expect(screen.getByTestId("measure-wrapper-form")).toBeInTheDocument();
  });
});

describe("state user", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });
    useApiMock({});
    render(
      <TestComponent
        measure={div}
        name="testing-active"
        year="2021"
        measureId="AMMAD"
      />
    );
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

    useApiMock({});
    render(
      <TestComponent
        measure={div}
        name="testing-inactive"
        year="2021"
        measureId="AMMAD"
      />
    );
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
    useApiMock({});
    render(
      <TestComponent
        measure={div}
        name="testing-inactive"
        year="2021"
        measureId="NCIDDSAD"
        autocompleteOnCreation={true}
      />
    );
  });

  test("auto-completed measures should not have validate and complete buttons", () => {
    const completeMeasureButton = screen.queryByLabelText("Complete Measure");
    const validateMeasureButton = screen.queryByLabelText("Validate Measure");
    expect(completeMeasureButton).toBeNull();
    expect(validateMeasureButton).toBeNull();
  });
});

describe("test measure floating bar menu", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });

    // const div = createElement("div");
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

  test("should run save when clicking the save button", async () => {
    const textArea = await screen.findByLabelText(
      "I am reporting provisional data."
    );
    fireEvent.click(textArea);
    const saveBtn = screen.getByText("Save");
    fireEvent.click(saveBtn);
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });
});
