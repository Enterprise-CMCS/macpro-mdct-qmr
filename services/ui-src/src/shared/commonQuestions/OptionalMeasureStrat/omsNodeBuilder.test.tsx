import { useFlags } from "launchdarkly-react-client-sdk";
import { TopLevelOmsChildren } from "./omsNodeBuilder";
import { renderWithHookForm } from "utils";

jest.mock("launchdarkly-react-client-sdk", () => ({
  useFlags: jest.fn(),
}));

describe("Test TopLevelOmsChildren", () => {
  it("Test TopLevelOmsChildren render", () => {
    (useFlags as jest.Mock).mockReturnValue({
      "sogi-stratification-options": true,
    });

    renderWithHookForm(
      <TopLevelOmsChildren
        name={""}
        parentDisplayName={""}
        id={""}
        options={[
          {
            id: "mock-id",
            options: [
              {
                id: "",
              },
            ],
          },
        ]}
      />
    );
  });
});
