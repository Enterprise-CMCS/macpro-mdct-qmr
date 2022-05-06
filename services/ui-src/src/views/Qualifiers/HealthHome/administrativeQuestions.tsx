import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Common from "../Common";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "./types";
import { allPositiveIntegers } from "utils/numberInputMasks";

export const AdministrativeQuestions = () => {
  const register = useCustomRegister<Types.AdministrativeQuestions>();
  const padding = "10px";
  return (
    <CUI.ListItem mr="4">
      <Common.QualifierHeader
        header="Administrative Questions"
        description=""
      />
      <QMR.NumberInput
        {...register("minAgeOfAdults")}
        mask={allPositiveIntegers}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={
          <>
            The minimum age of an{" "}
            <b>
              <i>adult</i>
            </b>{" "}
            in the program is:
          </>
        }
      />
      <QMR.NumberInput
        {...register("numberOfChildren")}
        mask={allPositiveIntegers}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={
          <>
            What is the total annual number of{" "}
            <b>
              <i>children</i>
            </b>{" "}
            in the Health Home program?
          </>
        }
      />
      <QMR.NumberInput
        {...register("maxAgeChildren")}
        mask={allPositiveIntegers}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={
          <>
            The maximum age of a{" "}
            <b>
              <i>child</i>
            </b>{" "}
            in the program is:
          </>
        }
      />
      <QMR.NumberInput
        {...register("numberOfIndividuals")}
        mask={allPositiveIntegers}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={
          <>
            What is the total annual number of{" "}
            <b>
              <i>individuals</i>
            </b>{" "}
            in the Health Home program?
          </>
        }
      />
      <QMR.NumberInput
        {...register("numberOfProviders")}
        mask={allPositiveIntegers}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={
          <>
            What is the number of{" "}
            <b>
              <i>providers</i>
            </b>{" "}
            operating under the Health Home program?
          </>
        }
      />
    </CUI.ListItem>
  );
};
