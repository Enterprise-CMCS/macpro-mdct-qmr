import * as CUI from "@chakra-ui/react";
import * as QMR from "components";

import { HiX } from "react-icons/hi";
import { useFieldArray } from "react-hook-form";

import { useGetMeasures } from "hooks/api";
import { ICheckbox } from "components/MultiSelect";
import { QualifierHeader } from "./qualifierHeader";
import { measureDescriptions } from "measures/measureDescriptions";

export const initialAuditValues = {
  MeasuresAuditedOrValidated: [],
  WhoConductedAuditOrValidation: "",
};

export const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <CUI.IconButton
    fontSize="1.5em"
    variant="ghost"
    icon={<HiX />}
    aria-label="Remove Audit Item"
    onClick={onClick}
    className="disabled-print-preview-items hidden-print-items"
  />
);

interface Props {
  type: "CH" | "AD" | "HH";
  year: string;
}

export const Audit = ({ type, year }: Props) => {
  const { fields, append, remove, replace } = useFieldArray({
    name: "CoreSetMeasuresAuditedOrValidatedDetails",
  });
  const { data, isLoading } = useGetMeasures();

  const multiSelectList: ICheckbox[] =
    data?.Items
      // filter out the autocompleted measures.
      ?.filter((item: any) => {
        return !item.autoCompleted;
      })
      // filter out the qualifier measures
      ?.filter((item: any) => {
        return !item?.measure?.includes("CSQ");
      })
      // filter out HH user-created state specific measures
      ?.filter((item: any) => {
        return !item?.userCreated;
      })
      // filter out placeholder HH user-created state specific measures
      ?.filter((item: any) => {
        return !item?.placeholder;
      })
      ?.map((obj: any) => {
        const desc = measureDescriptions?.[year]?.[obj.measure];
        return {
          label: `${obj.measure}${desc ? ` - ${desc}` : ""}`,
          value: obj.measure,
          isVisible: true,
        };
      }) ?? [];

  if (isLoading || !data.Items) {
    return <QMR.LoadingWave />;
  }

  return (
    <CUI.ListItem m="4">
      <QualifierHeader
        header="Audit or Validation of Measures"
        description={
          "Were any of the Core Set measures audited or validated" +
          (type === "HH" ? " (optional)?" : "?")
        }
      />
      <CUI.Spacer />
      <CUI.Stack>
        <CUI.Box pt="4">
          <QMR.RadioButton
            formLabelProps={{ fontWeight: "600" }}
            name="CoreSetMeasuresAuditedOrValidated"
            options={[
              {
                displayValue:
                  "Yes, some of the Core Set measures have been audited or validated",
                value:
                  "Yes, some of the Core Set measures have been audited or validated",
                children: [
                  <CUI.Stack mb="5" spacing="6" key={"AuditSelectorStack"}>
                    {fields?.map((field, index: number) => {
                      return (
                        <CUI.Box
                          borderWidth="1px"
                          borderColor="gray.200"
                          borderRadius="md"
                          key={field.id}
                          className="prince-gray-border"
                        >
                          <CUI.Flex className="prince-audit-padding">
                            <QMR.TextInput
                              rules={{ required: true }}
                              formLabelProps={{ fontWeight: "400" }}
                              label="Who conducted the audit or validation?"
                              name={`CoreSetMeasuresAuditedOrValidatedDetails.${index}.WhoConductedAuditOrValidation`}
                              formControlProps={{
                                p: "5",
                                pb: "0",
                              }}
                            />
                            <CUI.Spacer />
                            {index !== 0 && (
                              <CloseButton onClick={() => remove(index)} />
                            )}
                          </CUI.Flex>
                          <CUI.Box p="5">
                            <CUI.Text
                              mb="4"
                              data-cy={`which-measures-did-they-audit-${index}`}
                            >
                              Which measures did they audit or validate?
                            </CUI.Text>

                            <QMR.MultiSelect
                              isRequired
                              multiSelectList={multiSelectList}
                              name={`CoreSetMeasuresAuditedOrValidatedDetails.${index}.MeasuresAuditedOrValidated`}
                            />
                          </CUI.Box>
                        </CUI.Box>
                      );
                    })}
                  </CUI.Stack>,
                  <QMR.ContainedButton
                    buttonText={"+ Add Another"}
                    variant="outline-primary"
                    onClick={() => append(initialAuditValues)}
                    key={"AddAnotherAuditSelectorButton"}
                  />,
                ],
                onClick: () => {
                  if (fields.length === 0) {
                    replace(initialAuditValues);
                  }
                },
              },
              {
                displayValue:
                  "No, none of the Core Set measures have been audited or validated",
                value:
                  "No, none of the Core Set measures have been audited or validated",
                onClick: () => {
                  remove();
                },
              },
            ]}
          />
        </CUI.Box>
      </CUI.Stack>
    </CUI.ListItem>
  );
};
