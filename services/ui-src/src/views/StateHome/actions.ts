import { CoreSetTableItem } from "components/Table/types";
import config from "config";

interface ActionsData {
  handleDelete: any;
  completeAllMeasures: () => void;
  type: CoreSetTableItem.Type;
}

export const getCoreSetActions = ({
  type,
  handleDelete,
  completeAllMeasures,
}: ActionsData) => {
  let actionsList = [];

  if (type === CoreSetTableItem.Type.ADULT) {
    actionsList.push({
      itemText: "Export",
      handleSelect: handleDelete,
      type: type,
    });
  } else if (type === CoreSetTableItem.Type.CHILD) {
    actionsList.push(
      ...[
        {
          itemText: "Export All",
          handleSelect: () => console.log("Export All"),
          type: type,
        },
        {
          itemText: "Delete",
          handleSelect: handleDelete,
          type: type,
        },
      ]
    );
  } else {
    actionsList.push({
      itemText: "Export All",
      handleSelect: () => console.log("Export All"),
      type: type,
    });
  }

  if (config.BRANCH_NAME !== undefined && config.BRANCH_NAME !== "prod") {
    actionsList.push({
      itemText: "Complete All Measures",
      handleSelect: completeAllMeasures,
      type: type,
    });
  }

  return actionsList;
};
