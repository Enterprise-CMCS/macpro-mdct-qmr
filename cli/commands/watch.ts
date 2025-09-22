import { Argv } from "yargs";
import { checkIfAuthenticated } from "../lib/sts.js";
import { runCommand } from "../lib/runner.js";
import {
  runFrontendLocally,
  getCloudFormationStackOutputValues,
} from "../lib/utils.js";
import downloadClamAvLayer from "../lib/clam.js";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";

export const watch = {
  command: "watch",
  describe: "run cdk watch and react together",
  builder: (yargs: Argv) => {
    return yargs.option("stage", { type: "string", demandOption: true });
  },
  handler: async (options: { stage: string }) => {
    checkIfAuthenticated();

    await downloadClamAvLayer();
    await Promise.all([
      await runCommand(
        "CDK watch",
        [
          "yarn",
          "cdk",
          "watch",
          "--context",
          `stage=${options.stage}`,
          "--no-rollback",
        ],
        "."
      ),
      await runFrontendLocally(options.stage),
    ]);
  },
};
