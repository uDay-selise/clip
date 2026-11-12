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

export type ProductInput = {
  name: string;
  description?: string;
  pricePence: number;
  group?: string;
  medicineNote?: string;
  visible: boolean;
  photoFileId?: string;
  sortOrder: number;
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

type WriteAnswer = {
  errors?: unknown;
  message?: string;
  acknowledged?: boolean;
  isSuccess?: boolean;
};

function itemsOf(response: ListAnswer): Product[] {
  return response.data?.items ?? response.items ?? [];
}

function byOrder(a: Product, b: Product): number {
  return Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0);
}

/** Every product the team marked visible, lowest sortOrder first, for signed-out shoppers. */
export async function readVisibleProducts(): Promise<Product[]> {
  const response = (await products.list({ pageNo: 1, pageSize: 200 })) as ListAnswer;
  return itemsOf(response)
    .filter((product) => product.visible === true)
    .sort(byOrder);
}

/** Every product, for the editors' area. */
export async function readAllProducts(): Promise<Product[]> {
  const response = (await products.list({ pageNo: 1, pageSize: 200 })) as ListAnswer;
  return itemsOf(response).sort(byOrder);
}

export function priceInPounds(value: number | string | undefined): string {
  const pence = Number(value ?? 0);
  const safe = Number.isFinite(pence) && pence >= 0 ? Math.round(pence) : 0;
  return `£${(safe / 100).toFixed(2)}`;
}

/** "12.50" or "£12.50" typed by an editor becomes whole pence. */
export function penceFromPounds(value: string): number | undefined {
  const cleaned = value.replace(/[£,\s]/g, "");
  if (!/^\d+(\.\d{0,2})?$/.test(cleaned)) return undefined;
  const [pounds = "0", pence = ""] = cleaned.split(".");
  return Number(pounds) * 100 + Number(pence.padEnd(2, "0"));
}

export function poundsFromPence(value: number | string | undefined): string {
  const pence = Number(value ?? 0);
  return (Number.isFinite(pence) ? pence / 100 : 0).toFixed(2);
}

/** What the gateway said when it refused a save, or an empty word when the save went through. */
export function productError(answer: unknown, fallback: string): string {
  const body = answer as WriteAnswer | undefined;
  const errors = body?.errors;
  let reason = "";
  if (Array.isArray(errors)) reason = errors.map(String).join(", ");
  else if (errors && typeof errors === "object") reason = Object.values(errors as Record<string, unknown>).map(String).join(", ");
  else if (typeof errors === "string") reason = errors;
  if (reason) return reason;
  if (body?.acknowledged === false || body?.isSuccess === false) return body?.message || fallback;
  return "";
}

/** A data call can answer 200 and still refuse: the reason lands in `errors`. */
function throwIfRefused(answer: unknown, fallback: string): void {
  const reason = productError(answer, fallback);
  if (reason) throw new Error(reason);
}

export async function createProduct(input: ProductInput): Promise<void> {
  throwIfRefused(await products.create(input), "The product could not be saved.");
}

export async function updateProduct(itemId: string, input: ProductInput): Promise<void> {
  throwIfRefused(await products.update(itemId, input), "The product could not be saved.");
}

export async function setProductVisible(itemId: string, visible: boolean): Promise<void> {
  throwIfRefused(await products.update(itemId, { visible }), "The change could not be saved.");
}

export async function removeProduct(itemId: string): Promise<void> {
  throwIfRefused(await products.delete(itemId), "The product could not be removed.");
}
