import { fireEvent, screen } from "@testing-library/react";
import * as QMR from "components";
import { renderWithHookForm } from "utils/testUtils/reactHookFormRenderer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act } from "react";
import { useUser } from "hooks/authHooks";

const queryClient = new QueryClient();

jest.mock("hooks/authHooks");
jest.mock("aws-amplify/storage", () => ({
  getUrl: jest.fn().mockReturnValue({
    url: "aws.mock.file.url",
  }),
  uploadData: jest.fn().mockReturnValue({
    result: {
      key: "test",
    },
  }),
  downloadData: jest.fn().mockReturnValue({
    result: {
      body: "mock file content",
    },
  }),
  remove: jest.fn().mockResolvedValue({}),
}));

const mockUseUser = useUser as jest.Mock;

describe("Test Upload Component", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });

    renderWithHookForm(
      <QueryClientProvider client={queryClient}>
        <QMR.Upload name="test-component" label="test label" />
      </QueryClientProvider>,
      {
        defaultValues: {
          "test-component": [
            new File([JSON.stringify({ ping: true })], "ping.json", {
              type: "application/json",
            }),
          ],
        },
      }
    );
  });

  test("Check that the Upload Component renders", () => {
    expect(screen.getByText(/drag & drop/i)).toBeInTheDocument();
  });
  test("Check that the Upload Component renders", () => {
    expect(screen.getByText(/test label/i)).toBeInTheDocument();
  });
  test("ComponentMask does not render for state user", () => {
    const mask = screen.queryByTestId("component-mask");
    expect(mask).toBeNull();
  });
});

describe("Test Drag and Drop, Download, and Delete", () => {
  beforeEach(async () => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: true };
    });

    renderWithHookForm(
      <QueryClientProvider client={queryClient}>
        <QMR.Upload name="test-component" label="test label" />
      </QueryClientProvider>
    );

    const dropZone = screen.getByTestId("upload-stack");
    const fileToUpload = new File(["test"], "test.png", {
      type: "image/png",
    });

    // drag and drop a file
    await act(async () => {
      fireEvent.drop(dropZone, {
        target: {
          files: [fileToUpload],
        },
      });
    });
  });

  test("Check that you can drag and drop a file", async () => {
    expect(screen.getByText("test.png")).toBeInTheDocument();
  });

  test("Check that file extension is lowercased", async () => {
    const dropZone = screen.getByTestId("upload-stack");
    const fileToUpload = new File(["test2"], "test2.pNg", {
      type: "image/png",
    });

    // drag and drop a file
    await act(async () => {
      fireEvent.drop(dropZone, {
        target: {
          files: [fileToUpload],
        },
      });
    });

    expect(screen.getByText("test2.png")).toBeInTheDocument();
  });

  test("Check that file can be downloaded", async () => {
    const mockDownloadData = jest.spyOn(
      require("aws-amplify/storage"),
      "downloadData"
    );
    await act(async () => {
      screen.getByText("test.png").click();
    });
    expect(mockDownloadData).toHaveBeenCalledWith({ path: "public/test" });
  });

  test("Check that file can be deleted", async () => {
    const mockRemove = jest.spyOn(require("aws-amplify/storage"), "remove");
    await act(async () => {
      screen.getByTestId("test-delete-btn-0").click();
    });
    expect(mockRemove).toHaveBeenCalledWith({ path: "public/test" });
  });

  test("Check that errors during file upload show error message", async () => {
    const mockUploadData = jest.spyOn(
      require("aws-amplify/storage"),
      "uploadData"
    );
    mockUploadData.mockImplementation(() => {
      throw new Error("Mock upload error");
    });

    expect(
      await screen.findByText("There was an error uploading your file")
    ).toBeInTheDocument();

    mockUploadData.mockRestore();
  });
});

describe("non-state user", () => {
  beforeEach(() => {
    mockUseUser.mockImplementation(() => {
      return { isStateUser: false };
    });

    renderWithHookForm(
      <QMR.Upload name="test-component-inactive" label="test label inactive" />,
      {
        defaultValues: {
          "test-component-inactive": [
            new File([JSON.stringify({ ping: true })], "ping.json", {
              type: "application/json",
            }),
          ],
        },
      }
    );
  });

  test("ComponentMask renders for non-state user", () => {
    expect(screen.getByTestId("component-mask")).toBeInTheDocument();
  });
});
