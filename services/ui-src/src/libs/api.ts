import { API, Auth } from "aws-amplify";
import config from "config";

async function requestOptions(): Promise<any> {
  const localLogin = config.LOCAL_LOGIN === "true";
  try {
    const session = await Auth.currentSession();
    const token = await session.getIdToken().getJwtToken();

    if (localLogin) {
      // serverless offline passes the value of the cognito-identity-id into our lambdas as
      // requestContext.identity.cognitoIdentityId. This lets us set a user locally without involving Cognito.
      const options = {
        headers: {
          "cognito-identity-id": "local-user",
          "x-api-key": token,
        },
      };
      return options;
    } else {
      const options = {
        headers: { "x-api-key": token },
      };
      return options;
    }
  } catch (e) {
    console.log({ e });
  }
}

async function listMeasures(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.get(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/list`,
    opts
  );
}

async function getMeasure(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.get(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/get`,
    opts
  );
}

async function createMeasure(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;

  return API.post(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/create`,
    opts
  );
}
async function editMeasure(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;

  return API.put(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/edit`,
    opts
  );
}

async function deleteMeasure(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.del(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/delete`,
    opts
  );
}

async function getAllCoreSets(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.get(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/list`,
    opts
  );
}

async function getCoreSet(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.get(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/get`,
    opts
  );
}

async function createCoreSet(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.post(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/create`,
    opts
  );
}

async function editCoreSet(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.put(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/edit`,
    opts
  );
}

async function deleteCoreSet(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.del(
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
