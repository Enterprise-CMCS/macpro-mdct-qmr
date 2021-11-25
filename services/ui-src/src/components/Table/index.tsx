import * as CUI from "@chakra-ui/react";
import { columns, data } from "./_data";

export const Table = () => {
  return (
    <CUI.Table my="8" fontSize="sm">
      <CUI.Thead>
        <CUI.Tr>
          {columns.map((column, idx) => (
            <CUI.Th
              textTransform="none"
              whiteSpace="nowrap"
              scope="col"
              key={column.id}
              textAlign={columns.length === idx + 1 ? "center" : "inherit"}
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
                <CUI.Td key={column.id} maxW="2xs">
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
