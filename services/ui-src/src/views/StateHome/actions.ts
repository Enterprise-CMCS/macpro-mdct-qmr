import { CoreSetTableItem } from "components/Table/types";
import { isDevEnv } from "config";

interface ActionsData {
  handleDelete: any;
  completeAllMeasures: () => void;
  resetCoreSet: () => void;
  type: CoreSetTableItem.Type;
  exportAll: (data: any) => void;
}

export const getCoreSetActions = ({
  type,
  handleDelete,
  completeAllMeasures,
  resetCoreSet,
  exportAll,
}: ActionsData) => {
  let actionsList = [];

  if (
    type === CoreSetTableItem.Type.ADULT ||
    type === CoreSetTableItem.Type.CHILD ||
    type === CoreSetTableItem.Type.HEALTH_HOME
  ) {
    actionsList.push(
      ...[
        {
          itemText: "Export",
          handleSelect: exportAll,
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
      itemText: "Export",
      handleSelect: () => console.log("Export"),
      type: type,
    });
  }

  if (isDevEnv()) {
    actionsList.push({
      itemText: "Complete All Measures",
      handleSelect: completeAllMeasures,
      type: type,
    });
    actionsList.push({
      itemText: "Reset All Measures",
      handleSelect: resetCoreSet,
      type: type,
    });
  }

  return actionsList;
};
