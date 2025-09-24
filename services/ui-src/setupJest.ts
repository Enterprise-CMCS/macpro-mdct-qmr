import React from "react";
import "@testing-library/jest-dom";
import { mockFlags, resetLDMocks } from "jest-launchdarkly-mock";
import { TextEncoder } from "util";

Object.assign(global, { TextEncoder });

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
jest.retryTimes(3);

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

/* Mock LaunchDarkly (see https://bit.ly/3QAeS7j) */
export const mockLDFlags = {
  setDefault: (baseline: any) => mockFlags(baseline),
  clear: resetLDMocks,
  set: mockFlags,
};
