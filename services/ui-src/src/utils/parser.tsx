import React, { JSXElementConstructor, ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Convert labels with HTML tags to JSX elements to be rendered.
 *
 * Doesn't work with `<br>` tags.
 */
export const parseLabelToHTML = (label: string): React.ReactElement => {
  const attributesOf = (element: Element) => {
    const attributes: { [key: string]: string | React.CSSProperties } = {};

    [...element.attributes].forEach((attr) => {
      if (attr.name === "style") {
        attributes.style = parseStyleString(attr.value);
      } else {
        attributes[attr.name] = attr.value;
      }
    });

    return attributes;
  };

  const parseStyleString = (styleString: string): React.CSSProperties => {
    return styleString
      .split(";")
      .reduce((styleObj: React.CSSProperties, styleProp) => {
        const [property, value] = styleProp.split(":");
        if (property && value) {
          const camelCaseProperty = property
            .trim()
            .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
          styleObj[camelCaseProperty] = value.trim() as any; // Use 'any' to bypass type checking for values
        }
        return styleObj;
      }, {});
  };

  const convertNodetoReactElement = (node: Node): StringOrElement => {
    if (node instanceof Text) {
      // Text nodes always have textContent.
      return node.textContent!;
    } else if (node instanceof Element) {
      const tagName = node.tagName.toLowerCase();
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
