import userReducer, { setUser, unsetUser } from "./userSlice";

describe("User Reducer", () => {
  //user object being used in the below tests
  const testUser = {
    username: "alice",
    attributes: {
      given_name: "Alice",
      family_name: "Foo",
      email: "alice@example.com",
    },
  };

  test("User has initial state", () => {
    const state = userReducer(undefined, {});
    expect(state).toEqual({});
  });

  test("Able to set user", () => {
    const state = userReducer(undefined, setUser(testUser));
    expect(state).toEqual(testUser);
  });

  test("Able to unset user", () => {
    const state = userReducer(testUser, unsetUser());
    expect(state).toEqual({});
  });
});
