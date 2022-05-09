import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { SingleSSM } from "./SingleSSM";
import { useState } from "react";

// Add State-Specific Measure component
export const AddSSM = () => {
  const [SSMs, addSSM] = useState([<SingleSSM key="add-ssm-0" index={0} />]);

  const appendNewSSM = () => {
    if (SSMs.length < 5) {
      addSSM((previousState) => [
        ...previousState,
        <SingleSSM key={`add-ssm-${SSMs.length}`} index={SSMs.length} />,
      ]);
    }
  };

  return (
    <CUI.Stack spacing={6} mb={6} key="add-ssm-stack-intro">
      <CUI.Text>
        In addition to the CMS recommended core and utilization measures,
        identify and define the{" "}
        <em>
          <strong>measures</strong>
        </em>{" "}
        the State will use to assess its Health Home model of service delivery.
      </CUI.Text>
      <CUI.Text>
        You may associate up to five core measures with this core set.
      </CUI.Text>
      {SSMs}
      <QMR.ContainedButton
        buttonText={"+ Add Another"}
        buttonProps={{
          variant: "outline",
          colorScheme: "blue",
          color: "blue.500",
          mt: "4",
        }}
        key={"AddAnotherButton"}
        onClick={appendNewSSM}
        disabledStatus={SSMs.length >= 5}
        // testId={testid}
      />
    </CUI.Stack>
  );
};
