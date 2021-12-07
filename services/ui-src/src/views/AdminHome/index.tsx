import { useState } from "react";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import { stateAbbreviations } from "utils/constants";
import { useNavigate } from "react-router";
import config from "config";

export const AdminHome = () => {
  const [locality, setLocality] = useState("AL");
  const navigate = useNavigate();
  return (
    <CUI.Container maxW="7xl" py="4">
      <CUI.Stack spacing="4" maxW="lg">
        <CUI.Heading size="md">Admin Home</CUI.Heading>
        <QMR.Select
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          options={stateAbbreviations.map((v: string) => ({
            displayValue: v,
            value: v,
          }))}
        />
        <CUI.Button
          colorScheme="blue"
          onClick={() =>
            navigate(`/${locality}/${config.currentReportingYear}`)
          }
          isFullWidth
        >
          Go To State Home
        </CUI.Button>
      </CUI.Stack>
    </CUI.Container>
  );
};
