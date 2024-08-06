import { logger } from "../libs/debug-lib";
import { APIGatewayProxyEvent, isState, isValidYear } from "../types";

export const parseParameters = (event: APIGatewayProxyEvent) => {
  const { state, year, coreSet, measure } = event.pathParameters ?? {};

  if (!isState(state)) {
    logger.warn("Invalid state in path");
    return { allParamsValid: false as const };
  }
  if (!isValidYear(year)) {
    logger.warn("Invalid year in path");
    return { allParamsValid: false as const };
  }
  if (coreSet) {
    logger.warn("Invalid coreset in path");
    return { allParamsValid: false as const };
  }
  if (measure) {
    logger.warn("Invalid measure in path");
    return { allParamsValid: false as const };
  }
  return { allParamsValid: true as const, state, year, coreSet, measure };
};
