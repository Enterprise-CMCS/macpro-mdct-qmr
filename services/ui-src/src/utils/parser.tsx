import React from "react";
import { v4 as uuidv4 } from "uuid";

//convert labels with html tags to JSX elements to be rendered
export const parseLabelToHTML = (label: string) => {
  const parseLabel = new DOMParser().parseFromString(label, "text/html").body;

  let renderArr: (
    | string
    | React.DOMElement<React.DOMAttributes<Element>, Element>
    | null
  )[] = [];
  parseLabel.childNodes.forEach((node: ChildNode) => {
    //if the node has a nodeValue, it is probably a string and we can just push the value to the array
    if (node.nodeValue) {
      renderArr.push((node as Element).nodeValue);
    } else {
      //if this is no nodeValue, its a tag so retrieve the tag name
      const tag = (node as Element).tagName.toLowerCase();
      //create a react element with a random key to prevent browser warning
      const reactElement = React.createElement(
        tag,
        { key: uuidv4() },
        node.textContent
      );
      renderArr.push(reactElement);
    }
  });
  return <>{renderArr}</>;
};
