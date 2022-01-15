import { API } from "aws-amplify";
import config from "config";
import { getLocalUserInfo } from "libs";

function requestOptions(): any {
  const localLogin = config.LOCAL_LOGIN === "true";

  if (localLogin) {
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

function listMeasures(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.put(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/list`,
    opts
  );
}

function getMeasure(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.put(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/get`,
    opts
  );
}

function createMeasure(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;

  return API.post(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/create`,
    opts
  );
}
function editMeasure(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;

  return API.put(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/edit`,
    opts
  );
}

function deleteMeasure(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.put(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/delete`,
    opts
  );
}

function getAllCoreSets(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.put(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/list`,
    opts
  );
}

function getCoreSet(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.get(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/get`,
    opts
  );
}

function createCoreSet(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.post(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/create`,
    opts
  );
}

function editCoreSet(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.put(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/edit`,
    opts
  );
}

function deleteCoreSet(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.put(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/delete`,
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
