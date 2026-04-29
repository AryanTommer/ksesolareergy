import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p", "br", "strong", "em", "u", "s", "a", "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "blockquote", "code", "pre"
];

const allowedAttributes: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
  "*": ["class"],
};

const serverSanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags,
  allowedAttributes,
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        target: "_blank",
        rel: "noopener noreferrer",
      },
    }),
  },
};

export function sanitizeRichText(html: string): string {
  if (!html || typeof html !== "string") return "";
  return sanitizeHtml(html, serverSanitizeOptions);
}

export function stripHtml(html: string): string {
  if (!html || typeof html !== "string") return "";
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trim() + "…";
}

export function generateExcerpt(html: string, maxLength = 300): string {
  const plainText = stripHtml(html);
  return truncateText(plainText, maxLength);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
