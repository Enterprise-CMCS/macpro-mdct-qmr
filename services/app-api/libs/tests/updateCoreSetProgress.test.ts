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
    await updateCoreSetProgress([], testEvent, null);
    // No exception - we're all good here.
  });

  describe("Test the updateCoreSetProgress with length > 0", () => {
    test("Test measure.status === complete", async () => {
      const coreSet = JSON.parse(JSON.stringify(testCoreSet));
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
      await updateCoreSetProgress([coreSet], testEvent, null);
      expect(coreSet).toEqual(
        expect.objectContaining({
          progress: {
            numComplete: 1,
            numAvailable: 1,
          },
        })
      );
    });

    test("Test measure.status !== complete", async () => {
      const coreSet = JSON.parse(JSON.stringify(testCoreSet));
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
      await updateCoreSetProgress([coreSet], testEvent, null);

      expect(coreSet).toEqual(
        expect.objectContaining({
          progress: {
            numComplete: 0,
            numAvailable: 1,
          },
        })
      );
    });

    test("Test coreSet exists but no associated measures", async () => {
      const coreSet = JSON.parse(JSON.stringify(testCoreSet));
      (listMeasures as jest.Mock).mockReturnValue({
        body: JSON.stringify({}),
      });
      await updateCoreSetProgress([coreSet], testEvent, null);
      expect(coreSet).toEqual(
        expect.objectContaining({
          progress: {
            numComplete: 0,
            numAvailable: 0,
          },
        })
      );
    });
  });
});
