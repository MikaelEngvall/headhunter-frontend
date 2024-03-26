// Libraries, functions, etc.
import DOMPurify from "dompurify";

/* 
  This component is unused legacy code and is not being called in the code.

  TODO - Either use this component or remove it.
*/

export function htmlCodeDisplay(htmlCode) {
  const sanitizedHtml = DOMPurify.sanitize(htmlCode, {
    ALLOWED_TAGS: ["style"],
  });

  return sanitizedHtml;
}
