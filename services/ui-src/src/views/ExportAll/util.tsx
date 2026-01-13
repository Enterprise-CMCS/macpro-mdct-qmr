import { SPA } from "libs/spaLib";
import { getPDF } from "libs/api";
import { gzip } from "pako";

interface HookProps {
  coreSetId?: string;
  state?: string;
  year?: string;
}

export const openPdf = (basePdf: string) => {
  let byteCharacters = atob(basePdf);
  let byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  let byteArray = new Uint8Array(byteNumbers);
  let file = new Blob([byteArray], { type: "application/pdf;base64" });
  let fileURL = URL.createObjectURL(file);
  window.open(fileURL);
};

/**
 * Gather all emotion css available and clone the css styles to ensure availability for princexml
 */
export const cloneEmotionStyles = (): HTMLStyleElement[] => {
  const tags = [];

  // gather all styles
  const cssRules = [];
  for (let i = 0; i < document.styleSheets.length; i++) {
    if (!document.styleSheets[i].href) {
      let ruleString = "";
      const rules = document.styleSheets[i]?.cssRules ?? [];
      const numberOfRules = rules.length;
      for (let s = 0; s < numberOfRules; s++) {
        ruleString =
          ruleString +
          rules[s].cssText
            .replace(/text-align: right/g, "text-align: center")
            .replace(/display:\s*flex;/g, "display: block;") +
          "\n";
      }
      if (!ruleString.includes(":root")) {
        cssRules.push(ruleString);
      }
    }
  }

  // apply styles to style tags within body
  for (const rule of cssRules) {
    const styleTag = document.createElement("style");
    document.body.appendChild(styleTag);
    styleTag.appendChild(document.createTextNode(rule));
    tags.push(styleTag);
  }

  return tags;
};

/**
 * Apply any tweaks or prince specific css to the document
 */
export const applyPrinceSpecificCss = (): HTMLStyleElement => {
  // any additional css to adjust page
  const styleTag = document.createElement("style");
  document.body.prepend(styleTag);
  styleTag.appendChild(
    document.createTextNode(
      // any page definition edits for prince can be placed here
      // or misc prince css that only applies in the pdf
      `
    ${/* Globaly applied tag css */ ""}
    @page {}
    table { table-layout:fixed; width: 100%}
    html, body, #root { height: 100%; font-size: 16px; }
    button { display: none !important; visiblity: hidden; }
    td { overflow-wrap: break-word; word-wrap:break-word; white-space: normal; }
    * { box-decoration-break: slice !important; box-sizing: border-box !important; }
    input { padding: 10px 10px 10px 10px !important; min-width: fit-content; word-wrap:break-word; white-space: normal; }
    
    ${/* Adjusted specific component css */ ""}
    .logos { width: 90px; }
    .medicaid-logo { width: 170px; }
    .prince-full-width { width: 100% }
    .prince-logo-smaller-sizing { width: 60px; }
    .prince-flex-overwrite { display: flex !important; }
    .prince-supp-text { margin-bottom: 15px !important; }
    .prince-audit-padding { padding: var(--chakra-space-5); }
    .prince-file-item { margin: 10px 0 0 0; padding: 6px 0; }
    .prince-measure-wrapper-box { page-break-before: always; }
    .prince-option-label-text { margin: 0 0 0 20px !important; }
    .prince-input-bottom-spacer { margin-bottom: 10px !important; }
    .hidden-print-items { visibility: hidden; display: none !important; }
    .prince-option-label-wrapper { margin-top: 10px; margin: 0 0 10px 0 !important; }
    .chakra-radio__control, .chakra-checkbox__control { vertical-align: middle !important; }
    .prince-logo-footer { flex-wrap: nowrap; align-content: flex-start; align-items: flex-start; }
    .prince-footer-smaller-text { font-size: var(--chakra-fontSizes-xs); text-align: left; max-width: 100% }
    .prince-flex-row-overwrite { display: flex; flex-direction: row; flex-wrap: nowrap; max-width: 100% !important; margin: 0 0 0 10px }
    .prince-upload-wrapper { text-align: center; display: flex !important; align-content: center; align-items: center; page-break-inside: avoid; }
    .prince-top-link, .prince-supp-text, h1 { margin: auto !important; text-align: center !important; width: fitcontent !important; margin: 10px 0 !important; }
    .prince-upload-wrapper, .prince-file-item { border: 3px !important; border-style: dotted; background-color: var(--chakra-colors-blue-100); border-radius: var(--chakra-radii-md) }
    .replaced-text-area {border-radius: var(--chakra-radii-md); border-width: 1px; border-style: solid; border-color: inherit; padding: 15px; box-sizing: border-box; white-space: pre-wrap;}
    
    
    ${
      /* ******* Prince doesn't support certain css elements like background colors or css grid out of the box. we have to brute force those styles here.
      IMPORTANT NOTE: If there is a display regression, it's probably because these classes changed due to chakra updates or other unknowns.
      It can easily be fixed by inspecting the elements on the pdf page in the browser and grabbing the css class names from there. 
      ********* */ ""
    }
    .chakra-button { background: var(--chakra-colors-gray-100) !important; margin: 16px 8px }
    .chakra-link { color: var(--chakra-colors-blue-600) !important; }
    .chakra-link * { color: blue !important; }
    
    ${
      /* On line 61 of this file, we are replacing text-align: right with text-align: center.
      There are few places where we don't want to do this so we are overriding those styles below for some inputs.
      The classes below are targeting the core set qualifiers Delivery System percentage inputs and elements inside the inputs
      css-xumdn4 is the main Delivery System percentage input element. 
      css-10xl6g is the number inside the input, and css-wgu2i7 is the total percentage number
      */ ""
    }
    .css-xumdn4 { padding-right: 16px !important }
    .css-10xl6g, .css-wgu2i7 { text-align: right !important; padding-right: 35px !important; }
    
    ${
      /* The below css classes are targeting icons in inputs need to have display: flex (that display is getting removed on line 61) */ ""
    }
    .css-11pdqhs, .css-1nqqbdv { display: flex !important }
    
    ${
      /* These css classes are targeting the numerator, denominator, rate inputs. These need to have display: flex and other css styles to look correct */ ""
    }
    .css-1qqj5ri { display: flex !important; flex-direction: row !important; width: 100% !important }
    .css-1kxonj9 { margin-left: 0px !important; margin-top: 0px !important; padding: 8px !important; }
    
    ${
      /* These ds-c css classes are targeting the warning box for other data source */ ""
    }
    .ds-c-alert--warn { display: inline-flex !important; background-color: #fef9e9 !important }
    .ds-c-alert__icon { font-size: 16px !important; height: 24px !important; width: 24px !important }
  `
    )
  );
  return styleTag;
};

