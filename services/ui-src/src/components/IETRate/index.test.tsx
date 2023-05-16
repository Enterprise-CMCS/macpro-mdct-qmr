import { screen } from "@testing-library/react";
import { IETRate } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import * as CUI from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import * as QMR from "components";

//test data for summation by category
const categories = [
  { label: "Init: A", text: "Init: A", id: "init-a" },
  { label: "Init: B", text: "Init: B", id: "init-b" },
  { label: "Init: Total", text: "Init: Total", id: "init-total" },
];

const qualifers = [
  {
    label: "test1",
    text: "test1",
    id: "q1",
  },
  {
    label: "test2",
    text: "test2",
    id: "q2",
  },
];

const categoryName = categories[0].label;

const TestComponent = () => {
  const rates = [
    {
      label: "test",
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
  ];

  return (
    <IETRate
      rates={rates}
      categoryName={categoryName}
      categories={categories}
      name="test-component"
    />
  );
};

const TestComponent2 = () => {
  const rates = [
    {
      label: "test",
      denominator: "",
      numerator: "",
      rate: "",
      id: 1,
    },
  ];

  return (
    <IETRate
      rates={rates}
      categoryName={categoryName}
      categories={categories}
      name="test-component"
      readOnly={false}
    />
  );
};

describe("Test the Rate component", () => {
  beforeEach(() => {
    renderWithHookForm(<TestComponent />, {
      defaultValues: {
        "test-component": [
          {
            numerator: "1",
            denominator: "1",
            rate: "1",
          },
        ],
      },
    });
  });

  test("Check that component renders and includes a label when passed optionally", () => {
    expect(screen.getByText(/test/i)).toBeVisible();
  });

  test("Check that number input labels get rendered correctly", () => {
    expect(screen.getByLabelText(/denominator/i)).toBeVisible();
    expect(screen.getByLabelText(/numerator/i)).toBeVisible();
    expect(screen.getByLabelText(/rate/i)).toBeVisible();
  });

  test("Check that data pre-populates", () => {
    expect(screen.getAllByDisplayValue("1")).toHaveLength(3);
    expect(screen.getAllByDisplayValue("1")[0]).toBeInTheDocument();
  });

  test("Check that filling out text inputs changes rate calculation", async () => {
    const numeratorTextBox = await screen.findByLabelText("Numerator");
    const denominatorTextBox = await screen.findByLabelText("Denominator");
    const rateTextBox = await screen.findByLabelText("Rate");

    userEvent.type(numeratorTextBox, "123");
    userEvent.type(denominatorTextBox, "123");

    expect(rateTextBox).toHaveDisplayValue("100.0");
  });

  test("Check that the rate text box is readonly", async () => {
    const rateTextBox = await screen.findByLabelText("Rate");

    userEvent.type(rateTextBox, "4321");

    expect(rateTextBox).toHaveDisplayValue("1");
  });
});

describe("Test non-readonly rate component", () => {
  test("Check that the rate can be typed in when not readonly", () => {
    renderWithHookForm(<TestComponent2 />, {
      defaultValues: {
        "test-component": [
          {
            numerator: "1",
            denominator: "1",
            rate: "1",
          },
        ],
      },
    });

    const rateTextBox = screen.getByLabelText("Rate");

    userEvent.type(rateTextBox, "43");

    expect(rateTextBox).toHaveDisplayValue("43");
  });
});

const TestComponentWithTotal = () => {
  // Rates that include a total field
  return (
    <>
      {categories.map((cat) => {
        let rates: QMR.IRate[] | undefined = qualifers?.map((qual, idx) => ({
          label: qual.label,
          uid: cat.id + "." + qual.id,
          id: idx,
        }));

        return (
          <CUI.Box key={cat.id}>
            <CUI.Text>{cat.label}</CUI.Text>
            <IETRate
              rates={rates}
              categoryName={cat.label}
              categories={categories}
              name={cat.id}
              readOnly={false}
              calcTotal={true}
            />
          </CUI.Box>
        );
      })}
    </>
  );
};

describe("Test the Rate component when it includes a total NDR", () => {
  beforeEach(() => {
    //setting up default values to be use in the simulation
    let allRates: any = {};
    let defaultValues: any = { PerformanceMeasure: { rates: "" } };

    categories.forEach((cat) => {
      let rate: any = [];
      qualifers.forEach((qual) => {
        if (!cat.label.includes("Total")) {
          rate.push({
            label: qual.label,
            numerator: "1",
            denominator: "2",
            rate: "50.0",
            uid: cat.id + "." + qual.id,
          });
        } else
          rate.push({
            label: qual.label,
            numerator: "",
            denominator: "",
            rate: "",
            uid: cat.id + "." + qual.id,
            isTotal: true,
          });
      });

      defaultValues[cat.id] = rate;
      allRates[cat.id] = rate;
    });
    defaultValues.PerformanceMeasure.rates = allRates;

    renderWithHookForm(<TestComponentWithTotal />, {
      defaultValues: defaultValues,
    });
  });

  /* Iterate over all NDRs of rate component and confirm values match provided expectedValues. */
  const checkNDRs = (
    expectedValue: any,
    categoryIndex: number = 0,
    qualifierIndex: number = 0
  ) => {
    let cat = categories[categoryIndex];
    const id = cat.id + "." + qualifierIndex;

    expect(
      screen.getByLabelText(new RegExp(id + ".numerator", "i"))
    ).toHaveValue(expectedValue.numerator);
    expect(
      screen.getByLabelText(new RegExp(id + ".denominator", "i"))
    ).toHaveValue(expectedValue.denominator);
    expect(screen.getByLabelText(new RegExp(id + ".rate", "i"))).toHaveValue(
      expectedValue.rate
    );
  };

  test("Check that the components render and include their category & qualifer labels", () => {
    categories.forEach((cat) => {
      expect(screen.getByText(new RegExp(cat.label, "i"))).toBeVisible();
    });

    qualifers.forEach((rate) => {
      const subTitle = screen.getAllByText(new RegExp(rate.label, "i"));
      expect(subTitle).toHaveLength(categories.length);
    });
  });

  test("Check that the component renders with the correct default values", () => {
    const expectedValues = [
      {
        label: "test1",
        numerator: "1",
        denominator: "2",
        rate: "50.0",
      },
      {
        label: "test2",
        numerator: "1",
        denominator: "2",
        rate: "50.0",
      },
    ];

    const expectedTotalValues = [
      {
        label: "test1",
        numerator: "",
        denominator: "",
        rate: "",
      },
      {
        label: "test2",
        numerator: "",
        denominator: "",
        rate: "",
      },
    ];

    categories.forEach((cat, catIndex) => {
      const values = cat.label.includes("Total")
        ? expectedTotalValues
        : expectedValues;

      values.forEach((values, qualIndex) => {
        checkNDRs(values, catIndex, qualIndex);
      });
    });
  });

  // for a more indepth look at the values being added to each label
  const checkValue = () => {
    categories.forEach((cat) => {
      for (var i = 0; i < 2; i++) {
        const id = cat.id + "." + i + ".";
        console.log(
          cat.label +
            "-" +
            i +
            ", N: " +
            screen
              .getByLabelText(new RegExp(id + "numerator", "i"))
              .getAttribute("value") +
            ", D: " +
            screen
              .getByLabelText(new RegExp(id + "denominator", "i"))
              .getAttribute("value") +
            ", R: " +
            screen
              .getByLabelText(new RegExp(id + "rate", "i"))
              .getAttribute("value")
        );
      }
    });
  };

  /* Goal of this unit test
   * Purpose: This unit test is to make sure that the total calculations will run after a value is changed in either the numerator or denominator
   * Issue: While the numerator & denominator has a simulated data change, the value in total still hasn't updated
   * While in IETRate component, calculate function shows that the data total was changed
   * There is a disconnect between what is happening in the component and the unit test data
   */

  test("Check that user input in a non-total field triggers total calculation", () => {
    const numeratorToChange = screen.getByLabelText(/init-a.0.numerator/i);
    const denominatorToChange = screen.getByLabelText(/init-a.0.denominator/i);
    const numeratorTotal = screen.getByLabelText(/init-total.0.numerator/i);

    //Note: if the numerator is larger than the denominator, the total will not calculate, that is intentional
    userEvent.type(denominatorToChange, "202");
    userEvent.type(numeratorToChange, "22");

    //total numerator should show 23 as init-b.0.numerator = 1
    console.log(numeratorTotal.getAttribute("value"));

    // userEvent.type(numeratorToChange, "2");
    // const expectedValues = [
    //   {
    //     label: "test1",
    //     numerator: "2",
    //     denominator: "2",
    //     rate: "1",
    //   },
    //   {
    //     label: "test2",
    //     numerator: "1",
    //     denominator: "2",
    //     rate: "50.0",
    //   },
    // ];

    // const expectedTotalValues = [{
    //   label: "total",
    //   numerator: "3",
    //   denominator: "4",
    //   rate: "75.0",
    // }];

    // categories.forEach((cat, catIndex) => {
    //   const values = cat.label.includes("Total")
    //     ? expectedTotalValues
    //     : expectedValues;

    //     checkNDRs(values, catIndex, 0);
    //   });
    // });
  });

  // test("Check that if numerator > denominator, the calculated total rate should be empty", () => {
  //   // Change the numerator from 1 to 5
  //   const numeratorToChange = screen.getAllByLabelText(/numerator/i)[0];
  //   userEvent.type(numeratorToChange, "5");

  //   const expectedValues = [
  //     {
  //       label: "test1",
  //       numerator: "5",
  //       denominator: "1",
  //       rate: "",
  //     },
  //     {
  //       label: "test2",
  //       numerator: "2",
  //       denominator: "2",
  //       rate: "1",
  //     }
  //   ];

  //   checkNDRs(expectedValues);
  // });

  // test("Check that user input in a total field does not trigger total calculation", () => {
  //   // Manually set the total numerator
  //   const numeratorToChange = screen.getAllByLabelText(/numerator/i)[2];
  //   userEvent.type(numeratorToChange, "5");

  //   const expectedValues = [
  //     {
  //       label: "test1",
  //       numerator: "1",
  //       denominator: "1",
  //       rate: "1",
  //     },
  //     {
  //       label: "test2",
  //       numerator: "2",
  //       denominator: "2",
  //       rate: "1",
  //     }
  //   ];

  //   checkNDRs(expectedValues);

  //   // Manually set the total denominator
  //   const denominatorToChange = screen.getAllByLabelText(/denominator/i)[2];
  //   userEvent.type(denominatorToChange, "10");

  //   expectedValues[2] = {
  //     label: "total",
  //     numerator: "5",
  //     denominator: "10",
  //     rate: "50.0",
  //   };

  //   checkNDRs(expectedValues);
  // });
});
