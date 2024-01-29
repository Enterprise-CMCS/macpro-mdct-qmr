import { AdministrativeQuestions } from ".";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import * as CUI from "@chakra-ui/react";
import { fireEvent, screen } from "@testing-library/react";

const fieldKeys = [
  "numberOfAdults",
  "minAgeOfAdults",
  "numberOfChildren",
  "maxAgeChildren",
  "numberOfIndividuals",
  "numberOfProviders",
];

const AdministrativeList = () => {
  return (
    <CUI.OrderedList>
      <AdministrativeQuestions />
    </CUI.OrderedList>
  );
};

describe("Test AdministrativeQuestions Component", () => {
  beforeEach(() => {
    renderWithHookForm(<AdministrativeList />);
  });

  it("Check that the input fields are rendered", () => {
    fieldKeys.forEach((key) => {
      expect(screen.getByLabelText(`AdministrativeData.${key}`));
    });
  });

  it("Check entering a number into the input fields", () => {
    fieldKeys.forEach((key) => {
      const inputField = screen.getByLabelText(`AdministrativeData.${key}`);
      fireEvent.change(inputField, { target: { value: "5" } });
      expect(inputField).toHaveDisplayValue("5");
    });
  });
});

describe("Test Summation Of Total Number Of Individuals", () => {
  beforeEach(() => {
    renderWithHookForm(<AdministrativeList />);
  });

  it("Check auto sum of number of individuals", () => {
    const numOfAdults = screen.getByLabelText(
      `AdministrativeData.numberOfAdults`
    );
    fireEvent.change(numOfAdults, { target: { value: "3" } });

    const numOfChildren = screen.getByLabelText(
      `AdministrativeData.numberOfChildren`
    );
    fireEvent.change(numOfChildren, { target: { value: "5" } });

    const numberOfIndividuals = screen.getByLabelText(
      `AdministrativeData.numberOfIndividuals`
    );
    expect(numberOfIndividuals).toHaveDisplayValue("8");
  });

  it("Check number of individuals is changable after summation", () => {
    const numOfAdults = screen.getByLabelText(
      `AdministrativeData.numberOfAdults`
    );
    fireEvent.change(numOfAdults, { target: { value: "3" } });

    const numOfChildren = screen.getByLabelText(
      `AdministrativeData.numberOfChildren`
    );
    fireEvent.change(numOfChildren, { target: { value: "5" } });

    const numberOfIndividuals = screen.getByLabelText(
      `AdministrativeData.numberOfIndividuals`
    );
    expect(numberOfIndividuals).toHaveDisplayValue("8");

    fireEvent.change(numberOfIndividuals, { target: { value: "15" } });
    expect(numberOfIndividuals).toHaveDisplayValue("15");
  });
});
