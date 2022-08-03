import { DataSource } from "./index";
import { DataSourceData as DS } from "utils/testUtils/testFormData";
import { DataDrivenTypes } from "measures/2021/CommonQuestions/types";
import { testSnapshot } from "utils/testUtils/testSnapshot";

describe("Test the global DataSource component", () => {
  it("(Default) Component renders with correct content", () => {
    const component = <DataSource />;
    testSnapshot({ component, defaultValues: { defaultValues: DS.default } });
  });

  it("(Custom Structure) Component renders with correct content", () => {
    const component = <DataSource data={data} />;
    testSnapshot({ component, defaultValues: { defaultValues: DS.custom } });
  });
});

const data: DataDrivenTypes.DataSource = {
  optionsLabel: "How do we feel about a label with this text? Does it work?",
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
