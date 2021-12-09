import { getAmendment } from "libs/api";
export const ApiTester = () => {
  const getButton = async () => {
    const data = await getAmendment("11");
    console.log(data);
  };
  getButton();
  return <>hello</>;
};
