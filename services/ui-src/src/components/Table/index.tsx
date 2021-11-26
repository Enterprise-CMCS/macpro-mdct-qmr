import * as CUI from "@chakra-ui/react";
import { TableProps, TableData } from "./types";

export const Table = <T extends TableData>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <CUI.Table my="8" fontSize="sm">
      <CUI.Thead>
        <CUI.Tr>
          {columns.map((column) => (
            <CUI.Th
              textTransform="none"
              whiteSpace="nowrap"
              scope="col"
              key={column.id}
              {...column.styleProps}
            >
              {column.header}
            </CUI.Th>
          ))}
        </CUI.Tr>
      </CUI.Thead>
      <CUI.Tbody>
        {data.map((row) => (
          <CUI.Tr key={row.id}>
            {columns.map((column) => {
              const element = column.cell(row);
              return (
                <CUI.Td key={column.id} maxW="2xs" {...column.styleProps}>
                  {element}
                </CUI.Td>
              );
            })}
          </CUI.Tr>
        ))}
      </CUI.Tbody>
    </CUI.Table>
  );
};

export * from "./coreSets";
export * from "./measures";
export * from "./_coreSetData";
export * from "./_measureData";
