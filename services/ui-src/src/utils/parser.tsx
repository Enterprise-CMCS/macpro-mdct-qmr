import React from "react";
import { v4 as uuidv4 } from "uuid";

//creating a react element from html elements
const reactElement = (element: Element, reactElements?: any) => {
  //create a react element with a random key to prevent browser warning
  return React.createElement(
    element.tagName.toLowerCase(),
    { key: uuidv4() },
    reactElements ?? element.innerHTML
  );
};

//recusively look through html elements and convert any tags to react elements
const convertToReactElement = (element: Element) => {
  if (
    element.childNodes.length === 1 &&
    element.childNodes[0] instanceof Text
  ) {
    return reactElement(element);
  } else {
    let reactElements: any = [];
    element.childNodes.forEach((node: ChildNode) => {
      reactElements.push(convertToReactElement(node as Element));
    });
    return reactElement(element, reactElements);
  }
};

//convert labels with html tags to JSX elements to be rendered, doesn't work with <br> tags
export const parseLabelToHTML = (label: string) => {
  const parseLabel = new DOMParser().parseFromString(label, "text/html").body;
  let renderArr: (
    | string
    | React.DOMElement<React.DOMAttributes<Element>, Element>
    | null
  )[] = [];
  parseLabel.childNodes.forEach((node: ChildNode) => {
    if (node instanceof Text) {
      renderArr.push(node.textContent);
    } else if (node instanceof Element) {
      //convert any tags and inner tags into react elements
      renderArr.push(convertToReactElement(node));
    } else {
      // throw new Error("Unrecognized node type in label:\n" + label);
      throw new Error("Unrecognized node type in label:\n" + label);
    }
  });
  return <>{renderArr}</>;
};
