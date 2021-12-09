import handler from "./../libs/handler-lib";

export const main = handler(async (event, context) => {
  console.log("our api got hit");
});

export const createCoreSet = handler(async (event, context) => {
  return event;
});
