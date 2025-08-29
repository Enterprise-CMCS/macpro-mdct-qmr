import { createDynamoUpdateParams } from "../dynamoParams";

describe("Test Convert To Dynamo Expression", () => {
  it("should create an object with properties suitable for Dynamo Update", () => {
    const obj = {
      foo: 123,
      bar: "abc",
    };
    const result = createDynamoUpdateParams(obj);

    expect(result).toEqual({
      ExpressionAttributeNames: {
        "#foo": "foo",
        "#bar": "bar",
      },
      ExpressionAttributeValues: {
        ":foo": 123,
        ":bar": "abc",
      },
      UpdateExpression: "SET #foo = :foo, #bar = :bar",
    });
  });
});
