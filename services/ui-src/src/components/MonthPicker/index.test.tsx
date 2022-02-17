import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as QMR from "components";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";

describe("Test MonthPickerPopup", () => {
  test("Check MonthPicker Renders", () => {
    const { getByRole } = render(
      <QMR.MonthPickerCalendar onChange={() => {}} />
    );

    expect(getByRole("button", { name: /Month Picker/i })).toBeVisible();
  });

  test("Check passed year is focused", () => {
    const { getByRole, getByText } = render(
      <QMR.MonthPickerCalendar selectedYear={"1995"} onChange={() => {}} />
    );

    expect(getByRole("button", { name: /Month Picker/i })).toBeVisible();
    expect(getByText("1995")).toBeInTheDocument();
  });

  test("onChange Fires when a month is selected", async () => {
    const mockChangeFn = jest.fn();
    const { getByRole, findByRole } = render(
      <QMR.MonthPickerCalendar selectedYear={"1995"} onChange={mockChangeFn} />
    );

    fireEvent.click(getByRole("button", { name: /Month Picker/i }));
    const button = await findByRole("button", { name: /January/i });
    fireEvent.click(button);

    expect(mockChangeFn).toHaveBeenCalled();
  });

  test("Year changes on previous button event", async () => {
    const mockChangeFn = jest.fn();
    const { getByRole, findByRole, queryByText } = render(
      <QMR.MonthPickerCalendar selectedYear={"1995"} onChange={mockChangeFn} />
    );

    fireEvent.click(getByRole("button", { name: /Month Picker/i }));
    const button = await findByRole("button", { name: /Previous Year/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(queryByText(/1994/i)).toBeInTheDocument();
    });
  });

  test("Year changes on next button event", async () => {
    const mockChangeFn = jest.fn();
    const { getByRole, findByRole, queryByText } = render(
      <QMR.MonthPickerCalendar selectedYear={"1995"} onChange={mockChangeFn} />
    );

    fireEvent.click(getByRole("button", { name: /Month Picker/i }));
    const button = await findByRole("button", { name: /Next Year/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(queryByText(/1996/i)).toBeInTheDocument();
    });
  });

  test("Locked Year Picker has no year toggle buttons", async () => {
    const { getByRole, queryByLabelText } = render(
      <QMR.MonthPickerCalendar yearLocked={true} onChange={() => {}} />
    );

    fireEvent.click(getByRole("button", { name: /Month Picker/i }));
    await waitFor(() => {
      expect(queryByLabelText(/Previous Year/i)).not.toBeInTheDocument();
    });
  });
});

describe("Testing MonthPicker", () => {
  test("Check that it renders", async () => {
    const { getByDisplayValue, getByText, getByRole } = renderWithHookForm(
      <QMR.MonthPicker name="testComponent" />,
      {
        defaultValues: {
          testComponent: { selectedMonth: "11", selectedYear: "2011" },
        },
      }
    );
    expect(getByDisplayValue("11"));
    expect(getByDisplayValue("2011"));
    expect(getByText(/Month:/i));
    expect(getByText(/Year:/i));
    expect(getByRole("button", { name: /Month Picker/i }));
  });

  test("External click event closes popup", async () => {
    const { getByRole, findByRole, findByLabelText } = renderWithHookForm(
      <QMR.MonthPicker initYear={"1995"} name="testComponent" />,
      {
        defaultValues: {
          testComponent: { selectedMonth: "11", selectedYear: "2011" },
        },
      }
    );

    fireEvent.click(getByRole("button", { name: /Month Picker/i }));
    await findByRole("button", { name: /January/i });
    fireEvent.click(document);

    expect(await findByLabelText(/Previous Year/i)).not.toBeDisabled();
  });

  test("Check that year interactions are locked", async () => {
    const { getByRole, queryByLabelText } = renderWithHookForm(
      <QMR.MonthPicker yearLocked initYear="2011" name="testComponent" />,
      {
        defaultValues: {
          testComponent: { selectedMonth: "11", selectedYear: "2011" },
        },
      }
    );

    // change year
    fireEvent.click(getByRole("button", { name: /Month Picker/i }));
    await waitFor(() => {
      expect(queryByLabelText(/Next Year/i)).not.toBeInTheDocument();
    });
  });

  test("Check that input values update on popup interaction", async () => {
    const { getByRole, findByRole, findByText, findByDisplayValue } =
      renderWithHookForm(<QMR.MonthPicker name="testComponent" />, {
        defaultValues: {
          testComponent: { selectedMonth: "11", selectedYear: "2011" },
        },
      });

    // change year
    fireEvent.click(getByRole("button", { name: /Month Picker/i }));
    const yearButton = await findByRole("button", { name: /Next Year/i });
    fireEvent.click(yearButton);
    expect(await findByText(/2012/i));

    // change month
    const button = await findByRole("button", { name: /January/i });
    fireEvent.click(button);

    // check inputs updated
    expect(await findByDisplayValue(/2012/i));
  });

  test("Check that input values update on type input", async () => {
    const { getByLabelText } = renderWithHookForm(
      <QMR.MonthPicker name="testComponent" />,
      {
        defaultValues: {
          testComponent: { selectedMonth: "11", selectedYear: "2011" },
        },
      }
    );

    // change month
    userEvent.type(getByLabelText("Month:"), "12");
    expect(getByLabelText("Month:")).toHaveValue("12");

    // change year
    userEvent.type(getByLabelText("Year:"), "1912");
    expect(getByLabelText("Year:")).toHaveValue("1912");
  });

  test("Check that input values fails to show invalid values", async () => {
    const { getByLabelText } = renderWithHookForm(
      <QMR.MonthPicker name="testComponent" />,
      {
        defaultValues: {
          testComponent: { selectedMonth: "11", selectedYear: "2011" },
        },
      }
    );

    // change month
    userEvent.type(getByLabelText("Month:"), "73");
    expect(getByLabelText("Month:")).toHaveValue("7");

    // change year
    userEvent.type(getByLabelText("Year:"), "1712");
    expect(getByLabelText("Year:")).toHaveValue("17");
  });
});
