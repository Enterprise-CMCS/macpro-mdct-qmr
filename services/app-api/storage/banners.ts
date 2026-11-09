import dynamoDb from "../libs/dynamodb-lib";
import { Banner } from "../types";

export const getBannerFromTable = async (bannerId: string) => {
  return await dynamoDb.get<Banner>({
    TableName: process.env.BannersTable!,
    Key: { key: bannerId },
  });
};

export const putBannerToTable = async (banner: Banner) => {
  const params = {
    TableName: process.env.BannersTable!,
    Item: banner,
  };
  await dynamoDb.put(params);
};

export const deleteBannerFromTable = async (bannerId: string) => {
  const params = {
    TableName: process.env.BannersTable!,
    Key: { key: bannerId },
  };
  await dynamoDb.delete(params);
  return params;
};
