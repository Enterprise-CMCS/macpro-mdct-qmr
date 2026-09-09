import React from "react";
import "@testing-library/jest-dom";

global.React = React;
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
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
