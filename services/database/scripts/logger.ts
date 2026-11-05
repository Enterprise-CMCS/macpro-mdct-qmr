const dateFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  fractionalSecondDigits: 3,
});

const addTimestamp = (message: string) =>
  `${dateFormatter.format(new Date())} | ${message}`;

const levels = ["trace", "debug", "log", "info", "warn", "error"] as const;

/**
 * Stand-in for `console`, to prefix messages with a timestamp.
 * @example
 * console.log("Hello");
 * // Hello
 *
 * timestampedLogger.log("Hello");
 * // 12:40:54 | Hello
 */
export const logger = Object.fromEntries(
  levels.map((level) => [
    level,
    (message: string) => console[level](addTimestamp(message)),
  ])
) as Record<(typeof levels)[number], (message: string) => void>;
