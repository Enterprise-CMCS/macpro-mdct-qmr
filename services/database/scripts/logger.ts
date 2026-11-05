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
    (...params: any[]) => {
      const [message, ...rest] = params;
      console[level](addTimestamp(message ?? ""), ...rest);
    },
  ])
) as Pick<typeof console, (typeof levels)[number]>;
