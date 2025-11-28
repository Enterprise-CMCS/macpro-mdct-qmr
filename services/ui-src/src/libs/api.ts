import { get, put, post, del } from "aws-amplify/api";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import { AdminBannerData, AnyObject } from "types";

async function requestOptions(): Promise<any> {
  try {
    const { idToken } = (await fetchAuthSession()).tokens ?? {};

    const options = {
      headers: { "x-api-key": idToken?.toString() },
    };

    return options;
  } catch (e) {
    console.log("Error getting current session - signing out");
    console.log({ e });
    await signOut();
    if (window !== undefined) {
      window.location.href = window.location.origin;
    }
  }
}

const apiName = "coreSet";

/**
 * Wrap the AWS API so we can handle any before or after behaviors.
 * Below we just key off of these API calls as our source of user activity to make sure
 * credentials don't expire.
 */
const apiRequest = async (request: any, path: string, options: AnyObject) => {
  try {
    const { body } = await request({ apiName, path, options }).response;
    const res = await body.text(); // body.json() dies on an empty response, spectacularly
    return res && res.length > 0 ? JSON.parse(res) : null;
  } catch (e: any) {
    // Return our own error for handling in the app
    const info = `Request Failed - ${path} - ${e.response?.body}`;
    console.log(e);
    console.log(info);
    throw new Error(info);
  }
};

const apiLib = {
  del: async (path: string, options: AnyObject) =>
    apiRequest(del, path, options),
  get: async (path: string, options: AnyObject) =>
    apiRequest(get, path, options),
  post: async (path: string, options: AnyObject) =>
    apiRequest(post, path, options),
  put: async (path: string, options: AnyObject) =>
    apiRequest(put, path, options),
};

async function listMeasures(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.get(
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/list`,
    opts
  );
}

async function getReportingYears(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.get(`/coreset/reportingyears`, opts);
}

async function getMeasureListInfo(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.get(`/coreset/measureListInfo`, opts);
}

async function getMeasure(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.get(
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/get`,
    opts
  );
}

async function createMeasure(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.post(
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/create`,
    opts
  );
}
async function editMeasure(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.put(
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/edit`,
    opts
  );
}

async function deleteMeasure(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.del(
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/measures/${inputObj.measure}/delete`,
    opts
  );
}

async function getAllCoreSets(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.get(
    `/coreset/${inputObj.state}/${inputObj.year}/list`,
    opts
  );
}

async function getCoreSet(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.get(
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSetId}/get`,
    opts
  );
}

async function createCoreSet(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.post(
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/create`,
    opts
  );
}

async function editCoreSet(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.put(
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/edit`,
    opts
  );
}

async function deleteCoreSet(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.del(
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/delete`,
    opts
  );
}

async function getRate(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.get(
    `/rate/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/${inputObj.measure}/get`,
    opts
  );
}

async function generatePDF(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  const response = await apiLib.post(
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/generatePDF`,
    opts
  );
  return JSON.parse(response);
}

async function getPDFStatus(inputObj: any) {
  const opts = await requestOptions();
  const response = await apiLib.get(
    `/coreset/${inputObj.state}/${inputObj.year}/${
      inputObj.coreSet
    }/pdfStatus?status_id=${encodeURIComponent(inputObj.status_id)}`,
    opts
  );
  return JSON.parse(response);
}

async function getPDF(inputObj: any) {
  const opts = await requestOptions();
  opts.body = inputObj.body;
  return await apiLib.post(
    `/coreset/${inputObj.state}/${inputObj.year}/${inputObj.coreSet}/getPDF`,
    opts
  );
}

//BANNER
async function getBanner(bannerKey: string) {
  const opts = await requestOptions();
  return await apiLib.get(`/banners/${bannerKey}`, opts);
}

async function writeBanner(bannerData: AdminBannerData) {
  const opts = await requestOptions();
  opts.body = bannerData;
  return await apiLib.post(`/banners/${bannerData.key}`, opts);
}

async function deleteBanner(bannerKey: string) {
  const opts = await requestOptions();
  return await apiLib.del(`/banners/${bannerKey}`, opts);
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
  getRate,
  getPDF,
  getReportingYears,
  listMeasures,
  writeBanner,
  getBanner,
  deleteBanner,
  generatePDF,
  getPDFStatus,
};
