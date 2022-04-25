import * as CUI from "@chakra-ui/react";
import { TableProps, TableData } from "./types";

// Generic Table comp with minimal styling for CoreSet and Measure lists
export const Table = <T extends TableData>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <CUI.Table my="8" fontSize="sm">
      <CUI.Thead>
        <CUI.Tr>
          {columns?.map((column) => (
            <CUI.Th
              textTransform="none"
              whiteSpace="nowrap"
              scope="col"
              key={column.id}
              letterSpacing="sm"
              data-cy={column.header}
              {...column.styleProps}
            >
              {column.header}
            </CUI.Th>
          ))}
        </CUI.Tr>
      </CUI.Thead>
      <CUI.Tbody data-cy={"tableBody"}>
        {data?.map((row) => (
          <CUI.Tr key={row.id + "_tr"}>
            {columns.map((column) => {
              const element = column.cell(row);
              return (
                <CUI.Td
                  data-cy={`${column.header}-${row.id}`}
                  key={column.id + "_td"}
                  maxW="2xs"
                  {...column.styleProps}
                >
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

export * from "./columns";
export * from "./_coreSetData";
export * from "./_measureData";
