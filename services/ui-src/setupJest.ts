import React from "react";
import "@testing-library/jest-dom";

global.React = React;

// See: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperties(window, {
  // jsdom does not provide a sufficient matchMedia implementation for our needs
  matchMedia: {
    value: jest.fn().mockReturnValue({
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }),
  },
  // jsdom does not provide TextEncoder/TextDecoder until v27.4
  TextEncoder: { value: jest.fn() },
  TextDecoder: { value: jest.fn() },
});

jest.mock("components/Title", () => ({
  Title: () => null,
}));

jest.mock("hooks/api", () => ({
  useAddCoreSet: jest.fn(),
  useAddMeasure: jest.fn(),
  useEditCoreSet: jest.fn(),
  useDeleteCoreSet: jest.fn(),
  useDeleteMeasure: jest.fn(),
  useGetCoreSet: jest.fn(),
  useGetCoreSets: jest.fn(),
  useGetMeasure: jest.fn(),
  useGetMeasures: jest.fn(),
  useGetRate: jest.fn(),
  useUpdateMeasure: jest.fn(),
  useGetReportingYears: jest.fn(),
  useGetBanner: jest.fn(),
  useDeleteBanner: jest.fn(),
  useWriteBanner: jest.fn(),
}));

jest.mock("./src/utils/environmentVariables", () => ({
  MODE: "production",
  BASE_URL: "mdctqmrdev.cms.gov",
}));