/**
 * Last minute css and non-standard character cleanup to prep html for prince request
 * Also removes hidden/offscreen elements and minifies the HTML string.
 */
export const htmlStringCleanup = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const nodesToRemove = doc.querySelectorAll(
    `.hidden-print-items, [style*="display: none"], [style*="visibility: hidden"], script, noscript`
  );
  for (let node of nodesToRemove) {
    node.remove();
  }

  // Remove HTML comments
  const removeComments = (node: Node) => {
    for (let i = node.childNodes.length - 1; i >= 0; i--) {
      const child = node.childNodes[i];
      if (child.nodeType === Node.COMMENT_NODE) {
        node.removeChild(child);
      } else if (child.childNodes.length > 0) {
        removeComments(child);
      }
    }
  };
  removeComments(doc);

  // Remove CSS comments
  const styleTags = doc.querySelectorAll("style");
  for (let i = 0; i < styleTags.length; i += 1) {
    const style = styleTags[i];
    /*
     * Currently, our tsconfig targets es5, which doesn't support the `s` flag
     * on regular expressions. But this code runs on modern browsers, which do.
     * TS includes the `s` in its compiled output, but complains.
     * TODO: Once we bump our TS target to ES2018 or later, delete this comment.
     */
    // @ts-ignore
    style.innerHTML = style.innerHTML.replace(/\/\*.*?\*\//gs, "");
  }

  html = doc.body.innerHTML;

  // fixing non standard characters and minifying
  let htmlString = html
    // fix broken assets and links
    .replace(/src="\/assets/g, `src="https://${window.location.host}/assets`)
    .replace(/src="\/footer/g, `src="https://${window.location.host}/footer`)
    // non standard character fixing
    .replaceAll(`’`, `'`)
    .replaceAll(`‘`, `'`)
    .replaceAll(`”`, `"`)
    .replaceAll(`“`, `"`)
    .replaceAll("\u2013", "-")
    .replaceAll("\u2014", "-")
    // can't have flex/inline be sub-children of block components
    .replaceAll(" flex;", " block;")
    .replaceAll(" inline;", " block;")
    // fix text ares whose sizing will not match
    .replace(
      /<textarea[^>]*tabindex="-1"[^>]*>/g,
      '<p class="hidden-print-items">'
    )
    .replace(/<textarea[^>]*>/g, '<p class="chakra-text replaced-text-area">')
    .replace(/<\/textarea>/g, "</p>")
    // minify: remove extra whitespace between tags
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ");

  return htmlString;
};

/**
 * Retrieve this core-set's SPA ID/Name if applicable
 */
export const getSpaName = ({ coreSetId, state, year }: HookProps) => {
  if (!coreSetId || !state || !year) {
    return undefined;
  }
  if (!coreSetId.includes("_") || !(year in SPA)) {
    return undefined;
  }

  const spaId = coreSetId.split("_")[1];
  const spa = SPA[year].find((s) => s.id === spaId && s.state === state);
  if (!spa) {
    return undefined;
  }

  return `${spa.state} ${spa.id} - ${spa.name}`;
};

function uint8ToString(uint8: Uint8Array) {
  let result = "";
  for (let i = 0; i < uint8.length; i++) {
    result += String.fromCharCode(uint8[i]);
  }
  return result;
}

export async function generatePDF(
  state: string,
  year: string,
  coreSetId: string
) {
  // css adjustment
  const tagsToDelete = [];
  tagsToDelete.push(...cloneEmotionStyles());
  tagsToDelete.push(applyPrinceSpecificCss());

  const html = document.querySelector("html")!;

  // add <base> to treat relative URLs as absolute
  const base = document.createElement("base");
  base.href = `https://${window.location.host}`;
  document.querySelector("head")!.prepend(base);

  const htmlString = htmlStringCleanup(html.outerHTML);
  const gzipped = gzip(htmlString);
  const base64String = btoa(uint8ToString(gzipped));

  // clean up of styles to not break page layout
  for (const tag of tagsToDelete) {
    document.body.removeChild(tag);
  }

  const pdf = await getPDF({
    state,
    year,
    coreSet: coreSetId,
    body: base64String,
  });
  openPdf(pdf);
}
