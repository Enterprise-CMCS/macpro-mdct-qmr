// node .github/runner-waf-access.ts
import { Octokit } from "@octokit/rest";
import {
  WAFV2Client,
  GetIPSetCommand,
  ListIPSetsCommand,
  UpdateIPSetCommand,
} from "@aws-sdk/client-wafv2";
import { createActionAuth } from "@octokit/auth-action";

const branchName = process.env.BRANCH_NAME!;
const client = new WAFV2Client({});

async function run() {
  const authentication = await createActionAuth()();
  const octokit = new Octokit({ auth: authentication.token });

  const { data: meta } = await octokit.request("GET /meta");
  const actionsCidrs = meta.actions?.filter((cidr) => !cidr.includes(":"));

  const ipsetName = `${branchName}-gh-ipset`;

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

  // if it doesn't have addresses we add them
  // if it has addresses we clear them
  const addresses =
    getResponse.IPSet!.Addresses!.length == 0 ? actionsCidrs : [];

  const response = await client.send(
    new UpdateIPSetCommand({
      Scope: "CLOUDFRONT",
      Id: ipsetId,
      Name: ipsetName,
      LockToken: getResponse.LockToken!,
      Addresses: addresses,
    })
  );
  console.log("WAF IP Set updated:", response);
}

run();
