import { Auth } from "aws-amplify";
import config from "config";

const userKey = "userKey";

export async function updateCurrentUserAttributes(userAttributes: object) {
  const localLogin = config.LOCAL_LOGIN === "true";
  if (localLogin) {
    return updateLocalCurrentUserAttributes(userAttributes);
  } else {
    let user = await Auth.currentAuthenticatedUser();
    return Auth.updateUserAttributes(user, userAttributes);
  }
}

export function updateLocalCurrentUserAttributes(userAttributes: object) {
  const store = window.localStorage;
  const localStorageItem = store.getItem(userKey);

  if (localStorageItem) {
    var info = JSON.parse(localStorageItem);
    info.attributes = { ...info.attributes, ...userAttributes };
    store.setItem(userKey, JSON.stringify(info));
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

export async function loginLocalUser(userInfo: any) {
  const store = window.localStorage;

  store.setItem(userKey, JSON.stringify(userInfo));
}

export async function logoutLocalUser() {
  const store = window.localStorage;
  store.removeItem(userKey);
}
