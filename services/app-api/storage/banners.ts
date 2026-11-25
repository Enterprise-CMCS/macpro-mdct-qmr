import dynamoDb from "../libs/dynamodb-lib";
import { Banner } from "@qmr/shared";

const TableName = process.env.BannersTable!;

export const getBannerFromTable = async (bannerId: string) => {
  return await dynamoDb.get<Banner>({
    TableName,
    Key: { key: bannerId },
  });
};

export const putBannerToTable = async (banner: Banner) => {
  await dynamoDb.put({
    TableName,
    Item: banner,
  });
};

export const deleteBannerFromTable = async (bannerId: string) => {
  await dynamoDb.delete({
    TableName,
    Key: { key: bannerId },
  });
};
