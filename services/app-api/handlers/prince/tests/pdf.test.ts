import { getPDF } from "../pdf";
import { fetch } from "cross-fetch";
import { testEvent } from "../../../test-util/testEvents";

jest.spyOn(console, "warn").mockImplementation();

jest.mock("../../../libs/authorization", () => ({
  isAuthenticated: jest.fn().mockReturnValue(true),
}));

jest.mock("cross-fetch", () => ({
  fetch: jest.fn().mockResolvedValue({
    status: 200,
    headers: {
      get: jest.fn().mockReturnValue("3"),
    },
    arrayBuffer: jest.fn().mockResolvedValue(
      // An ArrayBuffer containing `%PDF-1.7`
      new Uint8Array([37, 80, 68, 70, 45, 49, 46, 55]).buffer
    ),
  }),
}));

const dangerousHtml = "<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>";
const sanitizedHtml = "<p>abc</p>";
const base64EncodedDangerousHtml =
  Buffer.from(dangerousHtml).toString("base64");

const noBodyEvent = {
  ...testEvent,
  body: null,
};

const dangerousHtmlBodyEvent = {
  ...testEvent,
  body: base64EncodedDangerousHtml,
};

describe("Test GetPDF handler", () => {
  beforeEach(() => {
    process.env = {
      docraptorApiKey: "mock api key", // pragma: allowlist secret
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error when no body provided", async () => {
    const res = await getPDF(noBodyEvent, null);

    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("Missing request body");
  });

  it("should throw error when body is not type string", async () => {
    const res = await getPDF(testEvent, null);

    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("must be base64-encoded HTML");
  });

  it("should throw error when config not defined", async () => {
    delete process.env.docraptorApiKey;

    const res = await getPDF(dangerousHtmlBodyEvent, null);

    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("No config found to make request to PDF API");
  });

  it("should call PDF API with sanitized html", async () => {
    const res = await getPDF(dangerousHtmlBodyEvent, null);

    expect(res.statusCode).toBe(200);

    expect(fetch).toHaveBeenCalled();
    const [url, request] = (fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(request.body);
    expect(url).toBe("https://docraptor.com/docs");
    expect(request).toEqual({
      method: "POST",
      headers: { "content-type": "application/json" },
      body: expect.stringMatching(/^\{.*\}$/),
    });
    expect(body).toEqual({
      user_credentials: "mock api key", // pragma: allowlist secret
      doc: expect.objectContaining({
        document_content: `<html><head></head><body>${sanitizedHtml}</body></html>`,
        type: "pdf",
        prince_options: expect.objectContaining({
          profile: "PDF/UA-1",
        }),
      }),
    });
  });

  it("should remove CSS comments before calling PDF API", async () => {
    const htmlWithCssComment = `<html><head><style>/* emphasize <p> tags */ p {color:red;}</style></head><body><p>Hi</p></body></html>`;
    const htmlWithoutComment = `<html><head><style> p {color:red;}</style></head><body><p>Hi</p></body></html>`;
    const res = await getPDF(
      {
        ...testEvent,
        body: Buffer.from(htmlWithCssComment).toString("base64"),
      },
      null
    );

    expect(res.statusCode).toBe(200);

    expect(fetch).toHaveBeenCalled();
    const request = (fetch as jest.Mock).mock.calls[0][1];
    const body = JSON.parse(request.body);
    expect(body).toEqual(
      expect.objectContaining({
        doc: expect.objectContaining({
          document_content: htmlWithoutComment,
        }),
      })
    );
  });

  it("should handle an error response from the PDF API", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 500,
      text: jest.fn().mockResolvedValue("<error>It broke.</error>"),
    });

    const res = await getPDF(dangerousHtmlBodyEvent, null);

    expect(res.statusCode).toBe(500);

    // eslint-disable-next-line no-console
    expect(console.warn).toBeCalledWith(expect.stringContaining("It broke."));
  });
});
