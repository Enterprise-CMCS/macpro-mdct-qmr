import { CoreSet } from "components/Table/types";
// import * as QMR from "components";

interface Data {
  handleDelete: any;
  type: CoreSet.Type;
}

// interface CoreSetActions {
//   [key: string]: (data: Data) => QMR.IKebabMenuItem[];
// }

export const getCoreSetActions = (data: Data) => {
  if (data.type === CoreSet.Type.ADULT) {
    return [
      {
        itemText: "Export",
        handleSelect: data.handleDelete,
      },
    ];
  }
  if (data.type === CoreSet.Type.CHILD) {
    return [
      {
        itemText: "Export",
        handleSelect: () => console.log("export"),
      },
      {
        itemText: "Export All",
        handleSelect: () => console.log("Export All"),
      },
      {
        itemText: "Delete",
        handleSelect: data.handleDelete,
      },
    ];
  }
  return [
    {
      itemText: "Export",
      handleSelect: () => console.log("export"),
    },
    {
      itemText: "Export All",
      handleSelect: () => console.log("Export All"),
    },
  ];
};
