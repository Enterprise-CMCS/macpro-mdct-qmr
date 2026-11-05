import dynamoDb from "../libs/dynamodb-lib";
import { Banner } from "../types";

type BannerFields = Omit<
  Banner,
  "key" | "createdAt" | "lastAltered" | "lastAlteredBy"
> & {
  createdAt: number;
  lastAltered: number;
  lastAlteredBy?: string;
};

export const getBannerFromTable = async (bannerId: string) => {
  return await dynamoDb.get<Banner>({
    TableName: process.env.BannersTable!,
    Key: { key: bannerId },
  });
};

// Mutations return their parameters to preserve the handlers' response bodies.
export const putBannerToTable = async (
  bannerId: string,
  fields: BannerFields
) => {
  const params = {
    TableName: process.env.BannersTable!,
    Item: { key: bannerId, ...fields },
  };
  await dynamoDb.put(params);
  return params;
};

export const deleteBannerFromTable = async (bannerId: string) => {
  const params = {
    TableName: process.env.BannersTable!,
    Key: { key: bannerId },
  };
  await dynamoDb.delete(params);
  return params;
};
