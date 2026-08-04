import { spawn } from "node:child_process";
import { chmodSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { gunzipSync } from "node:zlib";
import handler from "../../libs/handler-lib";
import { Errors, StatusCodes } from "../../utils/constants/constants";
import { parseCoreSetParameters } from "../../utils/parseParameters";
import sanitizeHtml from "sanitize-html";

const PRINCE_TIMEOUT_MS = 10_000;
// --media=screen matches browser/Chakra styling (DocRaptor print default dropped borders/colors).
const PRINCE_ARGS = [
  "-",
  "--output=-",
  "--pdf-profile=PDF/UA-1",
  "--media=screen",
] as const;

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

  const compressedBuffer = Buffer.from(rawBody, "base64");

  let decodedHtml;
  try {
    decodedHtml = gunzipSync(compressedBuffer).toString();
  } catch (error) {
    throw new Error("Failed to decompress gzipped HTML: " + error);
  }

  // DOMPurify was making us timeout on large documents, so switched to sanitize-html
  // Use sanitize-html to match previous DOMPurify config, and allow Chakra necessary tags/attributes
  const sanitizedHtml = sanitizeHtml(decodedHtml, buildSanitizationConfig());

  const pdfBuffer = await renderPdfWithPrince(sanitizedHtml);
  return {
    status: StatusCodes.SUCCESS,
    body: pdfBuffer.toString("base64"),
  };
});

function describePrincePackageLayout(taskRoot: string): string {
  if (existsSync(join(taskRoot, "lib/prince/bin/prince"))) {
    return "macOS package";
  }
  if (
    existsSync(join(taskRoot, "prince-engine/bin/prince.x86_64")) ||
    existsSync(join(taskRoot, "prince-engine/bin/prince.aarch64"))
  ) {
    return "Linux AWS package";
  }
  return "unknown package layout";
}

/**
 * Ministack/LocalStack often extracts Lambda zips without preserving +x.
 * Restore execute bits when missing so spawn("./prince") does not fail with EACCES.
 */
function ensurePrinceExecutable(taskRoot: string) {
  const candidates = [
    join(taskRoot, "prince"),
    join(taskRoot, "prince-engine/bin/prince"),
    join(taskRoot, "prince-engine/bin/prince.x86_64"),
    join(taskRoot, "prince-engine/bin/prince.aarch64"),
    join(taskRoot, "lib/prince/bin/prince"),
  ];
  for (const filePath of candidates) {
    if (!existsSync(filePath)) continue;
    const mode = statSync(filePath).mode;
    if ((mode & 0o111) === 0) {
      try {
        chmodSync(filePath, 0o755);
      } catch {
        // /var/task is read-only on real AWS; ignore — zip should already have +x there.
      }
    }
  }
}

/**
 * Run the vendored Prince binary against HTML on stdin and return PDF bytes on stdout.
 * `--pdf-profile=PDF/UA-1` matches the DocRaptor prince_options profile.
 * `--media=screen` applies screen stylesheets so Chakra form/link chrome renders.
 */
