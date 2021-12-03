import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { stateAbbreviations } from "./constants";
import { currentReportingYear } from "config";
import * as CUI from "@chakra-ui/react";
import * as QMR from "components";
import * as Libs from "libs";

const LoginWithCognito = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const isValid = () => email.length > 0 && password.length > 0;
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isValid) return;
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      history.push("/");
    } catch (e) {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CUI.Stack mb={4}>
        <CUI.Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CUI.Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CUI.Button type="submit" colorScheme="blue" disabled={isLoading}>
          Login With Cognito
        </CUI.Button>
      </CUI.Stack>
    </form>
  );
};

const LoginWithStateUser = () => {
  const [locality, setLocality] = useState("");
  const history = useHistory();
  function localLogin(role: string) {
    const alice = {
      username: "alice",
      attributes: {
        given_name: "Alice",
        family_name: "Foo",
        email: "alice@example.com",
        "custom:cms_roles": role,
        state: locality,
      },
    };
    Libs.loginLocalUser(alice);

    history.push(`/${locality}/${currentReportingYear}`);
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
        onClick={() => localLogin(Libs.roles.stateUser)}
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
    <CUI.Container maxW="sm" mt="4">
      <CUI.Stack spacing={8}>
        <CUI.Button colorScheme="teal" onClick={loginWithIDM} isFullWidth>
          Login with IDM
        </CUI.Button>
        <LoginWithCognito />
        <LoginWithStateUser />
      </CUI.Stack>
    </CUI.Container>
  );
};
