// This file is managed by macpro-mdct-core so if you'd like to change it let's do it there
import { Octokit } from "@octokit/rest";
import {
  WAFV2Client,
  GetIPSetCommand,
  ListIPSetsCommand,
  UpdateIPSetCommand,
} from "@aws-sdk/client-wafv2";
import { createActionAuth } from "@octokit/auth-action";

const ipsetName = `${process.env.BRANCH_NAME!}-gh-ipset`;
const apiIpsetName = `${process.env.BRANCH_NAME!}-api-gh-ipset`;
const client = new WAFV2Client({});

async function run() {
  const authentication = await createActionAuth()();
  const octokit = new Octokit({ auth: authentication.token });

  const { data: meta } = await octokit.request("GET /meta");
  const actionsCidrs = meta.actions?.filter((cidr) => !cidr.includes(":")); // only IPv4

  const listResponse = await client.send(
    new ListIPSetsCommand({
      Scope: "CLOUDFRONT",
    })
  );
  const ipset = listResponse.IPSets?.find((set) => set.Name === ipsetName);
  const ipsetId = ipset!.Id;

  const getResponse = await client.send(
    new GetIPSetCommand({
      Scope: "CLOUDFRONT",
      Id: ipsetId,
      Name: ipsetName,
    })
  );

  const response = await client.send(
    new UpdateIPSetCommand({
      Scope: "CLOUDFRONT",
      Id: ipsetId,
      Name: ipsetName,
      LockToken: getResponse.LockToken!,
      Addresses: actionsCidrs,
    })
  );
  if (response.$metadata.httpStatusCode === 200) {
    console.log("CloudFront WAF IP Set updated");
  }

  const regionalListResponse = await client.send(
    new ListIPSetsCommand({
      Scope: "REGIONAL",
    })
  );
  const apiIpset = regionalListResponse.IPSets?.find(
    (set) => set.Name === apiIpsetName
  );
  const apiIpsetId = apiIpset!.Id;

  const apiGetResponse = await client.send(
    new GetIPSetCommand({
      Scope: "REGIONAL",
      Id: apiIpsetId,
      Name: apiIpsetName,
    })
  );

  const apiResponse = await client.send(
    new UpdateIPSetCommand({
      Scope: "REGIONAL",
      Id: apiIpsetId,
      Name: apiIpsetName,
      LockToken: apiGetResponse.LockToken!,
      Addresses: actionsCidrs,
    })
  );
  if (apiResponse.$metadata.httpStatusCode === 200) {
    console.log("API Gateway WAF IP Set updated");
  }
}

run();
