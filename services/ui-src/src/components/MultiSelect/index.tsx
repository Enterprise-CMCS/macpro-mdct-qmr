import * as CUI from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import objectPath from "object-path";
import { useController, useFormContext } from "react-hook-form";

export interface ICheckbox {
  value: string;
  label: string;
  isVisible: boolean;
}
interface Props {
  multiSelectList: ICheckbox[];
  name: string;
  isRequired?: boolean;
}

export const MultiSelect = ({ multiSelectList, name, isRequired }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { field } = useController({
    rules: {
      required: { message: "* At least one is required", value: !!isRequired },
    },
    name,
    control,
  });

  const path = objectPath.get(errors, name);
  const errorMessage =
    path?.message || (path?.type === "required" && `This is a required field`);

  const [multiSelects, setMultiSelects] = useState<ICheckbox[]>(() =>
    [...multiSelectList].sort((a, b) => (a.label > b.label ? 1 : -1))
  );
  const [checkboxGroupVisibile, setCheckboxGroupVisibility] = useState(true);
  const [filterText, setFilterText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentElementIndex = multiSelects.findIndex(
      (item) => item.value === e.target.value
    );
    const modifiedSelect = {
      ...multiSelects[currentElementIndex],
      isChecked: e.target.checked,
    };
    const tempList = [...multiSelects];
    tempList.splice(currentElementIndex, 1, modifiedSelect);
    setMultiSelects(tempList);
  };

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempItem = multiSelects.map((item) => ({
      ...item,
      isChecked: e.target.checked,
    }));
    field.onChange(
      tempItem.filter((item) => item.isChecked).map((item) => item.value)
    );
    setMultiSelects(tempItem);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    const filteredSelects = multiSelects.map((item) => {
      item.isVisible = item.label
        .toUpperCase()
        .includes(e.target.value.toUpperCase());
      return item;
    });
    setMultiSelects(filteredSelects);
    setCheckboxGroupVisibility(filteredSelects.some((item) => item.isVisible));
  };

  return (
    <CUI.Box
      borderWidth="1px"
      borderColor={errorMessage ? "red.500" : "gray.200"}
      borderRadius="md"
      p="5"
    >
      <CUI.VStack alignItems="flex-start" spacing="15px">
        <CUI.InputGroup size="md">
          <CUI.Input
            value={filterText}
            pr="4.5rem"
            placeholder="Search by Measure..."
            onChange={handleFilterChange}
            className="prince-full-width"
          />
          <CUI.InputRightElement color="blue.500">
            <BsSearch fontSize="18px" />
          </CUI.InputRightElement>
        </CUI.InputGroup>
        {checkboxGroupVisibile ? (
          <>
            <CUI.FormControl isInvalid={!!errorMessage}>
              <CUI.Checkbox
                size="lg"
                isChecked={field.value?.length === multiSelects.length}
                onChange={checkAll}
                name="selectAll"
                value="selectAll"
              >
                <CUI.Text
                  fontWeight="normal"
                  fontSize="normal"
                  className="prince-option-label-text"
                  aria-label="Which measures did they audit or validate? - Select All"
                >
                  Select All
                </CUI.Text>
              </CUI.Checkbox>
              <CUI.CheckboxGroup value={field.value} onChange={field.onChange}>
                {multiSelects.map((item: ICheckbox, index) => (
                  <CUI.Box
                    display={item.isVisible ? "block" : "none"}
                    key={item.label + item.value + index}
                    mt="15px"
                  >
                    <CUI.Checkbox
                      size="lg"
                      value={item.value}
                      onChange={(e) => handleChange(e)}
                    >
                      <CUI.Text
                        fontWeight="normal"
                        fontSize="normal"
                        className="prince-option-label-text"
                        aria-label={`Which measures did they audit or validate? - ${item.label}`}
                        data-cy={name + "-" + item.label}
                      >
                        {item.label}
                      </CUI.Text>
                    </CUI.Checkbox>
                  </CUI.Box>
                ))}
              </CUI.CheckboxGroup>
              <CUI.FormErrorMessage>{errorMessage}</CUI.FormErrorMessage>
            </CUI.FormControl>
          </>
        ) : (
          <CUI.Alert status="info">
            <CUI.AlertIcon />
            Sorry no Measures available
          </CUI.Alert>
        )}
      </CUI.VStack>
    </CUI.Box>
  );
};
