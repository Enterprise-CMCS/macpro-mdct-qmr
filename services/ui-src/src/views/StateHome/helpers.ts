import { CoreSet } from "components/Table/types";
import { coreSetMeasureTitle } from "views";
import { getCoreSetActions } from "./actions";

export type CoreSetType = "ACS" | "CCS" | "CCSM" | "CCSC" | "HHCS";

interface Data {
  state: string;
  year: string;
  coreSet: CoreSetType;
}

interface CoreSetDataItem {
  compoundKey: string;
  coreSet: CoreSetType;
  createdAt: number;
  lastAltered: number;
  lastAlteredBy: string;
  progress: { numAvailable: number; numComplete: number };
  state: string;
  submitted: boolean;
  year: number;
}

export interface CoreSetDataItems {
  items: CoreSetDataItem[];
  handleDelete: (data: Data) => void;
}

const getCoreSetType = (type: CoreSetType) => {
  let result;
  switch (type) {
    case "ACS":
      result = CoreSet.Type.ADULT;
      break;
    case "HHCS":
      result = CoreSet.Type.HEALTH_HOMES;
      break;
    default:
      result = CoreSet.Type.CHILD;
  }
  return result;
};

export const formatTableItems = ({ items, handleDelete }: CoreSetDataItems) => {
  return items.map((item: CoreSetDataItem) => {
    const type = getCoreSetType(item.coreSet);
    const title = coreSetMeasureTitle[item.coreSet];
    const data = {
      handleDelete: () =>
        handleDelete({
          state: item.state,
          year: item.year.toString(),
          coreSet: item.coreSet,
        }),
      type,
    };

    const actions = getCoreSetActions(data);

    return {
      path: item.coreSet,
      title,
      type,
      progress: item.progress,
      actions,
      submitted: item.submitted,
      id: item.compoundKey,
      year: item.year.toString(),
    };
  });
};
