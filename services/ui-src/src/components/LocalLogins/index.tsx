import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { stateAbbreviations } from "utils/constants";
import config from "config";
import * as CUI from "@chakra-ui/react";
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
      <CUI.Select
        value={locality}
        onChange={(e) => setLocality(e.target.value)}
      >
        {stateAbbreviations.map((v: string) => {
          return (
            <option value={v} key={v}>
              {v}
            </option>
          );
        })}
      </CUI.Select>
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
  const showIDMLogin = config.LOCAL_LOGIN === "true";
  return (
    <CUI.Container maxW="sm" h="full" my="auto">
      <CUI.Box textAlign="center" mb="6">
        <CUI.Heading mb="2">Local Login </CUI.Heading>
        <CUI.Divider />
      </CUI.Box>
      <CUI.Stack spacing={8}>
        {showIDMLogin && (
          <CUI.Button colorScheme="teal" onClick={loginWithIDM} isFullWidth>
            Login with IDM
          </CUI.Button>
        )}
        <LoginWithStateUser />
      </CUI.Stack>
    </CUI.Container>
  );
};
