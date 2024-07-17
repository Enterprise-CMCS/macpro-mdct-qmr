import {
  useAddCoreSet,
  useAddMeasure,
  useDeleteCoreSet,
  useDeleteMeasure,
  useEditCoreSet,
  useGetCoreSet,
  useGetCoreSets,
  useGetMeasure,
  useGetMeasures,
  useGetRate,
  useUpdateMeasure,
  useGetReportingYears,
  useGetBanner,
  useWriteBanner,
  useDeleteBanner,
} from "hooks/api";

// TODO: Create interfaces for each of the hooks

export const defaultMockValues = {
  useAddCoreSetValues: {
    useMutation: () => {
      mutate: () => {}; // eslint-disable-line
    },
  },
  useAddMeasureValues: {
    useMutation: () => {
      mutate: () => {}; // eslint-disable-line
    },
  },
  useDeleteCoreSetValues: { mutate: jest.fn() },
  useDeleteMeasureValues: { mutate: jest.fn() },
  useEditCoreSetValues: {
    mutate: jest.fn(),
    isLoading: false,
  },
  useGetCoreSetsValues: {
    data: {
      Items: [
        {
          compoundKey: "OH2021ACS",
          coreSet: "ACS",
          createdAt: 1641161901553,
          lastAltered: 1641161901553,
          lastAlteredBy: "STATE_USER_QMR",
          progress: { numAvailable: 32, numComplete: 0 },
          state: "OH",
          submitted: false,
          year: 2021,
        },
      ],
    },
    isLoading: false,
    error: undefined,
  },
  useGetMeasureValues: {
    data: {
      Item: {
        data: {},
        compoundKey: "AL2021ACSAIF-HH",
        coreSet: "ACS",
        createdAt: 1642517935305,
        description: "test description",
        lastAltered: 1642517935305,
        lastAlteredBy: "undefined",
        measure: "AIF-HH",
        state: "AL",
        status: "incomplete",
        year: 2021,
      },
    },
    isLoading: false,
    refetch: jest.fn(),
    isError: false,
    error: undefined,
  },
  useGetMeasuresValues: {
    isLoading: false,
    error: undefined,
    isError: undefined,
    data: {
      Items: [
        {
          autoCompleted: false,
          compoundKey: "AL2021ACSIET-AD",
          coreSet: "ACS",
          createdAt: 1642167976771,
          description:
            "Initiation and Engagement of Alcohol and Other Drug Abuse or Dependence Treatment",
          lastAltered: 1642167976771,
          measure: "IET-AD",
          state: "AL",
          status: "incomplete",
          year: 2021,
        },
      ],
    },
  },
  useGetReportingYearsValues: {
    isLoading: false,
    error: undefined,
    isError: undefined,
    data: ["2021"],
  },
  useGetBannerValues: {
    isLoading: false,
    error: undefined,
    isError: undefined,
    isFetched: true,
    data: {
      title: "test banner",
      description: "test description",
      link: "https://www.mocklink.com",
      startDate: new Date().getTime(),
      endDate: new Date().getTime() + 60000,
    },
  },
  useDeleteBannerValues: {
    useMutation: () => {
      mutate: () => {}; // eslint-disable-line
    },
  },
  useWriteBannerValues: {
    useMutation: () => {
      mutate: () => {}; // eslint-disable-line
    },
  },
  useUpdateMeasureValues: {
    useMutation: () => {
      mutate: () => {}; // eslint-disable-line
    },
  },
  useGetRateValues: {
    isLoading: false,
    error: undefined,
    isError: undefined,
    data: {
      Item: {
        compoundKey: "MA2024CCSAAB-CH",
        measure: "AAB-CH",
        state: "MA",
        data: [
          {
            column: "CHIP",
            dataSourceSelections: {
              AdministrativeData0: {
                selected: ["MedicaidManagementInformationSystemMMIS"],
              },
            },
            dataSource: ["AdministrativeData"],
            rates: {
              ZCy3XP: [
                {
                  uid: "ZCy3XP.xS5HMm",
                  label: "Ages 3 months to 17 years",
                  rate: "0.0",
                  numerator: "1",
                  denominator: "1",
                },
              ],
            },
          },
          {
            column: "Medicaid",
            dataSourceSelections: {
              AdministrativeData0: {
                selected: ["MedicaidManagementInformationSystemMMIS"],
              },
            },
            dataSource: ["AdministrativeData"],
            rates: {
              ZCy3XP: [
                {
                  uid: "ZCy3XP.xS5HMm",
                  label: "Ages 3 months to 17 years",
                  rate: "0.0",
                  numerator: "2",
                  denominator: "2",
                },
              ],
            },
          },
          {
            column: "Combined Rate",
            rates: [
              {
                uid: "ZCy3XP.xS5HMm",
                label: "Ages 3 months to 17 years",
                category: "",
                rate: "0.0",
                numerator: "3",
                denominator: "3",
              },
            ],
          },
        ],
        year: "2024",
      },
    },
  },
};

