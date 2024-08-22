import { IKebabMenuItem } from "components";
import { ReactElement } from "react";
import { CoreSetAbbr } from "types";

export namespace CoreSetTableItem {
  export interface Progress {
    numAvailable: number;
    numComplete: number;
  }

  export enum Type {
    ADULT = "adult",
    CHILD = "child",
    HEALTH_HOME = "health home",
  }

  export enum Status {
    IN_PROGRESS = "in progress",
    NOT_STARTED = "not started",
    COMPLETED = "complete",
    SUBMITTED = "submitted",
  }

  export type Data = {
    coreSet: CoreSetAbbr;
    id: string;
    title: string;
    type: Type;
    progress: Progress;
    submitted: boolean;
    actions: IKebabMenuItem[];
    year: string;
  };
}

export namespace MeasureTableItem {
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
    createdAt: number;
    lastDateModified: number;
    actions: IKebabMenuItem[];
    reporting: string | undefined | null;
    autoCompleted?: boolean;
    mandatory?: boolean;
  };

  export interface StatusTextProps {
    isInProgress: boolean;
    status: Status;
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
