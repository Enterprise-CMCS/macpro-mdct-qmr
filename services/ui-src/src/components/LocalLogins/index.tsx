import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { stateAbbreviations } from "./constants";
import config from "config";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Libs from "libs";
import { mockUsers } from "./mockUsers";

const LoginWithStateUser = () => {
  const [locality, setLocality] = useState("AL");
  const navigate = useNavigate();
  function localLogin(role: Libs.Roles) {
    Libs.loginLocalUser({
      ...mockUsers[role],
      attributes: {
        state: locality,
      },
    });

    navigate(`/${locality}/${config.currentReportingYear}`);
  }

  return (
    <CUI.Stack>
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
        onClick={() => localLogin(Libs.Roles.stateUser)}
        isFullWidth
      >
        Login as State User
      </CUI.Button>
    </CUI.Stack>
  );
};

interface Props {
  loginWithIDM: () => void;
}

export const LocalLogins = ({ loginWithIDM }: Props) => {
  return (
    <CUI.Container maxW="sm" h="full" my="auto">
      <CUI.Box textAlign="center" mb="6">
        <CUI.Heading mb="2">Local Login </CUI.Heading>
        <CUI.Divider />
      </CUI.Box>
      <CUI.Stack spacing={8}>
        <CUI.Button colorScheme="teal" onClick={loginWithIDM} isFullWidth>
          Login with IDM
        </CUI.Button>
        <LoginWithStateUser />
      </CUI.Stack>
    </CUI.Container>
  );
};
