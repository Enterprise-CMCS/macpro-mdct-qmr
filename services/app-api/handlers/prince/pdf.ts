import handler from "../../libs/handler-lib";
import { StatusCodes } from "../../utils/constants/constants";
import { URL } from "url";
import { SignatureV4 } from "@smithy/signature-v4";
import { Sha256 } from "@aws-crypto/sha256-js";
import { fetch } from "cross-fetch"; // TODO remove this polyfill once QMR is on Node 18+

export const getPDF = handler(async (event, _context) => {
  const body = event.body; // will be base64-encoded HTML, like "PGh0bWw..."
  if (!body) {
    throw new Error("Missing request body");
  }

  const {
    // princeApiHost: hostname, // JUST the host name, no protocol, ex: "my-site.cms.gov"
    // princeApiPath: path, // Needs leading slash, ex: "/doc-conv/508html-to-508pdf"
    princeUrl,
    AWS_ACCESS_KEY_ID: accessKeyId,
    AWS_SECRET_ACCESS_KEY: secretAccessKey,
    AWS_SESSION_TOKEN: sessionToken,
  } = process.env;

  if (
    princeUrl === undefined ||
    accessKeyId === undefined ||
    secretAccessKey === undefined ||
    sessionToken === undefined
  ) {
    throw new Error("No config found to make request to PDF API");
  }

  const { hostname, pathname: path } = new URL(princeUrl);

  const request = {
    method: "POST",
    protocol: "https",
    hostname,
    path,
    headers: {
      host: hostname, // Prince requires this to be signed
    },
    body,
  };

  const signer = new SignatureV4({
    service: "execute-api",
    region: "us-east-1",
    credentials: { accessKeyId, secretAccessKey, sessionToken },
    sha256: Sha256,
  });

  const signedRequest = await signer.sign(request);

  const response = await fetch(`https://${hostname}${path}`, signedRequest);

  const base64EncodedPdfData = await response.json();

  return {
    status: StatusCodes.SUCCESS,
    body: base64EncodedPdfData,
  };
});
