import { Home } from "./index";
import { render } from "@testing-library/react";
import { RouterWrappedComp } from "utils/testing";
import { CognitoUser } from "@aws-amplify/auth";

describe("Test Home.tsx", () => {
  test("Check that the Home renders", () => {
    const result = render(
      <RouterWrappedComp>
        <Home user={{} as CognitoUser} />
      </RouterWrappedComp>
    );

    const homeContainer = result.getByTestId("Home-Container");
    expect(homeContainer).toBeVisible();
  });
});
