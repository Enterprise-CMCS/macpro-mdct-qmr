import { CoreSet } from "components/Table/types";
import * as QMR from "components";

interface CoreSetActions {
  [key: string]: (id: string) => QMR.IKebabMenuItem[];
}

export const coreSetActions: CoreSetActions = {
  [CoreSet.Type.ADULT]: (id: string) => [
    {
      itemText: "Export",
      id,
      handleSelect: (id: string) => {
        console.log("Export " + id);
      },
    },
  ],
  [CoreSet.Type.CHILD]: (id: string) => [
    {
      itemText: "Export",
      id,
      handleSelect: (id: string) => {
        console.log("Export " + id);
      },
    },
    {
      itemText: "Export All",
      id,
      handleSelect: (id: string) => {
        console.log("Export All " + id);
      },
    },
    {
      itemText: "Delete",
      id,
      handleSelect: (id: string) => {
        console.log("Delete " + id);
      },
    },
  ],
  [CoreSet.Type.HEALTH_HOMES]: (id: string) => [
    {
      itemText: "Export",
      id,
      handleSelect: (id: string) => {
        console.log("Export " + id);
      },
    },
    {
      itemText: "Export All",
      id,
      handleSelect: (id: string) => {
        console.log("Export All " + id);
      },
    },
  ],
};
