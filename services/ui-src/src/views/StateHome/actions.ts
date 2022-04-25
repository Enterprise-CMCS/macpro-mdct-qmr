import { CoreSetTableItem } from "components/Table/types";

interface ActionsData {
  handleDelete: any;
  type: CoreSetTableItem.Type;
}

export const getCoreSetActions = ({ type, handleDelete }: ActionsData) => {
  if (type === CoreSetTableItem.Type.ADULT) {
    return [
      {
        itemText: "Export",
        handleSelect: handleDelete,
        type: type,
      },
    ];
  }
  if (
    type === CoreSetTableItem.Type.CHILD ||
    type === CoreSetTableItem.Type.HEALTH_HOME
  ) {
    return [
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
    ];
  }
  return [
    {
      itemText: "Export All",
      handleSelect: () => console.log("Export All"),
      type: type,
    },
  ];
};
