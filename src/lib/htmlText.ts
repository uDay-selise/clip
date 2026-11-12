const ENTITIES: Record<string, string> = { amp: "&", apos: "'", quot: "\"", lt: "<", gt: ">", "#x27": "'", "#39": "'" };

/** Turns rendered markup into the words a visitor reads, for the app's own render checks. */
export function htmlText(markup: string): string {
  return markup
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&(amp|apos|quot|lt|gt);/g, (_, name) => ENTITIES[name] ?? "")
    .replace(/\s+/g, " ")
    .trim();
}
