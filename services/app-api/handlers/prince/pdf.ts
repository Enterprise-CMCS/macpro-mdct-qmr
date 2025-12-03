import { gunzipSync } from "zlib";
import { fetch } from "cross-fetch"; // TODO delete this line and uninstall this package, once QMR is running on Nodejs 18+
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import handler from "../../libs/handler-lib";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseCoreSetParameters } from "../../utils/parseParameters";

const windowEmulator: any = new JSDOM("").window;
const DOMPurify = createDOMPurify(windowEmulator);

export const getPDFStatus = handler(async (event, _context) => {
  const status_id =
    event.queryStringParameters && event.queryStringParameters.status_id;
  if (!status_id) {
    return { status: StatusCodes.BAD_REQUEST, body: "Missing status_id" };
  }
  const docRaptorStatusUrl = `https://docraptor.com/status/${status_id}?user_credentials=${process.env.docraptorApiKey}`;
  const response = await fetch(docRaptorStatusUrl);
  if (!response.ok) {
    return {
      status: StatusCodes.SERVER_ERROR,
      body: `DocRaptor error: ${JSON.stringify(response)}`,
    };
  }
  const data = await response.json();
  if (data.status === "completed" && data.download_url) {
    return {
      status: StatusCodes.SUCCESS,
      body: JSON.stringify({ ready: true, url: data.download_url }),
    };
  }
  return {
    status: StatusCodes.SUCCESS,
    body: JSON.stringify({ ready: false }),
  };
});

export const generatePDF = handler(async (event, _context) => {
  const { allParamsValid } = parseCoreSetParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  const rawBody = event.body;
  if (!rawBody) {
    throw new Error("Missing request body");
  }
  if (rawBody.startsWith("{")) {
    throw new Error("Body must be base64-encoded HTML, not a JSON object");
  }
  const { docraptorApiKey, STAGE } = process.env;
  if (!docraptorApiKey) {
    throw new Error("No config found to make request to PDF API");
  }

  // Decode base64 and decompress gzip
  const timer1 = performance.now();
  const compressedBuffer = Buffer.from(rawBody, "base64");
  const timeEnd1 = performance.now();
  const duration1 = timeEnd1 - timer1;
  let decodedHtml;
  try {
    decodedHtml = gunzipSync(compressedBuffer).toString();
  } catch (e) {
    throw new Error("Failed to decompress gzipped HTML: " + e);
  }
  const timer2 = performance.now();
  const sanitizedHtml = fastSanitizeHtml(decodedHtml);
  const endTime2 = performance.now();
  const duration2 = endTime2 - timer2;
  const requestBody = {
    user_credentials: docraptorApiKey,
    doc: {
      document_content: sanitizedHtml,
      type: "pdf" as const,
      tag: "QMR",
      test: STAGE !== "production",
      async: true,
      prince_options: {
        profile: "PDF/UA-1" as const,
      },
    },
  };

  // Send async request to DocRaptor
  const timer3 = performance.now();
  const response = await fetch("https://docraptor.com/docs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const endTime3 = performance.now();
  const duration3 = endTime3 - timer3;
  if (!response.ok) {
    return {
      status: StatusCodes.SERVER_ERROR,
      body: "DocRaptor error",
    };
  }
  const data = await response.json();
  if (data && data.status_id) {
    return {
      status: StatusCodes.SUCCESS,
      body: JSON.stringify({
        status_id: data.status_id,
        bufferDuration: duration1,
        sanitizeDuration: duration2,
        docraptorResponseDuration: duration3,
      }),
    };
  }
  return {
    status: StatusCodes.SERVER_ERROR,
    body: "No status_id returned from DocRaptor",
  };
});

export const getPDF = handler(async (event, _context) => {
  const { allParamsValid } = parseCoreSetParameters(event);
  if (!allParamsValid) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: Errors.NO_KEY,
    };
  }
  const rawBody = event.body; // will be base64-encoded HTML, like "PGh0bWw..."
  if (!rawBody) {
    throw new Error("Missing request body");
  }
  if (rawBody.startsWith("{")) {
    throw new Error("Body must be base64-encoded HTML, not a JSON object");
  }
  const { docraptorApiKey, STAGE } = process.env;
  if (!docraptorApiKey) {
    throw new Error("No config found to make request to PDF API");
  }

  const timer1 = performance.now();
  const compressedBuffer = Buffer.from(rawBody, "base64");
  const timeEnd1 = performance.now();
  const duration1 = timeEnd1 - timer1;

  const timer2 = performance.now();
  let decodedHtml;
  try {
    decodedHtml = gunzipSync(compressedBuffer).toString();
  } catch (e) {
    throw new Error("Failed to decompress gzipped HTML: " + e);
  }
  const timeEnd2 = performance.now();
  const duration2 = timeEnd2 - timer2;

  const timer3 = performance.now();
  const sanitizedHtml = fastSanitizeHtml(decodedHtml);
  const timeEnd3 = performance.now();
  const duration3 = timeEnd3 - timer3;
  const requestBody = {
    user_credentials: docraptorApiKey,
    doc: {
      document_content: sanitizedHtml,
      type: "pdf" as const,
      // This tag differentiates QMR and CARTS requests in DocRaptor's logs.
      tag: "QMR",
      test: STAGE !== "production",
      prince_options: {
        profile: "PDF/UA-1" as const,
      },
    },
  };

  const arrayBuffer = await sendDocRaptorRequest(requestBody);
  const base64PdfData = Buffer.from(arrayBuffer).toString("base64");
  return {
    status: StatusCodes.SUCCESS,
    body: {
      pdfData: base64PdfData,
      bufferDuration: duration1,
      decompressDuration: duration2,
      sanitizeDuration: duration3,
    },
  };
});

