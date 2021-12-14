import { Container, HStack } from "@chakra-ui/layout";
import { ContainedButton } from "components/ContainedButton";
import {
  createCoreSet,
  editCoreSet,
  getAllCoreSets,
  getCoreSet,
  deleteCoreSet,
  listMeasures,
  getMeasure,
  createMeasure,
  editMeasure,
  deleteMeasure,
} from "libs/api";

export const ApiTester = () => {
  return (
    <Container>
      <HStack p={5}>
        <ContainedButton
          buttonText={"Create Core Set"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await createCoreSet({
                state: "FS",
                year: "2021",
                coreSet: "AAC-123",
                body: {
                  test: "data",
                  test2: "moreData",
                },
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Edit Core Set"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await editCoreSet({
                state: "FS",
                year: "2021",
                coreSet: "AAC-123",
                body: {
                  status: "complete",
                },
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Get All Core Sets"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await getAllCoreSets({
                state: "FS",
                year: "2021",
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Get Specific Core Set"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await getCoreSet({
                state: "FS",
                year: "2021",
                coreSet: "AAC-123",
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Delete Core Set"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await deleteCoreSet({
                state: "FS",
                year: "2021",
                coreSet: "AAC-123",
              })
            )
          }
        />
      </HStack>
      <HStack p={5}>
        <ContainedButton
          buttonText={"Create Measure"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await createMeasure({
                state: "FS",
                year: "2021",
                coreSet: "AAC-123",
                measure: "AIF-HH",
                body: {
                  test: "data",
                },
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Edit Measure"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await editMeasure({
                state: "FS",
                year: "2021",
                coreSet: "AAC-123",
                measure: "AIF-HH",
                body: {
                  data: {
                    test: "data",
                  },
                  status: "incomplete",
                },
              })
            )
          }
        />
        <ContainedButton
          buttonText={"List all measures"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await listMeasures({
                state: "FS",
                year: "2021",
                coreSet: "AAC-123",
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Get Measure"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await getMeasure({
                state: "FS",
                year: "2021",
                coreSet: "AAC-123",
                measure: "AIF-HH",
              })
            )
          }
        />
        <ContainedButton
          buttonText={"Delete Measure"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await deleteMeasure({
                state: "FS",
                year: "2021",
                coreSet: "AAC-123",
                measure: "AIF-HH",
              })
            )
          }
        />
      </HStack>
    </Container>
  );
};
