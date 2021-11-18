import Measure from "pages/Measure";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import userReducer from "store/reducers/userReducer";
import { BrowserRouter as Router } from "react-router-dom";
import { ReduxStateInterface } from "test/LocalLogins.test";

function renderWithProviders(
  ui: React.ReactNode,
  { reduxState }: ReduxStateInterface
) {
  const store = createStore(userReducer, reduxState || {});
  return render(<Provider store={store}>{ui}</Provider>);
}

describe("Test measure.tsx", () => {
  test("Check that the measure renders", () => {
    const result = renderWithProviders(
      <Router>
        <Measure />
      </Router>,
      {
        reduxState: {
          user: {
            username: "alice",
            attributes: {
              given_name: "Alice",
              family_name: "Foo",
              email: "alice@example.com",
              "custom:cms_roles": "APPROVER",
            },
          },
        },
      }
    );

    expect(result.getByTestId("measure")).toBeVisible();
  });
});
