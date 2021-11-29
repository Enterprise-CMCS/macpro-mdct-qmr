import { useState } from "react";
import * as CUI from "@chakra-ui/react";
import * as CoreQs from "components/CoreQuestions";
import * as QMR from "components/Inputs";

export const DemoQuestions = () => {
  // const { loading, data, errors } = useQuery('state' measure id')
  // const [update, {}] = useMutation()

  const [{ data }, setData] = useState<any>({});
  const year = 2021;
  const state = "OH";
  const measureId = "AIF-HH";

  const handleChange = (questionId: string, value: any) => {
    const newData = { ...data, [questionId]: value };
    setData({
      state,
      year,
      measureId,
      data: newData,
    });
  };

  return (
    <CUI.Container maxW="2xl">
      <CoreQs.AreYouReporting
        onChange={(v) => handleChange("1", v)}
        value={data?.["1"]}
        options={[
          {
            displayValue: `Yes, I am reporting Admission to an Institution from the Community (${measureId}) for FFY ${year} quality measure reporting.`,
            value: "Yes, I am reporting",
          },
          {
            displayValue: `No, I am not reporting Admission to an Institution from the Community (${measureId}) for FFY ${year} quality measure reporting.`,
            value: "No, I am not reporting",
          },
        ]}
        //
      />
      <CoreQs.StatusOfDataReported
        onChange={(v) => handleChange("2", v)}
        value={data?.["2"]}
        options={[
          {
            displayValue: "I am reporting provisional data",
            value: "I am reporting provisional data",
            children: [
              <QMR.TextArea
                label="Please provide additional information such as when the data will be final and if you plan to modify the data reported here:"
                formLabelProps={{ fontWeight: "normal", fontSize: "normal" }}
                key="status-2a"
                value={data?.["2a"]}
                onChange={(e) => handleChange("2a", e.target.value)}
              />,
            ],
          },
          {
            displayValue: "I am reporting final data",
            value: "I am reporting final data",
          },
        ]}
      />
    </CUI.Container>
  );
};
