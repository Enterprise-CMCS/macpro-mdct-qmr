import * as CUI from "@chakra-ui/react";
import { useState } from "react";
import { MonthPicker } from 'components/MonthPicker'

interface Props {
}

export const DateRange = ({}: Props) => {
  return (
    <CUI.Text />
    <MonthPicker />
    <MonthPicker />
  );
};
