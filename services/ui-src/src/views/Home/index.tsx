import { Redirect } from "react-router-dom";
import config from "config";
import * as CUI from "@chakra-ui/react";
import "./index.module.scss";

interface Props {
  user?: any;
}

export function Home({ user }: Props): JSX.Element {
  const state = user?.userState;
  if (!state) {
    return (
      <CUI.Box data-testid="Home-Container">
        <CUI.Text>Ooooh! no state for you</CUI.Text>
      </CUI.Box>
    );
  }
  return <Redirect to={`/${state}/${config.currentReportingYear}`} />;
}
