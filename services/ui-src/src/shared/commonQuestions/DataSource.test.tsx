import { DataSource } from "./DataSource";
import { DataSourceData as DS } from "utils/testUtils/testFormData";
import { DataDrivenTypes } from "measures/2024/shared/CommonQuestions/types";
import { testSnapshot } from "utils/testUtils/testSnapshot";
import SharedContext from "shared/SharedContext";
import commonQuestionsLabel from "labels/2024/commonQuestionsLabel";

describe("Test the global DataSource component", () => {
  it("(Default) Component renders with correct content", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel}>
        <DataSource />
      </SharedContext.Provider>
    );
    testSnapshot({ component, defaultValues: DS.default });
  });

  it("(Custom Structure) Component renders with correct content", () => {
    const component = (
      <SharedContext.Provider value={commonQuestionsLabel}>
        <DataSource data={data} />
      </SharedContext.Provider>
    );
    testSnapshot({ component, defaultValues: DS.custom });
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
