"use client";

import DOMPurify from "isomorphic-dompurify";

const purifyConfig: DOMPurify.Config = {
  ALLOWED_TAGS: [
    "p", "br", "strong", "em", "u", "s", "a", "ul", "ol", "li",
    "h1", "h2", "h3", "h4", "blockquote", "code", "pre"
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "class"],
  ALLOW_DATA_ATTR: false,
  ADD_ATTR: ["target"],
};

export function sanitizeClientHtml(html: string): string {
  if (!html || typeof html !== "string") return "";
  return DOMPurify.sanitize(html, purifyConfig);
}

export function createSafeHtml(html: string): { __html: string } {
  return { __html: sanitizeClientHtml(html) };
}
