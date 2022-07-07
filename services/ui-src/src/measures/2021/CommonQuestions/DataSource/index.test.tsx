import * as DC from "dataConstants";
import { DataSource } from "./index";
import { DataSourceData } from "./data";
import fireEvent from "@testing-library/user-event";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { screen } from "@testing-library/react";

describe("Test the global DataSource component", () => {
  describe("with default data options", () => {
    const DataSourceComponent = <DataSource />;
    const renderComponent = () => renderWithHookForm(DataSourceComponent);

    it("Check that the component renders correctly", async () => {
      const { container } = renderComponent();

      expect(screen.getByText("Data Source")).toBeVisible();

      // there should be only 2 options
      expect(container.getElementsByClassName("chakra-checkbox").length).toBe(
        2
      );

      const option1 = screen.getByLabelText(DC.ADMINISTRATIVE_DATA);
      const option2 = screen.getByLabelText(DC.OTHER_DATA_SOURCE);

      // Clicking option1 should reveal 2 sub-options
      fireEvent.click(option1);
      const option1Children = container.querySelectorAll(
        ".chakra-stack .css-n21gh5 > *"
      );
      expect(option1Children.length).toBe(2);

      expect(
        screen.getByText(DC.MEDICAID_MANAGEMENT_INFO_SYSTEM)
      ).toBeInTheDocument();
      expect(
        screen.getByText(DC.ADMINISTRATIVE_DATA_OTHER)
      ).toBeInTheDocument();

      // should do nothing
      fireEvent.click(
        screen.getByLabelText(DC.MEDICAID_MANAGEMENT_INFO_SYSTEM)
      );

      expect(
        screen.queryAllByLabelText("Describe the data source:").length
      ).toBe(0);

      // should reveal text area
      fireEvent.click(screen.getByLabelText(DC.ADMINISTRATIVE_DATA_OTHER));

      const adminDataOtherTextArea = await screen.findByLabelText(
        "Describe the data source:"
      );
      fireEvent.type(adminDataOtherTextArea, "This is the test text");
      expect(adminDataOtherTextArea).toHaveDisplayValue(
        "This is the test text"
      );

      // close option1
      fireEvent.click(option1);

      // Clicking option2 should reveal a text area
      fireEvent.click(option2);
      const textArea = await screen.findByLabelText(
        "Describe the data source:"
      );
      fireEvent.type(textArea, "This is the test text");
      expect(textArea).toHaveDisplayValue("This is the test text");
    });
  });

  describe("with custom data options", () => {
    // define custom data options
    const data: DataSourceData = {
      optionsLabel: "",
      options: [
        {
          value: "Option 1",
          subOptions: [
            {
              label: "What is the Option 1 Data Source?",
              options: [
                {
                  value: "I'm not telling",
                },
                {
                  value: "You'll have to kill me first",
                  description: true,
                },
              ],
            },
          ],
        },
        {
          value: "A Better Option",
          description: true,
        },
        {
          value: "Something Even Crazier Than The First 2",
          description: false,
        },
      ],
    };
    const DataSourceComponent = <DataSource data={data} />;
    const renderComponent = () => renderWithHookForm(DataSourceComponent);

    it("Check that the component renders correctly", async () => {
      const { container } = renderComponent();

      expect(screen.getByText("Data Source")).toBeVisible();

      // check that there should be only 2 options
      expect(container.getElementsByClassName("chakra-checkbox").length).toBe(
        3
      );

      const option1 = screen.getByLabelText("Option 1");
      const option2 = screen.getByLabelText("A Better Option");
      const option3 = screen.getByLabelText(
        "Something Even Crazier Than The First 2"
      );

      // Clicking option1 should reveal 2 sub-options
      fireEvent.click(option1);
      const option1Children = container.querySelectorAll(
        ".chakra-stack .css-n21gh5 > *"
      );
      expect(option1Children.length).toBe(2);

      expect(screen.getByText("I'm not telling")).toBeInTheDocument();
      expect(
        screen.getByText("You'll have to kill me first")
      ).toBeInTheDocument();

      // should do nothing
      fireEvent.click(screen.getByLabelText("I'm not telling"));

      expect(
        screen.queryAllByLabelText("Describe the data source:").length
      ).toBe(0);

      // should reveal text area
      fireEvent.click(screen.getByLabelText("You'll have to kill me first"));

      const subOptionTextArea = await screen.findByLabelText(
        "Describe the data source:"
      );
      fireEvent.type(subOptionTextArea, "This is the test text");
      expect(subOptionTextArea).toHaveDisplayValue("This is the test text");

      // close option1
      fireEvent.click(option1);

      // Clicking option2 should reveal a text area
      fireEvent.click(option2);
      const option2TextArea = await screen.findByLabelText(
        "Describe the data source:"
      );
      fireEvent.type(option2TextArea, "This is the test text");
      expect(option2TextArea).toHaveDisplayValue("This is the test text");

      // close option2
      fireEvent.click(option2);

      // Clicking option3 do nothing
      fireEvent.click(option3);
      expect(
        screen.queryAllByLabelText("Describe the data source:").length
      ).toBe(0);

      fireEvent.click(option3);
    });
  });
});
