import { Redirect } from "react-router-dom";
import { CognitoUser } from "@aws-amplify/auth";
import config from "config";
import * as CUI from "@chakra-ui/react";
import "./index.module.scss";

interface Props {
  user: CognitoUser | null;
}

export function Home({ user }: Props): JSX.Element {
  // @ts-ignore
  const state = user?.attributes.state;
  if (!state) {
    return (
      <CUI.Box data-testid="Home-Container">
        <CUI.Text>Ooooh! no state for you</CUI.Text>
      </CUI.Box>
    );
  }
  return <Redirect to={`/${state}/${config.currentReportingYear}`} />;
}