export const useApiMock = ({
  useGetBannerValues = defaultMockValues.useGetBannerValues,
  useDeleteBannerValues = defaultMockValues.useDeleteBannerValues,
  useWriteBannerValues = defaultMockValues.useWriteBannerValues,
  useAddCoreSetValues = defaultMockValues.useAddCoreSetValues,
  useAddMeasureValues = defaultMockValues.useAddMeasureValues,
  useDeleteCoreSetValues = defaultMockValues.useDeleteCoreSetValues,
  useDeleteMeasureValues = defaultMockValues.useDeleteMeasureValues,
  useEditCoreSetValues = defaultMockValues.useEditCoreSetValues,
  useGetCoreSetsValues = defaultMockValues.useGetCoreSetsValues,
  useGetMeasureValues = defaultMockValues.useGetMeasureValues,
  useGetMeasuresValues = defaultMockValues.useGetMeasuresValues,
  useGetRateValues = defaultMockValues.useGetRateValues,
  useUpdateMeasureValues = defaultMockValues.useUpdateMeasureValues,
  useGetReportingYearsValues = defaultMockValues.useGetReportingYearsValues,
}) => {
  (useAddCoreSet as jest.Mock).mockReturnValue({
    ...useAddCoreSetValues,
  });
  (useAddMeasure as jest.Mock).mockReturnValue({
    ...useAddMeasureValues,
  });
  (useDeleteCoreSet as jest.Mock).mockReturnValue({
    ...useDeleteCoreSetValues,
  });
  (useDeleteMeasure as jest.Mock).mockReturnValue({
    ...useDeleteMeasureValues,
  });
  (useEditCoreSet as jest.Mock).mockReturnValue({
    ...useEditCoreSetValues,
  });
  (useGetCoreSet as jest.Mock).mockReturnValue({
    ...useGetCoreSetsValues,
  });
  (useGetCoreSets as jest.Mock).mockReturnValue({
    ...useGetCoreSetsValues,
  });
  (useGetMeasure as jest.Mock).mockReturnValue({
    ...useGetMeasureValues,
  });
  (useGetMeasures as jest.Mock).mockReturnValue({
    ...useGetMeasuresValues,
  });
  (useUpdateMeasure as jest.Mock).mockReturnValue({
    ...useUpdateMeasureValues,
  });
  (useGetRate as jest.Mock).mockReturnValue({
    ...useGetRateValues,
  });
  (useGetReportingYears as jest.Mock).mockReturnValue({
    ...useGetReportingYearsValues,
  });
  (useGetBanner as jest.Mock).mockReturnValue({
    ...useGetBannerValues,
  });
  (useWriteBanner as jest.Mock).mockReturnValue({
    ...useWriteBannerValues,
  });
  (useDeleteBanner as jest.Mock).mockReturnValue({
    ...useDeleteBannerValues,
  });
};
