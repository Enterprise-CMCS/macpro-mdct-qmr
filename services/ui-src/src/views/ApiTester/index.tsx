import { createCoreSet, getAllCoreSets, getCoreSet } from "libs/api";
export const ApiTester = () => {
  const getButton = async () => {
    const data = await getAllCoreSets({ state: "MO", year: "2021" });
    const otherData = await getCoreSet({
      state: "MO",
      year: "2021",
      id: "AAC-123",
    });
    const otherOtherData = await createCoreSet({
      state: "MO",
      year: "2021",
      id: "AAC-123",
      body: {
        test: "data",
      },
    });
    console.log("getCoreSets: ", data);
    console.log("getSpecificCoreSet: ", otherData);
    console.log("createCoreSet", otherOtherData);
  };
  getButton().then(() => {
    console.log("hello world");
  });
  return <>hello</>;
};
