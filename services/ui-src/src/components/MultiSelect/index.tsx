import * as CUI from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useController, useFormContext } from "react-hook-form";

export interface ICheckbox {
  value: string;
  label: string;
  isVisible: boolean;
}
interface Props {
  multiSelectList: ICheckbox[];
  name: string;
}

export const MultiSelect = ({ multiSelectList, name }: Props) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });

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
      w="100%"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      p="5"
      mb="5"
    >
      <CUI.VStack alignItems="flex-start" spacing="15px">
        <CUI.InputGroup size="md">
          <CUI.Input
            value={filterText}
            pr="4.5rem"
            placeholder="Search by Measure..."
            onChange={handleFilterChange}
          />
          <CUI.InputRightElement width="4.5rem">
            <BsSearch fontSize="24px" color="#3182CE" />
          </CUI.InputRightElement>
        </CUI.InputGroup>
        {checkboxGroupVisibile ? (
          <>
            <CUI.Checkbox
              size="lg"
              isChecked={field.value?.length === multiSelects.length}
              onChange={checkAll}
              name="selectAll"
              value="selectAll"
            >
              <CUI.Text fontWeight="normal" fontSize="normal">
                Select All
              </CUI.Text>
            </CUI.Checkbox>
            <CUI.CheckboxGroup value={field.value} onChange={field.onChange}>
              {multiSelects.map((item: ICheckbox) => (
                <CUI.Box display={item.isVisible ? "block" : "none"}>
                  <CUI.Checkbox
                    size="lg"
                    value={item.value}
                    onChange={(e) => handleChange(e)}
                  >
                    <CUI.Text fontWeight="normal" fontSize="normal">
                      {item.label}
                    </CUI.Text>
                  </CUI.Checkbox>
                </CUI.Box>
              ))}
            </CUI.CheckboxGroup>
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
