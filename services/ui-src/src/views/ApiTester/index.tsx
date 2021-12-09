import {
  createCoreSet,
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
  const getButton = async () => {
    const getAllCoreSetData = await getAllCoreSets({
      state: "MO",
      year: "2021",
    });
    const getCoreSetData = await getCoreSet({
      state: "MO",
      year: "2021",
      coreSetId: "AAC-123",
    });
    const createCoreSetData = await createCoreSet({
      state: "MO",
      year: "2021",
      coreSetId: "AAC-123",
      body: {
        test: "data",
      },
    });
    const editCoreSetData = await createCoreSet({
      state: "MO",
      year: "2021",
      coreSetId: "AAC-123",
      body: {
        test: "data",
      },
    });
    const deleteCoreSetData = await deleteCoreSet({
      state: "MO",
      year: "2021",
      coreSetId: "AAC-123",
    });

    const createMeasureData = await createMeasure({
      state: "MO",
      year: "2021",
      coreSetId: "AAC-123",
      measureId: "AIF-HH",
      body: {
        test: "data",
      },
    });

    const editMeasureData = await editMeasure({
      state: "MO",
      year: "2021",
      coreSetId: "AAC-123",
      measureId: "AIF-HH",
      body: {
        test: "data",
      },
    });

    const listMeasuresData = await listMeasures({
      state: "MO",
      year: "2021",
      coreSetId: "AAC-123",
    });

    const listMeasuresMetadataData = await listMeasuresMetadata({
      state: "MO",
      year: "2021",
      coreSetId: "AAC-123",
    });

    const getMeasureData = await getMeasure({
      state: "MO",
      year: "2021",
      coreSetId: "AAC-123",
      measureId: "AIF-HH",
    });

    const deleteMeasureData = await deleteMeasure({
      state: "MO",
      year: "2021",
      coreSetId: "AAC-123",
      measureId: "AIF-HH",
    });

    console.log("getCoreSets Response: ", getAllCoreSetData);
    console.log("getSpecificCoreSet Response: ", getCoreSetData);
    console.log("createCoreSet Response: ", createCoreSetData);
    console.log("editCoreSet Response: ", editCoreSetData);
    console.log("deleteCoreSet Response: ", deleteCoreSetData);
    console.log("listMeasures Response: ", listMeasuresData);
    console.log("listMeasuresMetadata Response: ", listMeasuresMetadataData);
    console.log("getMeasuresMetadata Response: ", getMeasureData);
    console.log("createMeasuresMetadata Response: ", createMeasureData);
    console.log("editMeasuresMetadata Response: ", editMeasureData);
    console.log("deleteMeasureData Response: ", deleteMeasureData);
  };
  getButton().then(() => {
    console.log("hello world");
  });
  return <>hello</>;
};
