import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createElement } from "react";
import { RouterWrappedComp } from "utils/testing";
import { MeasureWrapper } from "./";
import { useApiMock } from "utils/testUtils/useApiMock";
import { useUser } from "hooks/authHooks";
import { AABAD } from "measures/2024/AABAD/index";

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

const mockMutate = jest.fn((_variables: any, options?: any) => {
  if (typeof options?.onSuccess === "function") return options.onSuccess();
});

describe("Test Measure Wrapper Component", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: false };
    });

    const div = createElement("div");
    useApiMock({});
    render(
      <RouterWrappedComp>
        <MeasureWrapper
          measure={div}
          name="testing"
          year="2021"
          measureId="AMMAD"
        />
      </RouterWrappedComp>
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

    const div = createElement("div");
    useApiMock({});
    render(
      <RouterWrappedComp>
        <MeasureWrapper
          measure={div}
          name="testing-active"
          year="2021"
          measureId="AMMAD"
        />
      </RouterWrappedComp>
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

    const div = createElement("div");
    useApiMock({});
    render(
      <RouterWrappedComp>
        <MeasureWrapper
          measure={div}
          name="testing-inactive"
          year="2021"
          measureId="AMMAD"
        />
      </RouterWrappedComp>
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

    const div = createElement("div");
    useApiMock({});
    render(
      <RouterWrappedComp>
        <MeasureWrapper
          measure={div}
          name="testing-inactive"
          year="2021"
          measureId="NCIDDSAD"
          autocompleteOnCreation={true}
        />
      </RouterWrappedComp>
    );
  });

  test("auto-completed measures should not have validate and complete buttons", () => {
    const completeMeasureButton = screen.queryByLabelText("Complete Measure");
    const validateMeasureButton = screen.queryByLabelText("Validate Measure");
    expect(completeMeasureButton).toBeNull();
    expect(validateMeasureButton).toBeNull();
  });
});

describe("Test buttons", () => {
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
            <AABAD
              name={
                "Avoidance of Antibiotic Treatment for Acute Bronchitis/Bronchiolitis: Age 18 And Older"
              }
              year={"2024"}
              measureId={"AAB-AD"}
            ></AABAD>
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
