import { getPDF } from "../pdf";
import { testEvent } from "../../../test-util/testEvents";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import { gzipSync } from "node:zlib";
import Prince from "prince";
import { EventEmitter } from "node:events";
import { spawn } from "node:child_process";

jest.spyOn(console, "warn").mockImplementation();
jest.spyOn(console, "error").mockImplementation();

jest.mock("prince", () => {
  const mockPrince = jest.fn(() => ({
    config: {
      binary: "/opt/prince/bin/prince",
      prefix: "/opt/prince",
    },
  }));
  return mockPrince;
});

jest.mock("node:child_process", () => ({
  spawn: jest.fn(),
}));

jest.mock("node:fs", () => ({
  writeFileSync: jest.fn(),
  unlinkSync: jest.fn(),
}));

const dangerousHtml =
  '<html><head></head><body><p>abc<iframe src="javascript:alert(3)"></iframe>def</p></body></html>';
const compressedHtml = gzipSync(dangerousHtml);
const sanitizedHtml = "<html><head></head><body><p>abcdef</p></body></html>";
const base64EncodedDangerousHtml =
  Buffer.from(compressedHtml).toString("base64");

const event = { ...testEvent };
const mockSpawn = spawn as jest.Mock;
let writtenStdin = "";

const createMockPrinceProcess = ({
  stdout = Buffer.from("%PDF-1.7"),
  stderr = Buffer.alloc(0),
  code = 0,
}: {
  stdout?: Buffer | string;
  stderr?: Buffer | string;
  code?: number | null;
} = {}) => {
  const child = new EventEmitter() as any;
  child.stdout = new EventEmitter();
  child.stderr = new EventEmitter();
  child.stdin = new EventEmitter() as any;
  child.stdin.end = jest.fn((data: string) => {
    writtenStdin = data;
    process.nextTick(() => {
      const stdoutBuffer = Buffer.from(stdout);
      const stderrBuffer = Buffer.from(stderr);
      if (stdoutBuffer.length > 0) {
        child.stdout.emit("data", stdoutBuffer);
      }
      if (stderrBuffer.length > 0) {
        child.stderr.emit("data", stderrBuffer);
      }
      child.emit("close", code, null);
    });
  });
  return child;
};

describe("Test GetPDF handler", () => {
  beforeEach(() => {
    const fs = require("node:fs");
    process.env = {
      princeLicense: "mock-license-content",
    };
    writtenStdin = "";
    mockSpawn.mockImplementation(() => createMockPrinceProcess());
    (fs.writeFileSync as jest.Mock).mockImplementation(() => undefined);
    (fs.unlinkSync as jest.Mock).mockImplementation(() => undefined);
    event.pathParameters = {
      state: "AZ",
      year: "2023",
      coreSet: "CCSC",
    };
    event.headers = {
      origin: "https://qmr.example.com",
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
    expect(mockSpawn).toHaveBeenCalledWith(
      "/opt/prince/bin/prince",
      [
        "--prefix",
        "/opt/prince",
        "--license-file",
        expect.stringMatching(/prince-license-.+\.dat$/),
        "--input",
        "html",
        "--pdf-profile",
        "PDF/UA-1",
        "-",
        "--output",
        "-",
      ],
      { stdio: ["pipe", "pipe", "pipe"] }
    );

    const fs = require("node:fs");
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringMatching(/prince-license-.+\.dat$/),
      "mock-license-content",
      "utf8"
    );
    expect(writtenStdin).toBe(
      sanitizedHtml.replace(
        "<head>",
        '<head><base href="https://qmr.example.com/" />'
      )
    );
  });

  it("should preserve document tags and metadata", async () => {
    const inputHtml = `<html lang="en"><head><title>My Page</title><meta name="author" content="CMS" /></head><body>Hello, world</body></html>`;
    event.body = Buffer.from(gzipSync(inputHtml)).toString("base64");

    await getPDF(event, null);

    expect(writtenStdin).toBe(
      inputHtml.replace(
        "<head>",
        '<head><base href="https://qmr.example.com/" />'
      )
    );
  });

  it("should replace document base tags with a safe origin base href", async () => {
    const inputHtml = `<html><head><base href="file:///etc/" /></head><body><img src="/logo.svg" /></body></html>`;
    event.body = Buffer.from(gzipSync(inputHtml)).toString("base64");

    await getPDF(event, null);

    expect(writtenStdin).toContain(
      '<head><base href="https://qmr.example.com/" />'
    );
    expect(writtenStdin).not.toContain("file:///etc/");
  });

  it("should reject non-https origins for PDF base href", async () => {
    event.headers = {
      origin: "http://qmr.example.com",
    };
    event.body = base64EncodedDangerousHtml;

    const res = await getPDF(event, null);

    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("PDF request origin must be an HTTPS URL");
  });

  it("should not write temporary html or pdf files", async () => {
    event.body = base64EncodedDangerousHtml;

    await getPDF(event, null);

    const fs = require("node:fs");
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect((fs.writeFileSync as jest.Mock).mock.calls[0][0]).toMatch(
      /prince-license-.+\.dat$/
    );
    expect(mockSpawn.mock.calls[0][1]).toContain("-");
  });

  it("should return the PDF written to stdout", async () => {
    mockSpawn.mockImplementationOnce(() =>
      createMockPrinceProcess({ stdout: Buffer.from("mock-pdf") })
    );
    event.body = base64EncodedDangerousHtml;

    const res = await getPDF(event, null);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toBe(
      Buffer.from("mock-pdf").toString("base64")
    );
  });

  it("should clean up the temporary license file", async () => {
    const fs = require("node:fs");
    (fs.unlinkSync as jest.Mock)
      .mockImplementationOnce(() => {
        throw new Error("cleanup failed");
      })
      .mockImplementation(() => undefined);
    event.body = base64EncodedDangerousHtml;

    await getPDF(event, null);

    expect(fs.unlinkSync).toHaveBeenCalledTimes(1);
  });

  it("should handle an error response from Prince XML", async () => {
    mockSpawn.mockImplementationOnce(() =>
      createMockPrinceProcess({
        stderr: "prince: error: Prince conversion failed",
        code: 1,
      })
    );

    event.body = base64EncodedDangerousHtml;

    const res = await getPDF(event, null);

    expect(res.statusCode).toBe(500);
    expect(res.body).toContain("PDF generation failed");
    expect(res.body).not.toContain("Prince conversion failed");
    expect(console.error).toHaveBeenCalled();
  });
});
