import { useState } from "react";
import * as CUI from "@chakra-ui/react";
import { AreYouReporting } from "components/CoreQuestions";
import { StatusOfDataReported } from "components/CoreQuestions/StatusOfDataReported";
import * as QMR from "components/Inputs";

export const DemoQuestions = () => {
  // const { loading, data, errors } = useQuery('state' measure id')
  // const [update, {}] = useMutation()

  const [data, setData] = useState<any>({});
  const year = 2021;
  const state = "OH";
  const measureId = "AIF-HH";

  const handleChange = (qId: string, value: any) => {
    const newData = { ...data, [qId]: value };
    setData({
      state,
      year,
      measureId,
      data: newData,
    });
  };

  return (
    <CUI.Container>
      <AreYouReporting
        onChange={handleChange}
        value={data?.data?.["1"]}
        options={[
          {
            displayValue:
              "Yes, I am reporting Admission to an Institution from the Community (AIF-HH) for FFY 2021 quality measure reporting.",
            value: "Yes, I am reporting",
          },
          {
            displayValue:
              "No, I am not reporting Admission to an Institution from the Community (AIF-HH) for FFY 2021 quality measure reporting.",
            value: "No, I am not reporting",
          },
        ]}
        //
      />
      <StatusOfDataReported
        onChange={handleChange}
        value={data?.data?.["2"]}
        options={[
          {
            displayValue: "I am reporting provisional data",
            value: "I am reporting provisional data",
            children: [<QMR.TextArea value={""} onChange={() => {}} />],
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
