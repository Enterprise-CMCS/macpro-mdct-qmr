import { getPDF } from "../pdf";

import { fetch } from "cross-fetch";
import { testEvent } from "../../../test-util/testEvents";

jest.mock("../../../libs/authorization", () => ({
  isAuthenticated: jest.fn().mockReturnValue(true),
}));

jest.mock("cross-fetch", () => ({
  fetch: jest.fn().mockResolvedValue({
    // Base64 PDFs always start with JBVERi0, which is "%PDF-"
    json: jest.fn().mockResolvedValue("JVBERi0xLjc="),
  }),
}));

jest.mock("@smithy/signature-v4", () => ({
  SignatureV4: function () {
    return {
      sign: jest.fn().mockImplementation((request) => {
        expect(request.headers).toHaveProperty("host", "princefakeurl.com");
        return {
          ...request,
          headers: {
            ...request.headers,
            authorization: "mock authorization",
          },
        };
      }),
    };
  },
}));

const dangerousHtml = "<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>";
const base64EncodedDangerousHtml =
  Buffer.from(dangerousHtml).toString("base64");

const sanitizedHtml = "<p>abc</p>";
const base64EncodedSanitizedHtml =
  Buffer.from(sanitizedHtml).toString("base64");

const noBodyEvent = {
  ...testEvent,
  body: null,
};

const dangerousHtmlBodyEvent = {
  ...testEvent,
  body: base64EncodedDangerousHtml,
};

describe("Test GetPDF handler errors", () => {
  test("Test throws error when no body provided", async () => {
    const res = await getPDF(noBodyEvent, null);
    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("Missing request body");
  });

  test("Test throws error when body is not type string", async () => {
    const res = await getPDF(testEvent, null);
    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("Could not process request");
  });

  test("Test throws error when config not defined", async () => {
    const res = await getPDF(dangerousHtmlBodyEvent, null);
    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("No config found to make request to PDF API");
  });
});

describe("Test GetPDF handler", () => {
  beforeEach(() => {
    process.env = {
      princeUrl: "https://princefakeurl.com/print",
      AWS_ACCESS_KEY_ID: "FAKEKEY",
      AWS_SECRET_ACCESS_KEY: "FAKESECRET", // pragma: allowlist secret
      AWS_SESSION_TOKEN: "FAKETOKEN",
    };
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("Test successful prince call with sanitized html", async () => {
    const res = await getPDF(dangerousHtmlBodyEvent, null);
    expect(fetch).toHaveBeenCalledWith(
      "https://princefakeurl.com/print",
      expect.objectContaining({
        body: base64EncodedSanitizedHtml,
        headers: expect.objectContaining({
          authorization: "mock authorization",
        }),
      })
    );
  });
});
