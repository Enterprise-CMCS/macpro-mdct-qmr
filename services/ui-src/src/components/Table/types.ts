import { ReactElement } from "react";

export namespace CoreSet {
  export interface Progress {
    numAvailable: number;
    numComplete: number;
  }

  export enum Type {
    ADULT = "adult",
    CHILD = "child",
    HEALTH_HOMES = "health homes",
  }

  export enum Status {
    IN_PROGRESS = "in progress",
    NOT_STARTED = "not started",
    COMPLETED = "complete",
    SUBMITTED = "submitted",
  }

  export type Data = {
    id: string;
    path: string;
    title: string;
    type: Type;
    progress: Progress;
    submitted: boolean;
    actions: string;
    year: string;
  };
}

export namespace Measure {
  export enum Status {
    IN_PROGRESS = "in progress",
    NOT_STARTED = "not started",
    COMPLETED = "complete",
  }

  export type Data = {
    id: string;
    path: string;
    abbr: string;
    title: string;
    rateComplete: number;
    lastDateModified: string;
    actions: string;
    year: string;
  };
}

export type TableData<T> = T;

export interface TableColumn<T> {
  header?: string;
  id: string;
  styleProps?: Record<string, string>;
  cell: (data: T) => ReactElement;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: TableData<T>[];
}
