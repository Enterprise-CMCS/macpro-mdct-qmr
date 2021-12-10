import { API } from "aws-amplify";
import config from "config";
import { getLocalUserInfo } from "libs";
import { IAmendmentInterface } from "views/Amendments";

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

function createMeasure(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;

  return API.post(
    "amendments",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}/measures/${inputObj.measureId}`,
    opts
  );
}
function editMeasure(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;

  return API.put(
    "amendments",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}/measures/${inputObj.measureId}`,
    opts
  );
}

function listMeasures(inputObj: any) {
  const opts = requestOptions();
  return API.get(
    "amendments",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}/measures`,
    opts
  );
}

function getMeasure(inputObj: any) {
  const opts = requestOptions();
  return API.get(
    "amendments",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}/measures/${inputObj.measureId}`,
    opts
  );
}

function listMeasuresMetadata(inputObj: any) {
  const opts = requestOptions();
  return API.get(
    "amendments",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}/measures/metadata`,
    opts
  );
}

function deleteMeasure(inputObj: any) {
  const opts = requestOptions();
  return API.del(
    "amendments",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}/measures/${inputObj.measureId}`,
    opts
  );
}

function getAllCoreSets(inputObj: any) {
  const opts = requestOptions();
  return API.get(
    "amendments",
    `/coreset/${inputObj.state}/${inputObj.year}`,
    opts
  );
}

function getCoreSet(inputObj: any) {
  const opts = requestOptions();
  return API.get(
    "amendments",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}`,
    opts
  );
}

function createCoreSet(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.post(
    "amendments",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}`,
    opts
  );
}

function editCoreSet(inputObj: any) {
  const opts = requestOptions();
  opts.body = inputObj.body;
  return API.put(
    "amendments",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}`,
    opts
  );
}

function deleteCoreSet(inputObj: any) {
  const opts = requestOptions();
  return API.del(
    "amendments",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}`,
    opts
  );
}

function listAmendments() {
  const opts = requestOptions();
  return API.get("amendments", "/amendments", opts);
}

function getAmendment(id: string) {
  const opts = requestOptions();
  return API.get("amendments", `/amendments/${id}`, opts);
}

function createAmendment(body: IAmendmentInterface) {
  const opts = requestOptions();
  opts.body = body;
  return API.post("amendments", "/amendments", opts);
}

function updateAmendment(id: string, body: IAmendmentInterface) {
  const opts = requestOptions();
  opts.body = body;
  return API.put("amendments", `/amendments/${id}`, opts);
}

function deleteAmendment(id: string) {
  const opts = requestOptions();
  return API.del("amendments", `/amendments/${id}`, opts);
}

export {
  deleteAmendment,
  updateAmendment,
  listAmendments,
  getAmendment,
  createAmendment,
  getAllCoreSets,
  getCoreSet,
  createCoreSet,
  editCoreSet,
  deleteCoreSet,
  listMeasures,
  listMeasuresMetadata,
  getMeasure,
  createMeasure,
  editMeasure,
  deleteMeasure,
};
