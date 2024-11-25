import { CoreSetTableItem } from "components/Table/types";
import { CoreSetAbbr } from "types";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { screen } from "@testing-library/react";
import { SubmitCoreSetButton } from ".";
import { useApiMock } from "utils/testUtils/useApiMock";
import { useUser } from "hooks/authHooks";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("hooks/authHooks");
const mockUseUser = useUser as jest.Mock;

jest.mock("utils/getMeasureYear");
const mockGetMeasureYear = getMeasureYear as jest.Mock;

interface Props {
  coreSet: CoreSetAbbr;
  coreSetStatus: CoreSetTableItem.Status;
  isSubmitted: boolean;
  year: string;
  isStateUser: boolean;
}

const renderTestComponent = (props: Props) => {
  mockGetMeasureYear.mockReturnValue(2021);
  mockUseUser.mockImplementation(() => {
    return { isStateUser: props.isStateUser };
  });
  const queryClient = new QueryClient();
  useApiMock({});
  renderWithHookForm(
    <QueryClientProvider client={queryClient}>
      <SubmitCoreSetButton
        coreSet={props.coreSet}
        coreSetStatus={props.coreSetStatus}
        isSubmitted={props.isSubmitted}
        year={props.year}
      />
    </QueryClientProvider>
  );
};

describe("Test the SubmitCoreSetButton component", () => {
  let props: Props;

  beforeEach(() => {
    // reset component props
    props = {
      coreSet: CoreSetAbbr.ACS,
      coreSetStatus: CoreSetTableItem.Status.COMPLETED,
      isSubmitted: false,
      year: "2021",
      isStateUser: true,
    };
  });

  test("Check that the view renders", () => {
    renderTestComponent(props);
    expect(screen.getByText(/Submit Core Set/i)).toBeVisible();
    expect(
      screen.getByText(
        /Complete all Adult Core Set Questions and Adult Core Set Measures to submit FFY 2021/i
      )
    ).toBeVisible();
    expect(
      screen.getByText(/Submit Core Set/i).closest("button")
    ).not.toBeDisabled();
  });

  test("Check that for a non-state user the button is disabled", () => {
    props.isStateUser = false;
    renderTestComponent(props);
    expect(screen.getByText(/Submit Core Set/i)).toBeVisible();
    expect(
      screen.getByText(
        /Complete all Adult Core Set Questions and Adult Core Set Measures to submit FFY 2021/i
      )
    ).toBeVisible();
    expect(
      screen.getByText(/Submit Core Set/i).closest("button")
    ).toBeDisabled();
  });

  test("Check that coreSet prop changes the helper text (CCS)", () => {
    props.coreSet = CoreSetAbbr.CCS;
    renderTestComponent(props);
    expect(
      screen.getByText(
        /Complete all Child Core Set Questions: Medicaid & CHIP and Child Core Set Measures: Medicaid & CHIP to submit FFY 2021/i
      )
    ).toBeVisible();
  });
  test("Check that coreSet prop changes the helper text (CCSM)", () => {
    props.coreSet = CoreSetAbbr.CCSM;
    renderTestComponent(props);
    expect(
      screen.getByText(
        /Complete all Child Core Set Questions: Medicaid and Child Core Set Measures: Medicaid to submit FFY 2021/i
      )
    ).toBeVisible();
  });
  test("Check that coreSet prop changes the helper text (CCSC)", () => {
    props.coreSet = CoreSetAbbr.CCSC;
    renderTestComponent(props);
    expect(
      screen.getByText(
        /Complete all Child Core Set Questions: CHIP and Child Core Set Measures: CHIP to submit FFY 2021/i
      )
    ).toBeVisible();
  });
  test("Check that coreSet prop changes the helper text (HHCS)", () => {
    props.coreSet = CoreSetAbbr.HHCS;
    renderTestComponent(props);
    expect(
      screen.getByText(
        /Complete all Health Home Core Set Questions and Health Home Core Set Measures to submit FFY 2021/i
      )
    ).toBeVisible();
  });

  test("Check that when coreSetStatus !== COMPLETED the button is disabled (NOT_STARTED)", () => {
    props.coreSetStatus = CoreSetTableItem.Status.NOT_STARTED;
    renderTestComponent(props);
    expect(
      screen.getByText(/Submit Core Set/i).closest("button")
    ).toBeDisabled();
  });

  test("Check that when coreSetStatus !== COMPLETED the button is disabled (IN_PROGRESS)", () => {
    props.coreSetStatus = CoreSetTableItem.Status.IN_PROGRESS;
    renderTestComponent(props);
    expect(
      screen.getByText(/Submit Core Set/i).closest("button")
    ).toBeDisabled();
  });

  test("Check that when coreSetStatus !== COMPLETED the button is disabled (SUBMITTED)", () => {
    props.coreSetStatus = CoreSetTableItem.Status.SUBMITTED;
    renderTestComponent(props);
    expect(
      screen.getByText(/Submit Core Set/i).closest("button")
    ).toBeDisabled();
  });

  test("Check that when isSubmitted === true the button does not appear", () => {
    props.isSubmitted = true;
    renderTestComponent(props);
    expect(screen.queryByText(/Submit Core Set/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /Complete all Adult Core Set Questions and Adult Core Set Measures to submit FFY 2021/i
      )
    ).not.toBeInTheDocument();
    expect(screen.getByText(/Submitted/)).toBeVisible();
  });
});