async function sendDocRaptorRequest(request: DocRaptorRequestBody) {
  const response = await fetch("https://docraptor.com/docs", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(request),
  });

  await handlePdfStatusCode(response);

  const pdfPageCount = response.headers.get("X-DocRaptor-Num-Pages");
  console.debug(`Successfully generated a ${pdfPageCount}-page PDF.`);

  return response.arrayBuffer();
}

// Strips <script> and <noscript> tags
function fastSanitizeHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<noscript[\s\S]*?>[\s\S]*?<\/noscript>/gi, "");
}

function sanitizeHtml(htmlString: string) {
  if (!DOMPurify.isSupported) {
    throw new Error("Could not process request");
  }

  /*
   * DOMPurify will zap an entire <style> tag if contains a `<` character,
   * and some of our CSS comments do. So we strip all CSS comments before
   * running it through DOMPurify.
   */
  const doc = new JSDOM(htmlString).window.document;
  const styleTags = doc.querySelectorAll("style");
  for (let i = 0; i < styleTags.length; i += 1) {
    const style = styleTags[i];
    /*
     * Currently, our tsconfig targets es5, which doesn't support the `s` flag
     * on regular expressions. But this lambda runs on Node 20, which does.
     * TS includes the `s` in its compiled output, but complains.
     * TODO: Once we bump our TS target to ES2018 or later, delete this comment.
     */
    // @ts-ignore
    style.innerHTML = style.innerHTML.replace(/\/\*.*?\*\//gs, "");
  }
  const commentlessHtml = doc.querySelector("html")!.outerHTML;

  /* Sanitization parameters:
   *  - WHOLE_DOCUMENT - Tells DOMPurify to return the entire <html> doc;
   *    its default behavior is to return only the contents of the <body>.
   *  - ADD_TAGS: "head" - Add <head> to the tag allowlist. It's important.
   *  - ADD_TAGS: "link" - We use <link> tags to include some styles.
   *  - ADD_TAGS: "base" - The <base> tag tells the renderer to treat relative
   *    URLs (such as <img src="/bar.jpg"/>) as absolute ones (such as
   *    <img src="https://foo.com/bar.jpg"/>). Without this, DocRaptor would
   *    reject our documents; when they render it on their servers, relative
   *    URLs would appear as filesystem access attempts, which they disallow.
   */
  const sanitizedHtml = DOMPurify.sanitize(commentlessHtml, {
    WHOLE_DOCUMENT: true,
    ADD_TAGS: ["head", "link", "base"],
  });

  return sanitizedHtml;
}

/**
 * If PDF generation was not successful, log the reason and throw an error.
 *
 * For more details see https://docraptor.com/documentation/api/status_codes
 */
async function handlePdfStatusCode(response: Response) {
  if (response.status === 200) {
    return;
  }

  const xmlErrorMessage = await response.text();
  console.warn("DocRaptor Error Message:\n" + xmlErrorMessage);

  switch (response.status) {
    case 400: // Bad Request
    case 422: // Unprocessable Entity
      throw new Error("PDF generation failed - possibly an HTML issue");
    case 401: // Unauthorized
    case 403: // Forbidden
      throw new Error(
        "PDF generation failed - possibly a configuration or throttle issue"
      );
    default:
      throw new Error(
        `Received status code ${response.status} from PDF generation service`
      );
  }
}

type DocRaptorRequestBody = {
  /** Your DocRaptor API key */
  user_credentials: string;
  doc: DocRaptorParameters;
};

/**
 * Here is some in-band documentation for the more common DocRaptor options.
 * There also options for JS handling, asset handling, PDF metadata, and more.
 * Note that we do not use DocRaptor's hosting; we return the PDF directly.
 * For more details see https://docraptor.com/documentation/api
 */
type DocRaptorParameters = {
  /** Test documents are watermarked, but don't count against API limits. */
  test?: boolean;
  /** We only use `pdf`. */
  type: "pdf" | "xls" | "xlsx";
  /** The HTML to render. Either this or `document_url` is required. */
  document_content?: string;
  /** The URL to fetch and render. Either this or `document_content` is required. */
  document_url?: string;
  /** Synchronous calls have a 60s limit. Callbacks are required for longer-running docs. */
  async?: boolean;
  /** This name will show up in the logs: https://docraptor.com/doc_logs */
  name?: string;
  /** This tag will also show up in DocRaptor's logs. */
  tag?: string;
  /** Should DocRaptor run JS embedded in your HTML? Default is `false`. */
  javascript?: boolean;
  prince_options: {
    /**
     * In theory we can choose a different PDF version, but UA-1 is the only accessible one.
     * https://docraptor.com/documentation/article/6637003-accessible-tagged-pdfs
     */
    profile: "PDF/UA-1";
    /** The default is `print`. */
    media?: "print" | "screen";
    /** May be needed to load relative urls. Alternatively, use the `<base>` tag. */
    baseurl?: string;
    /** The title of your PDF. By default this is the `<title>` of your HTML. */
    pdf_title?: string;
    /** This may be used to override the default DPI of `96`. */
    css_dpi?: number;
  };
};
