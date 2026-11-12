import { useQuery } from "@tanstack/react-query";
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

const FIELDS = ["pageKey", "heading", "intro", "deliveryText", "returnsText", "email", "phone", "address"];

const pageWordings = blocksClient.data.collection<PageWording>("PageWording", { fields: FIELDS });

export async function readPageWording(pageKey: string): Promise<PageWording | undefined> {
  const response = (await pageWordings.list({ filter: { pageKey }, pageNo: 1, pageSize: 1 })) as {
    data?: { items?: PageWording[] };
    items?: PageWording[];
  };
  return (response.data?.items ?? response.items ?? [])[0];
}

export function usePageWording(pageKey: string) {
  return useQuery({
    // A temporary fallback: a read the gateway refuses must not leave a visitor page blank.
    placeholderData: STARTER_WORDING[pageKey],
    queryKey: ["pageWording", pageKey],
    queryFn: () => readPageWording(pageKey)
  });
}

/** The shop's own words for each page, shown while the team has written none. */
const STARTER_WORDING: Record<string, PageWording> = {
  home: { itemId: "starter-home", pageKey: "home" },
  "how-it-works": { itemId: "starter-how-it-works", pageKey: "how-it-works" },
  about: { itemId: "starter-about", pageKey: "about" },
  contact: { itemId: "starter-contact", pageKey: "contact" }
};
