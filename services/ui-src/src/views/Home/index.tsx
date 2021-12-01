import { Redirect } from "react-router-dom";
import "./index.module.scss";

export function Home({ user }: any): JSX.Element {
  const state = user.userState;
  if (!state) {
    return <p>Ooooh! no state for you</p>;
  }
  return <Redirect to="/{state}" />;
}
