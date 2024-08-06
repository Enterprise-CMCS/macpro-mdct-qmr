import { stateAbbreviations } from "../handlers/dynamoUtils/measureList";

//this is for 2024 onward. the array contains the states where the coreset is loaded and separate. There should be 2 of the coreSet type
export const stateLoadedSeparateList = (year: string) => {
  return stateAbbreviations.filter(
    (state) =>
      stateCombinedLoadedList[year] &&
      !stateCombinedLoadedList[year].includes(state)
  );
};

//this is for 2024 onward. the array contains the states where the coreset is loaded and combined. only one of the coreSet type exist
export const stateCombinedLoadedList: { [key: string]: string[] } = {
  "2024": [
    "AK",
    "AS",
    "DC",
    "GU",
    "HI",
    "NH",
    "NM",
    "NC",
    "ND",
    "MP",
    "OH",
    "PR",
    "SC",
    "VI",
    "VT",
    "WY",
  ],
};
