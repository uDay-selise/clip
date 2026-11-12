import { blocksClient } from "../../lib/blocks/client";

const CONFIGURATION = "Default";
const MODULE_NAME = 8;

export type PhotoLink = { fileId: string; url: string };

type PresignAnswer = {
  uploadUrl?: string;
  fileId?: string;
  requiredHeaders?: Record<string, string>;
  uploadCompletionRequired?: boolean;
  errors?: unknown;
  isSuccess?: boolean;
};

function reasonOf(answer: unknown): string {
  const errors = (answer as PresignAnswer | undefined)?.errors;
  if (!errors) return "";
  if (typeof errors === "string") return errors;
  return Object.values(errors as Record<string, unknown>).map(String).join(", ");
}

/** Uploads a product photo to Blocks Storage and answers the file id the product record keeps. */
export async function uploadProductPhoto(file: File): Promise<string> {
  const answer = (await blocksClient.data.files.presignedUploadUrl({
    accessModifier: "Public",
    configurationName: CONFIGURATION,
    contentType: file.type || "application/octet-stream",
    moduleName: MODULE_NAME,
    name: safeName(file.name),
    parentDirectoryId: ""
  })) as PresignAnswer;

  const reason = reasonOf(answer);
  if (reason || !answer?.uploadUrl || !answer.fileId || answer.isSuccess === false) {
    throw new Error(reason || "The photo could not be uploaded.");
  }
  if (answer.uploadCompletionRequired) {
    throw new Error("This storage asks for a finishing step the app cannot send yet.");
  }

  await blocksClient.data.files.uploadToUrl({
    body: file,
    contentType: file.type || "application/octet-stream",
    headers: { ...(answer.requiredHeaders ?? {}) },
    url: answer.uploadUrl
  });

  return answer.fileId;
}

function safeName(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9._-]/g, "-").slice(-80);
  return cleaned.includes(".") ? cleaned : `${cleaned || "photo"}.jpg`;
}

/** The address a stored photo is shown from, read through the storage SDK. */
export async function photoLink(fileId: string): Promise<string | undefined> {
  const answer = (await blocksClient.data.files.get(fileId, { configurationName: CONFIGURATION })) as {
    downloadUrl?: string;
    url?: string;
    data?: { downloadUrl?: string; url?: string };
  };
  return answer?.data?.downloadUrl ?? answer?.downloadUrl ?? answer?.data?.url ?? answer?.url;
}
