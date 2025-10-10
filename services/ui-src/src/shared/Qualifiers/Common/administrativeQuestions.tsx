import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Common from ".";
import * as Types from "./../../types/TypeQualifierForm";
import {
  allPositiveIntegersWith10Digits,
  allPositiveIntegersWith3Digits,
  isLegacyLabel,
} from "utils";
import { useFormContext } from "react-hook-form";

export const AdministrativeQuestions = () => {
  const padding = "10px";

  const { setValue, watch } = useFormContext<Types.HHCSQualifierForm>();
  const data = watch();

  //function to only invoke when the value has changed for number of adult or number of children
  //only want the function to run when the value of numberOfAdults or numberOfChildren change
  //the numberOfIndividuals needs to allow overwrite from states; is NOT always the sum of children + adult
  const sumOnChange = (v: any) => {
    //auto sum was introduced in 2023
    if (isLegacyLabel()) return v;

    if (data.AdministrativeData) {
      let name: string = v.target.name;
      let numOfAdults = name.includes("numberOfAdults")
        ? v.target.value
        : data.AdministrativeData.numberOfAdults;
      let numOfChildren = name.includes("numberOfChildren")
        ? v.target.value
        : data.AdministrativeData.numberOfChildren;

      let sum = parseInt(numOfAdults) + parseInt(numOfChildren);
      data.AdministrativeData.numberOfIndividuals = sum ? sum.toString() : "";

      setValue("AdministrativeData", data.AdministrativeData);
    }
  };

  return (
    <CUI.ListItem m="4">
      <Common.QualifierHeader
        header="Administrative Questions"
        description=""
      />
      <QMR.NumberInput
        key={"AdministrativeData.numberOfAdults"}
        name={"AdministrativeData.numberOfAdults"}
        mask={allPositiveIntegersWith10Digits}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        onChange={sumOnChange}
        label={
          <>
            What is the total annual number of{" "}
            <b>
              <i>adults</i>
            </b>{" "}
            in the Health Home Program?
          </>
        }
      />
      <QMR.NumberInput
        key={"AdministrativeData.minAgeOfAdults"}
        name={"AdministrativeData.minAgeOfAdults"}
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
        key={"AdministrativeData.numberOfChildren"}
        name={"AdministrativeData.numberOfChildren"}
        onChange={sumOnChange}
        mask={allPositiveIntegersWith10Digits}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={
          <>
            What is the total annual number of{" "}
            <b>
              <i>children</i>
            </b>{" "}
            in the Health Home Program?
          </>
        }
      />
      <QMR.NumberInput
        key={"AdministrativeData.maxAgeChildren"}
        name={"AdministrativeData.maxAgeChildren"}
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
        key={"AdministrativeData.numberOfIndividuals"}
        name={"AdministrativeData.numberOfIndividuals"}
        mask={allPositiveIntegersWith10Digits}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={
          <>
            What is the total annual number of{" "}
            <b>
              <i>individuals</i>
            </b>{" "}
            in the Health Home Program?
          </>
        }
      />
      <QMR.NumberInput
        key={"AdministrativeData.numberOfProviders"}
        name={"AdministrativeData.numberOfProviders"}
        mask={allPositiveIntegersWith10Digits}
        formLabelProps={{ fontWeight: "400", padding: padding }}
        label={
          <>
            What is the number of{" "}
            <b>
              <i>providers</i>
            </b>{" "}
            operating under the Health Home Program?
          </>
        }
      />
    </CUI.ListItem>
  );
};
