import { Measure } from "measures/types";

// This is where we will put the measures - the exported comp should be named as the measureId (without the trailing '-XX' )
// All the measures defined in this directory will have all the props from the MeasureWrapper passed into it
export const AMMAD = ({ name, year }: Measure.Props) => {
  return (
    <>
      <p>{name}</p>
      <p>{year}</p>
    </>
  );
};
