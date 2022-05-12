import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { useFieldArray } from "react-hook-form";

// Add State-Specific Measure component
export const AddSSM = () => {
  // useFieldArray() wrangles the dynamic form below
  const { fields, append, remove } = useFieldArray({
    name: "add-ssm",
    shouldUnregister: true,
  });

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

      {fields.map((field: any, idx: number) => (
        <CUI.Stack spacing={6} key={field.id}>
          <CUI.Divider />
          <QMR.TextInput
            label="Name the measure"
            name={`add-ssm.${idx}.name`}
          ></QMR.TextInput>
          <QMR.TextArea
            label="Please provide a description of the measure"
            name={`add-ssm.${idx}.description`}
          ></QMR.TextArea>
        </CUI.Stack>
      ))}
      <CUI.Stack spacing={6} direction="row">
        <QMR.ContainedButton
          buttonText={"+ Add Another"}
          buttonProps={{
            variant: "outline",
            colorScheme: "blue",
            color: "blue.500",
            mt: "4",
          }}
          key={"AddAnotherSSMButton"}
          onClick={() => append({})}
          disabledStatus={fields.length >= 5}
          testId={"AddAnotherSSMButton"}
        />
        <QMR.ContainedButton
          buttonText={"- Remove Last"}
          buttonProps={{
            variant: "outline",
            colorScheme: "red",
            color: "red.500",
            mt: "4",
          }}
          key={"RemoveLastSSMButton"}
          onClick={() => remove(fields.length - 1)}
          disabledStatus={fields.length === 0}
          testId={"RemoveLastSSMButton"}
        />
      </CUI.Stack>
    </CUI.Stack>
  );
};
