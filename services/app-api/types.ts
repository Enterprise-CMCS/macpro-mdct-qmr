import {
  CoreSetAbbr,
  CoreSetIdentifier,
  MandatoryTag,
  MeasureIdentifier,
} from "@qmr/shared";
import { states } from "./utils/constants/constants";

export interface MeasureMetaData {
  type: "A" | "C" | "H";
  measure: MeasureIdentifier;
  autocompleteOnCreation?: boolean;
  placeholder?: boolean;
  measureType?: MandatoryTag;
  /** For which core sets will the measureType be displayed? */
  typeTagForCoreSets?: CoreSetAbbr[];
  stratificationRequired?: CoreSetAbbr[];
}

export interface RateParameters {
  state: string;
  year: number;
  coreSet: CoreSetIdentifier;
  measure: MeasureIdentifier;
}

/**
 * Abridged copy of the type used by `aws-lambda@1.0.7` (from `@types/aws-lambda@8.10.88`)
 * We only use this one type from the package, and we use only a subset of the
 * properties. Since `aws-lambda` depends on `aws-sdk` (that is, SDK v2),
 * we can save ourselves a big dependency with this small redundancy.
 */
export interface APIGatewayProxyEvent {
  body: string | null;
  headers: EventParameters;
  multiValueHeaders: EventParameters;
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: EventParameters | null;
  queryStringParameters: EventParameters | null;
  multiValueQueryStringParameters: EventParameters | null;
  stageVariables: EventParameters | null;
  /** The context is complicated, and we don't (as of 2023) use it at all. */
  requestContext: any;
  resource: string;
}

export type EventParameters = Record<string, string | undefined>;

export type State = (typeof states)[number];
