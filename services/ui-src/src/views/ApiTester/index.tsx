import { Container, HStack } from "@chakra-ui/layout";
import { ContainedButton } from "components/ContainedButton";
import {
  createCoreSet,
  editCoreSet,
  getAllCoreSets,
  getCoreSet,
  deleteCoreSet,
  listMeasures,
  listMeasuresMetadata,
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
                state: "MO",
                year: "2021",
                coreSetId: "AAC-123",
                body: {
                  test: "data",
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
                state: "MO",
                year: "2021",
                coreSetId: "AAC-123",
                body: {
                  test: "data",
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
                state: "MO",
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
                state: "MO",
                year: "2021",
                coreSetId: "AAC-123",
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
                state: "MO",
                year: "2021",
                coreSetId: "AAC-123",
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
                state: "MO",
                year: "2021",
                coreSetId: "AAC-123",
                measureId: "AIF-HH",
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
                state: "MO",
                year: "2021",
                coreSetId: "AAC-123",
                measureId: "AIF-HH",
                body: {
                  test: "data",
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
                state: "MO",
                year: "2021",
                coreSetId: "AAC-123",
              })
            )
          }
        />
        <ContainedButton
          buttonText={"List all measures' metadata"}
          buttonProps={{
            colorScheme: "blue",
            textTransform: "capitalize",
          }}
          onClick={async () =>
            console.log(
              await listMeasuresMetadata({
                state: "MO",
                year: "2021",
                coreSetId: "AAC-123",
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
                state: "MO",
                year: "2021",
                coreSetId: "AAC-123",
                measureId: "AIF-HH",
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
                state: "MO",
                year: "2021",
                coreSetId: "AAC-123",
                measureId: "AIF-HH",
              })
            )
          }
        />
      </HStack>
    </Container>
  );
};
