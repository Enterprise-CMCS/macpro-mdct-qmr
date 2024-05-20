import * as CUI from "@chakra-ui/react";
import { Text, Show, Hide } from "@chakra-ui/react";
import { TableProps, TableData } from "./types";

const emptyTableText = "Add a core set by selecting ‘Add Core Set’ below.";

export const VerticalTable = <T extends TableData>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <>
      <CUI.VStack my="8" align="stretch">
        {data?.map((row) => {
          return (
            <CUI.Stack key={row.id} align="flex-start" spacing="4">
              <CUI.Divider borderColor="gray.500"></CUI.Divider>
              {columns.map((column) => {
                const element = column.cell(row);
                return (
                  <CUI.Box>
                    <CUI.Text
                      key={column.id}
                      data-cy={column.header}
                      color="gray.500"
                      fontWeight="bold"
                      fontSize="small"
                    >
                      {column.header}
                    </CUI.Text>
                    <CUI.Text
                      data-cy={`${column.header}-${row.id}`}
                      key={column.id + "_td"}
                    >
                      {element}
                    </CUI.Text>
                  </CUI.Box>
                );
              })}
            </CUI.Stack>
          );
        })}

        {data?.length === 0 && (
          <Text sx={sx.emptyTableText}>{emptyTableText}</Text>
        )}
        <CUI.Divider borderColor="gray.500"></CUI.Divider>
      </CUI.VStack>
    </>
  );
};
export const HorizontalTable = <T extends TableData>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <>
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
      {data?.length === 0 && (
        <Text sx={sx.emptyTableText}>{emptyTableText}</Text>
      )}
    </>
  );
};

// Generic Table comp with minimal styling for CoreSet and Measure lists
export const Table = <T extends TableData>({
  columns,
  data,
}: TableProps<T>) => {
  return (
    <>
      <Hide below="md">{HorizontalTable({ columns, data })}</Hide>
      <Show below="md">{VerticalTable({ columns, data })}</Show>
    </>
  );
};

const sx = {
  emptyTableText: {
    paddingBottom: "2rem",
    marginBottom: "2rem",
    textAlign: "center",
    borderBottom: "1px",
    borderColor: "gray.100",
  },
};

export * from "./columns";
export * from "./_coreSetData";
export * from "./_measureData";
