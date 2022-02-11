import { listMeasures } from "../../handlers/measures/get";
import {
  testEvent,
  testCoreSet,
  testMeasure,
} from "../../test-util/testEvents";
import { MeasureStatus } from "../../types";
import { updateCoreSetProgress } from "../updateCoreProgress";

jest.mock("../../handlers/measures/get", () => ({
  __esModule: true,
  listMeasures: jest.fn(),
}));

describe("Test the Update Core Set Progress", () => {
  test("Test updateCoreSetProgress with length 0", async () => {
    const res = await updateCoreSetProgress({}, testEvent, null);
    expect(res).toBeUndefined();
  });

  describe("Test the updateCoreSetProgress with length > 0", () => {
    test("Test measure.status === complete", async () => {
      const coreSet = { ...testCoreSet };
      (listMeasures as jest.Mock).mockReturnValue({
        body: JSON.stringify({
          Items: [
            {
              ...testMeasure,
              status: MeasureStatus.COMPLETE,
            },
          ],
        }),
      });
      const res = await updateCoreSetProgress(
        { Items: [coreSet] },
        testEvent,
        null
      );
      expect(res).toStrictEqual({
        Items: [
          { ...coreSet, progress: { ...coreSet.progress, numComplete: 1 } },
        ],
      });
    });

    test("Test measure.status !== complete", async () => {
      const coreSet = { ...testCoreSet };
      (listMeasures as jest.Mock).mockReturnValue({
        body: JSON.stringify({
          Items: [
            {
              ...testMeasure,
              status: MeasureStatus.INCOMPLETE,
            },
          ],
        }),
      });
      const res = await updateCoreSetProgress(
        { Items: [coreSet] },
        testEvent,
        null
      );
      expect(res).toStrictEqual({
        Items: [
          { ...coreSet, progress: { ...coreSet.progress, numComplete: 0 } },
        ],
      });
    });

    test("Test coreSet exists but no associated measures", async () => {
      const coreSet = { ...testCoreSet };
      (listMeasures as jest.Mock).mockReturnValue({
        body: JSON.stringify({}),
      });
      const res = await updateCoreSetProgress(
        { Items: [coreSet] },
        testEvent,
        null
      );
      expect(res).toStrictEqual({
        Items: [{ ...coreSet }],
      });
    });
  });
});
