import { getPDF } from "../pdf";
import { testEvent } from "../../../test-util/testEvents";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import { gzipSync } from "zlib";

jest.spyOn(console, "warn").mockImplementation();

global.fetch = jest.fn().mockResolvedValue({
  status: 200,
  headers: {
    get: jest.fn().mockReturnValue("3"),
  },
  arrayBuffer: jest.fn().mockResolvedValue(
    // An ArrayBuffer containing `%PDF-1.7`
    new Uint8Array([37, 80, 68, 70, 45, 49, 46, 55]).buffer
  ),
});

const dangerousHtml =
  "<html><head></head><body><p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p></body></html>";
const compressedHtml = gzipSync(dangerousHtml);
const sanitizedHtml = "<html><head></head><body><p>abcdef</p></body></html>";
const base64EncodedDangerousHtml =
  Buffer.from(compressedHtml).toString("base64");

const event = { ...testEvent };

describe("Test GetPDF handler", () => {
  beforeEach(() => {
    process.env = {
      docraptorApiKey: "mock api key", // pragma: allowlist secret
      STAGE: "dev",
    };
    event.pathParameters = {
      state: "AZ",
      year: "2023",
      coreSet: "CCSC",
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error when no body provided", async () => {
    event.body = null;
    const res = await getPDF(event, null);

    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("Missing request body");
  });

  it("should throw error when body is not type string", async () => {
    event.body = "{}";
    const res = await getPDF(event, null);

    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("must be base64-encoded HTML");
  });

  it("should throw error when config not defined", async () => {
    delete process.env.docraptorApiKey;
    event.body = base64EncodedDangerousHtml;

    const res = await getPDF(event, null);

    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("No config found to make request to PDF API");
  });

  it("should throw error when path params are missing", async () => {
    event.pathParameters = null;

    const res = await getPDF(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  it("should throw error when path params are invalid", async () => {
    event.pathParameters = {
      state: "YU", // invalid state
      year: "2022",
      coreSet: "ACS",
    };

    const res = await getPDF(event, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  it("should call PDF API with sanitized html", async () => {
    event.body = base64EncodedDangerousHtml;
    const res = await getPDF(event, null);
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
        document_content: sanitizedHtml,
        type: "pdf",
        tag: "QMR",
        test: true,
        prince_options: expect.objectContaining({
          profile: "PDF/UA-1",
        }),
      }),
    });
  });

  it("should handle an error response from the PDF API", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 500,
      text: jest.fn().mockResolvedValue("<error>It broke.</error>"),
    });

    event.body = base64EncodedDangerousHtml;

    const res = await getPDF(event, null);

    expect(res.statusCode).toBe(500);

    // eslint-disable-next-line no-console
    expect(console.warn).toBeCalledWith(expect.stringContaining("It broke."));
  });
});
