import { blocksClient } from "../../lib/blocks/client";

export type Product = {
  itemId: string;
  name: string;
  description?: string;
  pricePence?: number | string;
  group?: string;
  medicineNote?: string;
  visible?: boolean;
  photoFileId?: string;
  sortOrder?: number;
};

export const PRODUCT_FIELDS = [
  "name",
  "description",
  "pricePence",
  "group",
  "medicineNote",
  "visible",
  "photoFileId",
  "sortOrder"
];

const products = blocksClient.data.collection<Product>("Product", { fields: PRODUCT_FIELDS });

type ListAnswer = {
  data?: { items?: Product[] };
  items?: Product[];
  errors?: unknown;
};

function itemsOf(response: ListAnswer): Product[] {
  return response.data?.items ?? response.items ?? [];
}

/** Every product the team marked visible, lowest sortOrder first, for signed-out shoppers. */
export async function readVisibleProducts(): Promise<Product[]> {
  const response = (await products.list({ pageNo: 1, pageSize: 200 })) as ListAnswer;
  return itemsOf(response)
    .filter((product) => product.visible === true)
    .sort((a, b) => (Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0)));
}

/** Every product, for the editors' area; the screen shows the save's own result. */
export async function readAllProducts(): Promise<Product[]> {
  const response = (await products.list({ pageNo: 1, pageSize: 200 })) as ListAnswer;
  return itemsOf(response).sort((a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0));
}

export function priceInPounds(value: number | string | undefined): string {
  const pence = Number(value ?? 0);
  const safe = Number.isFinite(pence) && pence >= 0 ? Math.round(pence) : 0;
  return `£${(safe / 100).toFixed(2)}`;
}
