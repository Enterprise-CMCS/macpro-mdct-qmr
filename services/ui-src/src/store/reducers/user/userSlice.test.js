import { store } from "../../index";
import { setUser, unsetUser } from "./userSlice";

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
    const state = store.getState();
    expect(state.rootReducer.user).toEqual({});
  });

  test("Able to set user", () => {
    store.dispatch(setUser(testUser));

    expect(store.getState().user).toEqual(testUser);
  });

  test("Able to unset user", () => {
    //set a user first
    store.dispatch(setUser(testUser));

    store.dispatch(unsetUser());

    expect(store.getState().user).toEqual({});
  });
});
