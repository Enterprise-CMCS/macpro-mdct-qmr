import { logger } from "../libs/debug-lib";
import {
  APIGatewayProxyEvent,
  isBannerId,
  isCoreSetAbbr,
  isMeasure,
  isState,
  isValidYear,
} from "../types";

export const parseBannerParameters = (event: APIGatewayProxyEvent) => {
  const { bannerId } = event.pathParameters ?? {};

  if (!bannerId || !isBannerId(bannerId)) {
    logger.warn("Invalid or missing banner id in path");
    return null;
  }
  return bannerId;
};

export const parseStateAndYearParameters = (event: APIGatewayProxyEvent) => {
  const { state, year } = event.pathParameters ?? {};

  if (!state || !isState(state)) {
    logger.warn("Invalid or missing state in path");
    return { allParamsValid: false as const };
  }
  if (!year || !isValidYear(year)) {
    logger.warn("Invalid or missing year in path");
    return { allParamsValid: false as const };
  }
  return { allParamsValid: true as const, state, year };
};

export const parseCoreSetParameters = (event: APIGatewayProxyEvent) => {
  const { state, year, coreSet } = event.pathParameters ?? {};

  if (!state || !isState(state)) {
    logger.warn("Invalid or missing state in path");
    return { allParamsValid: false as const };
  }
  if (!year || !isValidYear(year)) {
    logger.warn("Invalid or missing year in path");
    return { allParamsValid: false as const };
  }
  if (!coreSet || !isCoreSetAbbr(coreSet)) {
    logger.warn("Invalid or missing coreset in path");
    return { allParamsValid: false as const };
  }
  return { allParamsValid: true as const, state, year, coreSet };
};

export const parseMeasureParameters = (event: APIGatewayProxyEvent) => {
  const { state, year, coreSet, measure } = event.pathParameters ?? {};

  if (!state || !isState(state)) {
    logger.warn("Invalid or missing state in path");
    return { allParamsValid: false as const };
  }
  if (!year || !isValidYear(year)) {
    logger.warn("Invalid or missing year in path");
    return { allParamsValid: false as const };
  }
  if (!coreSet || !isCoreSetAbbr(coreSet)) {
    logger.warn("Invalid or missing coreset in path");
    return { allParamsValid: false as const };
  }
  if (!measure || !isMeasure(year, measure)) {
    logger.warn("Invalid or missing measure in path");
    return { allParamsValid: false as const };
  }
  return { allParamsValid: true as const, state, year, coreSet, measure };
};
