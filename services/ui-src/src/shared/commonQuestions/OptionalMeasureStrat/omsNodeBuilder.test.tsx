import { fireEvent, screen, waitFor } from "@testing-library/react";
import { useFlags } from "launchdarkly-react-client-sdk";
import { TopLevelOmsChildren } from "./omsNodeBuilder";
import { renderWithHookForm } from "utils";
import { getMeasureYear } from "utils/getMeasureYear";

jest.mock("launchdarkly-react-client-sdk", () => ({
  useFlags: jest.fn(),
}));

jest.mock("./context", () => ({
  ...jest.requireActual("./context"),
  usePerformanceMeasureContext: () => {
    return {
      componentFlag: "DEFAULT",
      categories: [{ id: "cat-1", label: "cat 1", text: "cat 1" }],
      qualifiers: [{ id: "qual-1", label: "qual 1", text: "qual 1" }],
      performanceMeasureArray: [
        [
          {
            uid: "cat-1.qual-1",
            label: "qual 1",
            rate: "33.3",
            numerator: "2",
            denominator: "3",
          },
        ],
      ],
    };
  },
}));

jest.mock("utils/getMeasureYear", () => ({
  getMeasureYear: jest.fn(),
}));

const options = [
  {
    id: "mock option 1",
    flagSubCat: true,
    label: "Option 1",
    options: [{ id: "mock-sub", flagSubCat: false, label: "mock sub 1" }],
  },
];

describe("Test TopLevelOmsChildren", () => {
  it("Test TopLevelOmsChildren render", () => {
    (getMeasureYear as jest.Mock).mockReturnValue(2025);
    (useFlags as jest.Mock).mockReturnValue({
      "sogi-stratification-options": true,
    });

    renderWithHookForm(
      <TopLevelOmsChildren
        name={"mock"}
        parentDisplayName={"mock oms"}
        id={"mock-id"}
        options={options}
      />
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "Option 1" }));
    const yesRadio = screen.getByRole("radio", {
      name: "Yes, we are reporting aggregate data for the Option 1 categories.",
    });
    fireEvent.click(yesRadio);

    expect(screen.getByLabelText("cat 1")).toBeInTheDocument();

    const noRadio = screen.getByRole("radio", {
      name: "No, we are reporting disaggregated data for Option 1 subcategories",
    });
    fireEvent.click(noRadio);
    const addSub = screen.getByRole("button", {
      name: "+ Add Another Subcategory",
    });
    fireEvent.click(addSub);

    expect(
      screen.getByLabelText("Define the Additional Subcategory")
    ).toBeInTheDocument();
  });

  it("Test TopLevelOmsChildren render for legacy data", () => {
    (getMeasureYear as jest.Mock).mockReturnValue(2022);

    renderWithHookForm(
      <TopLevelOmsChildren
        name={"mock"}
        parentDisplayName={"mock oms"}
        id={"mock-id"}
        options={options}
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "Option 1" });
    fireEvent.click(checkbox);
    expect(
      screen.getByRole("radio", {
        name: "Yes, we are only reporting aggregated data for all mock option 1 categories.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", {
        name: "No, we are reporting independent data for all mock option 1 categories",
      })
    ).toBeInTheDocument();
  });

  it("Test TopLevelOmsChildren render with no options", async () => {
    (getMeasureYear as jest.Mock).mockReturnValue(2025);
    renderWithHookForm(
      <TopLevelOmsChildren
        name={"mock"}
        parentDisplayName={"mock oms"}
        id={"mock-id"}
        options={undefined}
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "cat 1" });
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(
        screen.getByRole("textbox", {
          name: "mock.rateData.rates.cat-1.qual-1.0.numerator",
        })
      ).toBeVisible();
      expect(
        screen.getByRole("textbox", {
          name: "mock.rateData.rates.cat-1.qual-1.0.denominator",
        })
      ).toBeVisible();
      expect(
        screen.getByRole("textbox", {
          name: "mock.rateData.rates.cat-1.qual-1.0.rate",
        })
      ).toBeVisible();
    });
  });
});
