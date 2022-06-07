import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Common from "../Common";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "../types";
import {
  allPositiveIntegersWith10Digits,
  allPositiveIntegersWith3Digits,
} from "utils/numberInputMasks";

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
        {...register("numberOfAdults")}
        mask={allPositiveIntegersWith10Digits}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={
          <>
            What is the total annual number of{" "}
            <b>
              <i>adults</i>
            </b>{" "}
            in the Health Home program?
          </>
        }
      />
      <QMR.NumberInput
        {...register("minAgeOfAdults")}
        mask={allPositiveIntegersWith3Digits}
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
        mask={allPositiveIntegersWith10Digits}
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
        mask={allPositiveIntegersWith3Digits}
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
        mask={allPositiveIntegersWith10Digits}
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
        mask={allPositiveIntegersWith10Digits}
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
