import React, { JSXElementConstructor, ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

/*
 * Convert labels with HTML tags to JSX elements to be rendered.
 *
 * Doesn't work with `<br>` tags.
 */
export const parseLabelToHTML = (label: string) => {
  const attributesOf = (element: Element) => {
    return Object.fromEntries(
      [...element.attributes].map((attr) => [attr.name, attr.value])
    );
  };

  const convertNodetoReactElement = (node: Node): StringOrElement => {
    if (node instanceof Text) {
      // Text nodes always have textContent.
      return node.textContent!;
    } else if (node instanceof Element) {
      const tagName = node.tagName.toLowerCase();

      if (tagName.includes("<") || tagName.includes(">")) return tagName;

      const props = {
        // The random key prevents browser warnings.
        key: uuidv4(),
        ...attributesOf(node),
      };
      const children = [...node.childNodes].map(convertNodetoReactElement);
      return React.createElement(tagName, props, children);
    } else {
      throw new Error(`Unrecognized node type in label:\n${label}`);
    }
  };

  const body = new DOMParser().parseFromString(label, "text/html").body;
  const elements = [...body.childNodes].map(convertNodetoReactElement);
  return <>{elements}</>;
};

type StringOrElement =
  | string
  | ReactElement<Record<string, any>, string | JSXElementConstructor<any>>;
