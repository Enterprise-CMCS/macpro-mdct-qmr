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
