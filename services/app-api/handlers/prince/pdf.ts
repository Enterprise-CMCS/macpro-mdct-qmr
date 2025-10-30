/* eslint-disable no-console */
import { fetch } from "cross-fetch"; // TODO delete this line and uninstall this package, once QMR is running on Nodejs 18+
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import handler from "../../libs/handler-lib";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseCoreSetParameters } from "../../utils/parseParameters";

const windowEmulator: any = new JSDOM("").window;
const DOMPurify = createDOMPurify(windowEmulator);

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

  const decodedHtml = Buffer.from(rawBody, "base64").toString();
  const sanitizedHtml = sanitizeHtml(decodedHtml);
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
    body: base64PdfData,
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

  /*
   * Sanitization parameters:
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
  async?: false;
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
