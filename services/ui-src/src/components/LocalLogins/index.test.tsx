import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocalLogins } from ".";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const mockSignIn = jest.fn();
jest.mock("aws-amplify/auth", () => ({
  ...jest.requireActual("aws-amplify/auth"),
  signIn: () => mockSignIn,
}));

describe("Test LocalLogins", () => {
  it("Test LocalLogins render", () => {
    render(
      <LocalLogins
        loginWithIDM={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(
      screen.getByRole("button", { name: "Login with IDM" })
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "Email" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Password" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Login with Cognito" })
    ).toBeVisible();
  });

  it("Test login with cognito", async () => {
    mockSignIn.mockReturnValue({});
    const { container } = render(
      <LocalLogins
        loginWithIDM={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const emailField = container.querySelector(`input[name="email"]`);
    const passwordField = container.querySelector(`input[name="password"]`);
    if (emailField) await userEvent.type(emailField, "mail@mail.com");
    if (passwordField) await userEvent.type(passwordField, "!@#$%");

    await userEvent.click(
      screen.getByRole("button", { name: "Login with Cognito" })
    );
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalled());
  });
});
