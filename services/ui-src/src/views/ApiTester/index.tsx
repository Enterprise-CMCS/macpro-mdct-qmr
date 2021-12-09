import { getAllCoreSets, getCoreSet } from "libs/api";
export const ApiTester = () => {
  const getButton = async () => {
    const data = await getAllCoreSets({ state: "MO", year: "2021" });
    const otherData = await getCoreSet({
      state: "MO",
      year: "2021",
      id: "AAC-123",
    });
    console.log("getCoreSets: ", data);
    console.log("getSpecificCoreSet: ", otherData);
  };
  getButton().then(() => {
    console.log("hello world");
  });
  return <>hello</>;
};
