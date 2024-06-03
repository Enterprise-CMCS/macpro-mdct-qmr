import { API, Auth } from "aws-amplify";
import { AdminBannerData } from "types";

async function requestOptions(): Promise<any> {
  try {
    let token;
    const session = await Auth.currentSession();

    try {
      token = await session.getIdToken().getJwtToken();
    } catch (e) {
      console.log("Error getting token");
      console.log({ e });
    }

    const options = {
      headers: { "x-api-key": token },
    };

    return options;
  } catch (e) {
    console.log("Error getting current session - signin out");
    console.log({ e });
    Auth.signOut();
    if (window !== undefined) {
      window.location.href = window.location.origin;
    }
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

async function getReportingYears(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.get("coreSet", `/coreset/reportingyears`, opts);
}

async function getMeasureListInfo(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.get("coreSet", `/coreset/measureListInfo`, opts);
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
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}/get`,
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

async function getRate(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.get(
    "rate",
    `/rate/${inputObj.state}/${inputObj.year}/${inputObj.measure}/get`,
    opts
  );
}

async function getPDF(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return API.post(
    "coreSet",
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/getPDF`,
    opts
  );
}

//BANNER
async function getBanner(bannerKey: string) {
  const opts = await requestOptions();
  const response = await API.get("coreSet", `/banners/${bannerKey}`, opts);
  return response;
}

async function writeBanner(bannerData: AdminBannerData) {
  const opts = await requestOptions();
  opts.body = bannerData;
  return API.post("coreSet", `/banners/${bannerData.key}`, opts);
}

async function deleteBanner(bannerKey: string) {
  const opts = await requestOptions();
  return await API.del("coreSet", `/banners/${bannerKey}`, opts);
}

export {
  createCoreSet,
  createMeasure,
  deleteCoreSet,
  deleteMeasure,
  editCoreSet,
  editMeasure,
  getAllCoreSets,
  getCoreSet,
  getMeasure,
  getMeasureListInfo,
  getPDF,
  getReportingYears,
  listMeasures,
  writeBanner,
  getBanner,
  deleteBanner,
  getRate,
};
