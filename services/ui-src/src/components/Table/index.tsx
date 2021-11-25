import * as CUI from "@chakra-ui/react";
import { ReactElement } from "react";
import { CoreSet } from "./types";

interface Column {
  id: string;
  stypeProps?: Record<string, string>;
  cell: (data: CoreSet.Data) => ReactElement;
}

interface Data {
  id: string;
}

export interface Props {
  columns: Column[];
  data: Data[];
}

export const Table = ({ columns, data }: Props) => {
  return (
    <CUI.Table my="8" fontSize="sm">
      <CUI.Thead>
        <CUI.Tr>
          {columns.map((column: any) => (
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
        {data.map((row: any) => (
          <CUI.Tr key={row.id}>
            {columns.map((column: any) => {
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
