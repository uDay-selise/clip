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
    queryKey: ["pageWording", pageKey],
    queryFn: () => readPageWording(pageKey)
  });
}
