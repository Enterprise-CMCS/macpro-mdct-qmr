import * as CUI from "@chakra-ui/react";
import { columns, data, Cell } from "./_data";

export const Table = () => {
  return (
    <CUI.Table my="8" fontSize="sm">
      <CUI.Thead>
        <CUI.Tr>
          {columns.map((column, index) => (
            <CUI.Th
              textTransform="none"
              whiteSpace="nowrap"
              scope="col"
              key={column.header || index}
              textAlign={columns.length === index + 1 ? "center" : "inherit"}
            >
              {column.header}
            </CUI.Th>
          ))}
        </CUI.Tr>
      </CUI.Thead>
      <CUI.Tbody>
        {data.map((row, index) => (
          <CUI.Tr key={index}>
            {columns.map((column, index) => {
              const data = row[column.accessor as keyof typeof row];
              const element = column.cell(data as Cell);
              return (
                <CUI.Td key={index} maxW="2xs">
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
