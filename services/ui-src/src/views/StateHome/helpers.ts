import { CoreSetTableItem } from "components/Table/types";
import { coreSetMeasureTitle } from "views";
import { getCoreSetActions } from "./actions";

interface Data {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
}

interface CoreSetDataItem {
  compoundKey: string;
  coreSet: CoreSetAbbr;
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

const getCoreSetAbbr = (type: CoreSetAbbr) => {
  let result;
  switch (type) {
    case "ACS":
      result = CoreSetTableItem.Type.ADULT;
      break;
    case "HHCS":
      result = CoreSetTableItem.Type.HEALTH_HOMES;
      break;
    default:
      result = CoreSetTableItem.Type.CHILD;
  }
  return result;
};

export const formatTableItems = ({ items, handleDelete }: CoreSetDataItems) => {
  return items.map((item: CoreSetDataItem) => {
    const type = getCoreSetAbbr(item.coreSet);
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
