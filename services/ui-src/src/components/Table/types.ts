import { IKebabMenuItem } from "components";
import { ReactElement } from "react";

export namespace CoreSetTableItem {
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
    actions: IKebabMenuItem[];
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
    actions: IKebabMenuItem[];
    isReporting: boolean | null;
  };

  export interface StatusTextProps {
    isInProgress: boolean;
    status: Measure.Status;
    isComplete: boolean | null;
    date: string | null;
    rateComplete: number;
  }
}

export interface TableData {
  id: string;
}

export interface TableColumn<T> {
  header?: string;
  id: string;
  styleProps?: Record<string, string>;
  cell: (data: T) => ReactElement;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}
