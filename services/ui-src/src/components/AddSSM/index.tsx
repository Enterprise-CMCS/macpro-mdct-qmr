import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

// Add State-Specific Measure component
export const AddSSM = () => {
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
      <QMR.TextInput
        label="Name the measure"
        name="measure-name"
      ></QMR.TextInput>
      <QMR.TextArea
        label="Please provide a description of the measure"
        name="measure-description"
      ></QMR.TextArea>
      <QMR.ContainedButton
        buttonText={"+ Add Another"}
        buttonProps={{
          variant: "outline",
          colorScheme: "blue",
          color: "blue.500",
          mt: "4",
        }}
        key={"AddAnotherButton"}
        // onClick={onClick}
        // disabledStatus={isDisabled}
        // testId={testid}
      />
    </CUI.Stack>
  );
};
