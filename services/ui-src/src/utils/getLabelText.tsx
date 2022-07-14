export const getLabelText = () => {
  if (window) {
    const { pathname } = window.location;
    const params = pathname.split("/");
    const year = params[2];
    const measure = params[4].replace("-", "");

    const data = require(`../measures/${year}/${measure}/data`);

    return {
      ...data.qualifierLabelsAndText,
      ...data.categoryLabelsAndText,
    };
  }
};

/**
 * Attention
 * Changing the keys of these objects will change how the measure data is shaped and should not be done unless that is the desired result.
 * Changing the values of these objects will change the text that is displayed to the user.
 */

export const foo = {
  AMMAD: {
    qualifierLabelsAndText: {
      "Ages 18 to 64": "Ages 18 to 64 - here is the text i would like displayed",
      "Age 65 and older": "Age 65 and older",
    },
    categoryLabelsAndText: {
      "Effective Acute Phase Treatment": "Effective Acute Phase Treatment - here is some custom text for a category",
      "Effective Continuation Phase Treatment": "Effective Continuation Phase Treatment",
    },
  },
};

/**
 * Brice Haire
 */