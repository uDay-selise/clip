import { useQuery, useQueryClient } from "@tanstack/react-query";
import { blocksClient } from "../../lib/blocks/client";

export type PageWording = {
  itemId: string;
  pageKey: string;
  heading?: string;
  intro?: string;
  deliveryText?: string;
  returnsText?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export type WordFields = Pick<PageWording, "heading" | "intro" | "deliveryText" | "returnsText" | "email" | "phone" | "address">;

const FIELDS = ["pageKey", "heading", "intro", "deliveryText", "returnsText", "email", "phone", "address"];

const pageWordings = blocksClient.data.collection<PageWording>("PageWording", { fields: FIELDS });

type ListAnswer = {
  data?: { items?: PageWording[] };
  items?: PageWording[];
};

type WriteAnswer = {
  errors?: unknown;
  message?: string;
  acknowledged?: boolean;
  isSuccess?: boolean;
};

export async function readPageWording(pageKey: string): Promise<PageWording | undefined> {
  const response = (await pageWordings.list({ filter: { pageKey }, pageNo: 1, pageSize: 1 })) as ListAnswer;
  return (response.data?.items ?? response.items ?? [])[0];
}

export function usePageWording(pageKey: string) {
  return useQuery({
    // A temporary fallback: a read the gateway refuses must not leave a visitor page blank.
    placeholderData: SHOP_WORDING[pageKey],
    queryKey: ["pageWording", pageKey],
    queryFn: () => readPageWording(pageKey)
  });
}

export function usePageWordingWrites() {
  const client = useQueryClient();
  return {
    saved: () => client.invalidateQueries({ queryKey: ["pageWording"] })
  };
}

/** Saves the page's words. A record that was never written is added, one that exists is changed. */
export async function savePageWording(pageKey: string, existing: PageWording | undefined, fields: WordFields): Promise<void> {
  const answer = existing?.itemId && !existing.itemId.startsWith("shop-default-")
    ? await pageWordings.update(existing.itemId, fields)
    : await pageWordings.create({ pageKey, ...fields });
  const reason = refusalOf(answer);
  if (reason) throw new Error(reason);
}

/** The shop's own words for each page, shown while the team has written none. */
const SHOP_WORDING: Record<string, PageWording> = {
  home: { itemId: "shop-default-home", pageKey: "home" },
  "how-it-works": { itemId: "shop-default-how-it-works", pageKey: "how-it-works" },
  about: { itemId: "shop-default-about", pageKey: "about" },
  contact: { itemId: "shop-default-contact", pageKey: "contact" }
};

function refusalOf(answer: unknown): string {
  const body = answer as WriteAnswer | undefined;
  const errors = body?.errors;
  let reason = "";
  if (Array.isArray(errors)) reason = errors.map(String).join(", ");
  else if (errors && typeof errors === "object") reason = Object.values(errors as Record<string, unknown>).map(String).join(", ");
  else if (typeof errors === "string") reason = errors;
  if (reason) return reason;
  if (body?.acknowledged === false || body?.isSuccess === false) return body?.message || "The words could not be saved.";
  return "";
}
