import { CoreSetTableItem } from "components/Table/types";
// import * as QMR from "components";

interface Data {
  handleDelete: any;
  type: CoreSetTableItem.Type;
}

// interface CoreSetActions {
//   [key: string]: (data: Data) => QMR.IKebabMenuItem[];
// }

export const getCoreSetActions = ({ type, handleDelete }: Data) => {
  if (type === CoreSetTableItem.Type.ADULT) {
    return [
      {
        itemText: "Export",
        handleSelect: handleDelete,
        type: type,
      },
    ];
  }
  if (type === CoreSetTableItem.Type.CHILD) {
    return [
      {
        itemText: "Export",
        handleSelect: () => console.log("export"),
        type: type,
      },
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
      itemText: "Export",
      handleSelect: () => console.log("export"),
      type: type,
    },
    {
      itemText: "Export All",
      handleSelect: () => console.log("Export All"),
      type: type,
    },
  ];
};