export function renderPdfWithPrince(html: string): Promise<Buffer> {
  const taskRoot = process.env.LAMBDA_TASK_ROOT ?? process.cwd();
  ensurePrinceExecutable(taskRoot);

  return new Promise((resolve, reject) => {
    const child = spawn("./prince", [...PRINCE_ARGS], {
      cwd: taskRoot,
      env: process.env,
    });

    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];
    let settled = false;

    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };

    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
      fail(new Error("Prince PDF generation timed out"));
    }, PRINCE_TIMEOUT_MS);

    child.stdout.on("data", (chunk: Buffer) => stdoutChunks.push(chunk));
    child.stderr.on("data", (chunk: Buffer) => stderrChunks.push(chunk));
    child.on("error", (error) => {
      clearTimeout(timeout);
      fail(
        new Error(`Failed to spawn Prince in ${taskRoot}: ${error.message}. `)
      );
    });
    child.on("close", (code, signal) => {
      clearTimeout(timeout);
      if (settled) return;

      const pdfBuffer = Buffer.concat(stdoutChunks);
      const stderr = Buffer.concat(stderrChunks).toString();
      const hasPdf =
        pdfBuffer.length > 0 && pdfBuffer.subarray(0, 4).toString() === "%PDF";

      // DocRaptor-like soft-fail: Prince often still emits a PDF while logging
      // PDF/UA-1 structure errors. Return the PDF and only fail when we got nothing usable.
      if (stderr) {
        console.warn(`Prince stderr (exit ${code ?? "unknown"}):\n${stderr}`);
      }

      if (hasPdf) {
        settled = true;
        resolve(pdfBuffer);
        return;
      }

      const princeError = stderr.match(/prince:\s+error:\s+([^\n]+)/i);
      const packageHint = describePrincePackageLayout(taskRoot);
      const detail = princeError
        ? princeError[1]
        : stderr.trim() ||
          `prince exited with code ${code ?? "unknown"}${
            signal ? ` signal ${signal}` : ""
          }`;
      fail(
        new Error(
          `PDF generation failed - ${detail} (${packageHint} in ${taskRoot})`
        )
      );
    });

    if (!child.stdin) {
      clearTimeout(timeout);
      fail(new Error("Failed to open Prince stdin"));
      return;
    }

    // If Prince dies immediately (wrong arch binary, missing +x, bad license),
    // stdin write emits EPIPE. Ignore it and let the 'close' handler report stderr.
    child.stdin.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "EPIPE" || error.code === "ERR_STREAM_DESTROYED") {
        return;
      }
      clearTimeout(timeout);
      fail(error);
    });

    child.stdin.end(html);
  });
}

/*
 * These settings are a best-effort to prevent attacks due to parsing malicious HTML.
 * Since no one but the user making the request will see the resulting PDF,
 * these settings are more relaxed than how we sanitize other API requests.
 * Notably, we allow `style` (tags and attrs), which is normally forbidden.
 * Some sanitization parameters explained:
 *  - "head" - Add <head> to the tag allowlist. It's important.
 *  - "html" - We want the entire <html> document returned.
 *  - "link" - We use <link> tags to include some styles.
 *  - "base" - The <base> tag tells the renderer to treat relative
 *    URLs (such as <img src="/bar.jpg"/>) as absolute ones (such as
 *    <img src="https://foo.com/bar.jpg"/>). Without this, relative
 *    URLs can appear as filesystem access attempts.
 *  - "polyline" - This makes checkbox checkmarks visible
 *  - "style" - Chakra UI uses style tags for critical CSS.
 */
const buildSanitizationConfig = (): sanitizeHtml.IOptions => {
  const defaults = sanitizeHtml.defaults;
  const extraAttributes = {
    a: [...defaults.allowedAttributes.a, "rel"],
    img: [...defaults.allowedAttributes.img, "class", "style"],
    link: ["rel", "href", "type", "media"],
    base: ["href", "target"],
    input: [
      "type",
      "value",
      "checked",
      "disabled",
      "placeholder",
      "name",
      "id",
      "class",
      "style",
    ],
    button: ["type", "name", "id", "class", "style"],
    svg: [
      "width",
      "height",
      "viewBox",
      "xmlns",
      "fill",
      "stroke",
      "class",
      "style",
    ],
    path: ["d", "fill", "stroke", "class", "style"],
    polyline: ["points"],
  };
  const extraTags = ["html", "body", "head", "style", "label", "form"];
  return {
    // We must allowVulnerableTags in order to preserve `<style>` tags
    allowVulnerableTags: true,
    allowedAttributes: {
      ...defaults.allowedAttributes,
      ...extraAttributes,
      "*": ["class", "style", "id", "data-*"],
    },
    allowedTags: [
      ...defaults.allowedTags,
      ...Object.keys(extraAttributes),
      ...extraTags,
    ],
  };
};
