import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { stateAbbreviations } from "utils/constants";
import config from "config";
import * as CUI from "@chakra-ui/react";
import * as Libs from "libs";
import { UserRoles } from "types";
import { createMockUser } from "./mockUsers";

const LocalLogin = () => {
  const [locality, setLocality] = useState("");
  const navigate = useNavigate();
  function localLogin(role: UserRoles) {
    const localUser = createMockUser({ role, state: locality });
    Libs.loginLocalUser(localUser);
    switch (role) {
      case UserRoles.STATE:
        return navigate(`/${locality}/${config.currentReportingYear}`);
      case UserRoles.ADMIN:
        return navigate(`/admin`);
    }
  }

  return (
    <CUI.Stack>
      <CUI.Divider />
      <CUI.Heading mb="2" size="md" alignSelf="center">
        Login with Cognito
      </CUI.Heading>
      <CUI.Heading mb="2" size="sm">
        Email
      </CUI.Heading>
      <CUI.Input />
      <CUI.Heading mb="2" size="sm">
        Password
      </CUI.Heading>
      <CUI.Input />
      <CUI.Button
        colorScheme="teal"
        onClick={() => console.log("hey sam")}
        isFullWidth
      >
        Login with Cognito
      </CUI.Button>
      <CUI.Divider paddingBottom="5" />
      <CUI.Select
        value={locality}
        onChange={(e) => setLocality(e.target.value)}
      >
        <option value={""} key="placeholder">
          -- select --
        </option>
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
        isDisabled={!locality}
        onClick={() => localLogin(UserRoles.STATE)}
        isFullWidth
      >
        Login as State User
      </CUI.Button>
      <CUI.Divider />
      <CUI.Button
        colorScheme="blue"
        onClick={() => localLogin(UserRoles.ADMIN)}
        isFullWidth
      >
        Login as Admin User
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
        <CUI.Heading mb="2">Developer Login </CUI.Heading>
        <CUI.Divider />
      </CUI.Box>
      <CUI.Stack spacing={8}>
        {showIDMLogin && (
          <CUI.Button colorScheme="teal" onClick={loginWithIDM} isFullWidth>
            Login with IDM
          </CUI.Button>
        )}
        <LocalLogin />
      </CUI.Stack>
    </CUI.Container>
  );
};
