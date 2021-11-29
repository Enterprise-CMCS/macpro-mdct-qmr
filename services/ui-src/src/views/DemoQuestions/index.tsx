import { useState } from "react";
import * as CUI from "@chakra-ui/react";
import { AreYouReporting } from "components/CoreQuestions";

export const DemoQuestions = () => {
  // const { loading, data, errors } = useQuery('state' measure id')
  // const [update, {}] = useMutation()

  const [data, setData] = useState<any>({});
  const year = 2021;
  const state = "OH";
  const measureId = "AIF-HH";

  const handleChange = (qId: string, value: any) => {
    const newData = { ...data, [qId]: value };
    console.log({ newData });
    setData({
      state,
      year,
      measureId,
      data: newData,
    });
  };

  console.log({ data });

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
    </CUI.Container>
  );
};
