import {
  createCoreSet,
  getAllCoreSets,
  getCoreSet,
  deleteCoreSet,
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
      id: "AAC-123",
    });
    const createCoreSetData = await createCoreSet({
      state: "MO",
      year: "2021",
      id: "AAC-123",
      body: {
        test: "data",
      },
    });
    const editCoreSetData = await createCoreSet({
      state: "MO",
      year: "2021",
      id: "AAC-123",
      body: {
        test: "data",
      },
    });
    const deleteCoreSetData = await deleteCoreSet({
      state: "MO",
      year: "2021",
      id: "AAC-123",
    });
    console.log("getCoreSets Response: ", getAllCoreSetData);
    console.log("getSpecificCoreSet Response: ", getCoreSetData);
    console.log("createCoreSet Response: ", createCoreSetData);
    console.log("editCoreSet Response: ", editCoreSetData);
    console.log("deleteCoreSet Response: ", deleteCoreSetData);
  };
  getButton().then(() => {
    console.log("hello world");
  });
  return <>hello</>;
};
