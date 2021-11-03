import { Auth } from "aws-amplify";
import config from "@/config";

const userKey = "userKey";

export async function updateCurrentUserAttributes(userAttributes: object) { // ! May need stricter type check but libarary only descrips as an object
  const localLogin = config.LOCAL_LOGIN === "true";
  if (localLogin) {
    return updateLocalCurrentUserAttributes(userAttributes);
  } else {
    let user = await Auth.currentAuthenticatedUser();
    return Auth.updateUserAttributes(user, userAttributes);
  }
}

export function updateLocalCurrentUserAttributes(userAttributes: object) {// ! May need stricter type check but libarary only descrips as an object
  const store = window.localStorage;
  const localStorageItem = store.getItem(userKey);

  if (localStorageItem) {
    var info = JSON.parse(localStorageItem);
    info.attributes = { ...info.attributes, ...userAttributes };
    store.setItem(userKey, JSON.stringify(info));
  }
}

export async function currentUserInfo() {
  const localLogin = config.LOCAL_LOGIN === "true";

  if (localLogin) {
    return getLocalUserInfo();
  } else {
    return Auth.currentUserInfo();
  }
}

export function getLocalUserInfo() {
  const store = window.localStorage;
  const localStorageItem = store.getItem(userKey);

  if (localStorageItem) {
    return JSON.parse(localStorageItem);
  }

  return undefined;
}

export async function loginLocalUser(userInfo: string) {
  const store = window.localStorage;

  store.setItem(userKey, userInfo);
}

export async function logoutLocalUser() {
  const store = window.localStorage;
  store.removeItem(userKey);
}
