import React from "react";
import "@testing-library/jest-dom";

global.React = React;

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
  useUpdateMeasure: jest.fn(),
  useGetReportingYears: jest.fn(),
}));
