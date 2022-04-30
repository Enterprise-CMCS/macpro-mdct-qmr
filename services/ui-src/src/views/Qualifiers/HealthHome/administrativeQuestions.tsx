import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Common from "../Common";
import { useCustomRegister } from "hooks/useCustomRegister";
import * as Types from "./types";

export const AdministrativeQuestions = () => {
  const register = useCustomRegister<Types.AdministrativeQuestions>();
  return (
    <CUI.ListItem mr="4">
      <Common.QualifierHeader
        header="Administrative Questions"
        description=""
      />
      <QMR.NumberInput
        {...register("numberOfAdults")}
        formLabelProps={{ fontWeight: "400" }}
        label="What is the total annual number of adults in the Health Home program?"
      />
      <QMR.NumberInput
        {...register("minAgeOfAdults")}
        formLabelProps={{ fontWeight: "400" }}
        label="The minimum age of an adult in the program is:"
      />
      <QMR.NumberInput
        {...register("numberOfChildren")}
        formLabelProps={{ fontWeight: "400" }}
        label="What is the total annual number of children in the Health Home program?"
      />
      <QMR.NumberInput
        {...register("maxAgeChildren")}
        formLabelProps={{ fontWeight: "400" }}
        label="The maximum age of a child in the program is:"
      />
      <QMR.NumberInput
        {...register("numberOfIndividuals")}
        formLabelProps={{ fontWeight: "400" }}
        label="What is the total annual number of individuals in the Health Home program?"
      />
      <QMR.NumberInput
        {...register("numberOfProviders")}
        formLabelProps={{ fontWeight: "400" }}
        label="What is the number of providers operating under the Health Home program?"
      />
    </CUI.ListItem>
  );
};
