import { MeasureProps } from "../types";

export const AMM = ({ name, updateMeasure }: MeasureProps) => {
  return (
    <>
      <p>Hello there</p>
      <p>{name}</p>
      <p>congrats</p>
      <button onClick={updateMeasure}>Update measure</button>
    </>
  );
};
