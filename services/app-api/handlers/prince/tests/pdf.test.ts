import { getPDF } from "../pdf";
import { testEvent } from "../../../test-util/testEvents";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import { gzipSync } from "node:zlib";
import Prince from "prince";

jest.spyOn(console, "warn").mockImplementation();

jest.mock("prince", () => {
  const mockExecute = jest.fn().mockResolvedValue(undefined);
  const mockOption = jest.fn().mockReturnThis();
  const mockOutput = jest.fn().mockReturnThis();
  const mockInputs = jest.fn().mockReturnThis();
  const mockLicense = jest.fn().mockReturnThis();
  const mockPrince = jest.fn(() => ({
    license: mockLicense,
    inputs: mockInputs,
    output: mockOutput,
    option: mockOption,
    execute: mockExecute,
  }));
  return mockPrince;
});

jest.mock("node:fs", () => ({
  writeFileSync: jest.fn(),
  readFileSync: jest.fn(() => Buffer.from("%PDF-1.7")),
  unlinkSync: jest.fn(),
}));

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
      princeLicense: "mock-license-content",
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

  it("should throw error when license not defined", async () => {
    delete process.env.princeLicense;
    event.body = base64EncodedDangerousHtml;

    const res = await getPDF(event, null);

    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("No config found for Prince XML license");
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

  it("should call Prince XML with sanitized html", async () => {
    event.body = base64EncodedDangerousHtml;
    const res = await getPDF(event, null);
    expect(res.statusCode).toBe(200);

    expect(Prince).toHaveBeenCalled();
    const princeInstance = (Prince as jest.Mock).mock.results[0].value;
    expect(princeInstance.license).toHaveBeenCalled();
    expect(princeInstance.inputs).toHaveBeenCalled();
    expect(princeInstance.output).toHaveBeenCalled();
    expect(princeInstance.option).toHaveBeenCalledWith(
      "pdf-profile",
      "PDF/UA-1"
    );
    expect(princeInstance.execute).toHaveBeenCalled();

    const fs = require("node:fs");
    expect(fs.writeFileSync).toHaveBeenCalled();
    const writtenHtml = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
    expect(writtenHtml).toBe(sanitizedHtml);
  });

  it("should preserve document tags and metadata", async () => {
    const inputHtml = `<html lang="en"><head><title>My Page</title><meta name="author" content="CMS" /></head><body>Hello, world</body></html>`;
    event.body = Buffer.from(gzipSync(inputHtml)).toString("base64");

    await getPDF(event, null);

    const fs = require("node:fs");
    expect(fs.writeFileSync).toHaveBeenCalled();
    const writtenHtml = (fs.writeFileSync as jest.Mock).mock.calls[0][1];
    expect(writtenHtml).toBe(inputHtml);
  });

  it("should handle an error response from Prince XML", async () => {
    const mockExecute = jest
      .fn()
      .mockRejectedValue(new Error("Prince conversion failed"));
    (Prince as jest.Mock).mockReturnValueOnce({
      license: jest.fn().mockReturnThis(),
      inputs: jest.fn().mockReturnThis(),
      output: jest.fn().mockReturnThis(),
      option: jest.fn().mockReturnThis(),
      execute: mockExecute,
    });

    event.body = base64EncodedDangerousHtml;

    const res = await getPDF(event, null);

    expect(res.statusCode).toBe(500);
    expect(console.warn).toHaveBeenCalled();
  });
});
