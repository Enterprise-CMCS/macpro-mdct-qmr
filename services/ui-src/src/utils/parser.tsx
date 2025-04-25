import React, { JSXElementConstructor, ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Convert labels with HTML tags to JSX elements to be rendered.
 *
 * Doesn't work with `<br>` tags.
 *
 * SECURITY WARNING: Only use this function on input that either
 *  - is trusted code, authored by devs, which can't have been tampered with
 *  - or has been run through DOMPurify, with some very strict settings.
 * Otherwise, it presents similar risks as React's dangerouslySetInnerHTML.
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
      const props = {
        // The random key prevents React warnings in the browser console.
        key: uuidv4(),
        ...attributesOf(node),
      };
      const children = [...node.childNodes].map(convertNodetoReactElement);
      try {
        return React.createElement(tagName, props, children);
      } catch {
        /*
         * Fallback to a bare div if malformed HTML gives nonsensical tag names.
         * This is needed because DOMParser is extremely lenient compared to
         * React's createElement, and we need to handle user-authored HTML.
         */
        return React.createElement("div", { key: uuidv4() }, children);
      }
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
