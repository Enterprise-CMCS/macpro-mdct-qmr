import {
  useAddCoreSet,
  useDeleteCoreSet,
  useGetCoreSets,
  useGetMeasure,
  useGetMeasures,
  useUpdateMeasure,
} from "hooks/api";

export const defaultMockValues = {
  useAddCoreSet: {
    useMutation: () => {
      mutate: () => {};
    },
  },
  useDeleteCoreSet: { mutate: jest.fn() },
  useGetCoreSets: {
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
  useGetMeasure: {
    data: {
      Item: {
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
  useGetMeasures: {
    isLoading: false,
    error: undefined,
    isError: undefined,
    data: {
      Item: [
        {
          compoundKey: "AL2021ACSIET-AD",
          coreSet: "ACS",
          createdAt: 1642167976771,
          description:
            "Initiation and Engagement of Alochol and Other Drug Abuse or Dependence Treatment",
          lastAltered: 1642167976771,
          measure: "IET-AD",
          state: "AL",
          status: "incomplete",
          year: 2021,
        },
      ],
    },
  },
  useUpdateMeasure: {
    useMutation: () => {
      mutate: () => {};
    },
  },
};

export const useApiMock = (mockValues = defaultMockValues) => {
  (useAddCoreSet as jest.Mock).mockReturnValue({
    ...mockValues.useAddCoreSet,
  });
  (useDeleteCoreSet as jest.Mock).mockReturnValue({
    ...mockValues.useDeleteCoreSet,
  });
  (useGetCoreSets as jest.Mock).mockReturnValue({
    ...mockValues.useGetCoreSets,
  });
  (useGetMeasure as jest.Mock).mockReturnValue({
    ...mockValues.useGetMeasure,
  });
  (useGetMeasures as jest.Mock).mockReturnValue({
    ...mockValues.useGetMeasures,
  });
  (useUpdateMeasure as jest.Mock).mockReturnValue({
    ...mockValues.useUpdateMeasure,
  });
};
