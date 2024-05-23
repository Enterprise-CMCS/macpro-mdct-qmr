import { CoreSetTableItem } from "components/Table/types";
import { isDevEnv } from "config";

interface ActionsData {
  deletable?: boolean;
  handleDelete: any;
  completeAllMeasures: () => void;
  resetCoreSet: () => void;
  type: CoreSetTableItem.Type;
  exportAll: (data: any) => void;
}

export const getCoreSetActions = ({
  type,
  deletable = true,
  handleDelete,
  completeAllMeasures,
  resetCoreSet,
  exportAll,
}: ActionsData) => {
  let actionsList = [];

  actionsList.push({
    itemText: "Export",
    handleSelect: exportAll,
    type: type,
  });

  if (deletable) {
    actionsList.push({
      itemText: "Delete",
      handleSelect: handleDelete,
      type: type,
    });
  }

  //avaliable only in the testing environment
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
