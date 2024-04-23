import { CoreSetTableItem } from "components/Table/types";
import { coreSetMeasureTitle } from "views";
import { getCoreSetActions } from "./actions";
import { CoreSetAbbr, MeasureStatus } from "types";
import { SPAi } from "libs/spaLib";

interface HandleDeleteData {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
}

interface UpdateAllMeasuresData {
  state: string;
  year: string;
  coreSet: CoreSetAbbr;
  measureStatus: MeasureStatus;
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
  handleDelete: (data: HandleDeleteData) => void;
  exportAll: (data: any) => void;
  updateAllMeasures: (data: UpdateAllMeasuresData) => void;
  resetCoreSet: (data: any) => void;
  filteredSpas?: SPAi[];
}

const getCoreSetType = (type: CoreSetAbbr) => {
  let result;
  switch (type) {
    case CoreSetAbbr.ACS:
      result = CoreSetTableItem.Type.ADULT;
      break;
    case CoreSetAbbr.HHCS:
      result = CoreSetTableItem.Type.HEALTH_HOME;
      break;
    case CoreSetAbbr.CCS:
    case CoreSetAbbr.CCSC:
    case CoreSetAbbr.CCSM:
      result = CoreSetTableItem.Type.CHILD;
  }
  return result;
};

export const formatTableItems = ({
  items,
  handleDelete,
  updateAllMeasures,
  resetCoreSet,
  filteredSpas,
  exportAll,
}: CoreSetDataItems) => {
  const coreSetTableItems = items.map(
    ({
      coreSet,
      state,
      year,
      progress,
      submitted,
      compoundKey,
    }: CoreSetDataItem): CoreSetTableItem.Data => {
      // filter on const tempSet?
      const tempSet = coreSet.split("_");
      const tempSpa =
        tempSet.length === 2 &&
        filteredSpas!.filter((s) => s.id === tempSet?.[1])[0];
      const tempTitle =
        tempSpa && tempSpa?.id && tempSpa?.name && tempSpa.state
          ? `${tempSpa.state} ${tempSpa.id} - ${tempSpa.name}`
          : "";

      const type = getCoreSetType(tempSet[0] as CoreSetAbbr);
      const title = coreSetMeasureTitle[tempSet[0] as CoreSetAbbr] + tempTitle;
      const data = {
        handleDelete: () =>
          handleDelete({
            state,
            year: year.toString(),
            coreSet,
          }),
        completeAllMeasures: () => {
          updateAllMeasures({
            state,
            year: year.toString(),
            coreSet,
            measureStatus: MeasureStatus.COMPLETE,
          });
        },
        resetCoreSet: () => {
          resetCoreSet({
            state,
            year: year.toString(),
            coreSet,
          });
        },
        exportAll: () => {
          exportAll({
            state,
            year: year.toString(),
            coreSet,
          });
        },
        type,
      };
      const actions = getCoreSetActions(data);

      return {
        coreSet,
        title,
        type,
        progress,
        actions,
        submitted,
        id: compoundKey,
        year: year.toString(),
      };
    }
  );

  // sort the table items alphabetically by type
  return coreSetTableItems.sort(
    (a: CoreSetTableItem.Data, b: CoreSetTableItem.Data) => {
      if (a.type > b.type) return 1;
      return -1;
    }
  );
};
