import { Measure } from "../types";

export const AMM = ({ name, year }: Measure.Props) => {
  return (
    <>
      <p>{name}</p>
      <p>{year}</p>
    </>
  );
};
