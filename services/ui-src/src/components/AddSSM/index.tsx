import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { BsTrash } from "react-icons/bs";
import { useFieldArray } from "react-hook-form";

interface AddSSMProps {
  userCreatedCount?: number;
}

// Add State Specific Measure component
export const AddSSM = ({ userCreatedCount = 0 }: AddSSMProps) => {
  const maxNumberOfSSMs = 5;

  // useFieldArray() manages the dynamic form below
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
      <CUI.Divider />
      <CUI.VStack spacing={6} divider={<CUI.StackDivider />}>
        {fields.map((field: any, idx: number) => (
          <CUI.HStack
            alignItems="justify-start"
            justifyItems={"space-between"}
            key={field.id}
            spacing={6}
            w="100%"
          >
            <CUI.VStack w="100%" alignItems="start">
              <QMR.TextInput
                label="Name the measure"
                name={`add-ssm.${idx}.description`}
                rules={{ required: true }}
              ></QMR.TextInput>
              <QMR.TextArea
                label="Please provide a description of the measure"
                name={`add-ssm.${idx}.detailedDescription`}
                rules={{ required: true }}
              ></QMR.TextArea>
            </CUI.VStack>
            <CUI.IconButton
              aria-label="Delete State Specific Measure"
              colorScheme="red"
              icon={<BsTrash />}
              onClick={() => remove(idx)}
              variant="outline"
            />
          </CUI.HStack>
        ))}
      </CUI.VStack>
      <CUI.Stack spacing={6} direction="row">
        <QMR.ContainedButton
          buttonText={"+ Add Another"}
          variant="outline-primary"
          key={"AddAnotherSSMButton"}
          onClick={() =>
            append({
              description: "",
              detailedDescription: "",
            })
          }
          disabledStatus={fields.length + userCreatedCount >= maxNumberOfSSMs}
          testId={"AddAnotherSSMButton"}
        />
      </CUI.Stack>
    </CUI.Stack>
  );
};
