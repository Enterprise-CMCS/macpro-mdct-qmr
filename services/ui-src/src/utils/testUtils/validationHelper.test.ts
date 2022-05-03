import * as VH from "./validationHelpers";

//mock and suppress console calls
const mockedConsoleError = jest.fn();
(global as any).console = {
  error: mockedConsoleError,
};

describe("Test Validation Helpers", () => {
  it("should create valid rateData", () => {
    const data = VH.generateOmsRateData(
      ["test1"],
      ["test2"],
      [{ numerator: "5" }]
    );
    expect(data.rates?.["test2"]?.["test1"]?.[0]?.numerator).toBe("5");
  });

  it("should not create data if no data passed", () => {
    const data = VH.generateOmsRateData(["test1"], ["test2"], []);

    expect(data).toEqual({});
    expect(mockedConsoleError).toHaveBeenCalled();
  });
});
