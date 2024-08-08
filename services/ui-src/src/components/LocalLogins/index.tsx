import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import * as CUI from "@chakra-ui/react";
import { useFormFields } from "../../libs/hooksLib";
import { Auth } from "aws-amplify";

const LocalLogin = () => {
  const navigate = useNavigate();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });
  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await Auth.signIn(fields.email, fields.password);
      navigate(`/`);
    } catch (error) {
      console.log("Error while logging in.", error);
    }
  }

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <CUI.Stack>
        <CUI.Divider />
        <CUI.Heading mb="2" size="md" alignSelf="center">
          Login with Cognito
        </CUI.Heading>
        <CUI.Heading mb="2" size="sm">
          Email
        </CUI.Heading>
        <CUI.Input
          className="field"
          type="email"
          id="email"
          name="email"
          value={fields.email}
          onChange={handleFieldChange}
          autoComplete="username"
        />
        <CUI.Heading mb="2" size="sm">
          Password
        </CUI.Heading>
        <CUI.Input
          className="field"
          type="password"
          id="password"
          name="password"
          value={fields.password}
          onChange={handleFieldChange}
          autoComplete="password"
        />
        <CUI.Button
          colorScheme="teal"
          width="full"
          data-cy="login-with-cognito-button"
          type="submit"
        >
          Login with Cognito
        </CUI.Button>
      </CUI.Stack>
    </form>
  );
};

interface Props {
  loginWithIDM: () => void;
}

export const LocalLogins = ({ loginWithIDM }: Props) => {
  return (
    <CUI.Container maxW="sm" h="full" my="auto">
      <CUI.Box textAlign="center" mb="6">
        <CUI.Heading mb="2" size="md" alignSelf="center">
          Developer Login{" "}
        </CUI.Heading>
        <CUI.Divider />
      </CUI.Box>
      <CUI.Stack spacing={8}>
        <CUI.Button colorScheme="teal" onClick={loginWithIDM} width="full">
          Login with IDM
        </CUI.Button>
        <LocalLogin />
      </CUI.Stack>
    </CUI.Container>
  );
};
