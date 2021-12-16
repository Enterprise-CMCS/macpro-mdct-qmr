import { API } from "aws-amplify";
import config from "config";
import { getLocalUserInfo } from "libs";

function requestOptions(): any {
  const localLogin = config.LOCAL_LOGIN === "true";

  if (localLogin || config.IS_FEATURE_BRANCH) {
    // serverless offline passes the value of the cognito-identity-id into our lambdas as
    // requestContext.identity.cognitoIdentityId. This lets us set a user locally without involving Cognito.
    const currentUser = getLocalUserInfo();
    const options = {
      headers: { "cognito-identity-id": currentUser.username },
    };
    return options;
  } else {
    return {};
  }
}

function createMeasure(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;

  return API.post(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}`,
    opts
  );
}
function editMeasure(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;

  return API.put(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}`,
    opts
  );
}

function listMeasures(inputObj: any) {
  const opts = requestOptions();
  return API.get(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures`,
    opts
  );
}

function getMeasure(inputObj: any) {
  const opts = requestOptions();
  return API.get(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}`,
    opts
  );
}

function deleteMeasure(inputObj: any) {
  const opts = requestOptions();
  return API.del(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}`,
    opts
  );
}

function getAllCoreSets(inputObj: any) {
  const opts = requestOptions();
  return API.get(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}`,
    opts
  );
}

function getCoreSet(inputObj: any) {
  const opts = requestOptions();
  return API.get(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}`,
    opts
  );
}

function createCoreSet(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.post(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}`,
    opts
  );
}

function editCoreSet(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.put(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}`,
    opts
  );
}

function deleteCoreSet(inputObj: any) {
  const opts = requestOptions();
  return API.del(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}`,
    opts
  );
}

export {
  getAllCoreSets,
  getCoreSet,
  createCoreSet,
  editCoreSet,
  deleteCoreSet,
  listMeasures,
  getMeasure,
  createMeasure,
  editMeasure,
  deleteMeasure,
};
