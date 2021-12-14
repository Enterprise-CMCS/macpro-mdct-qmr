import AWS from "aws-sdk";

const dyanmoConfig = {};

const client = new AWS.DynamoDB.DocumentClient(dyanmoConfig);

export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  post: (params) => client.post(params).promise(),
  query: (params) => client.query(params).promise(),
  scan: (params) => client.scan(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
};
