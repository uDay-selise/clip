import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../app/providers/AuthProvider";
import { blocksClient } from "../../lib/blocks/client";

export type EditorAccess = {
  /** Signed in at all (the hosted sign-in page's session). */
  signedIn: boolean;
  /** Holds the Editor role, so the editors' area opens. */
  isEditor: boolean;
  name: string;
  email: string;
};

export function rolesOf(record: unknown): string[] {
  if (!record || typeof record !== "object") return [];
  const roles = (record as Record<string, unknown>).roles;
  if (Array.isArray(roles)) {
    return roles.flatMap((entry) => (typeof entry === "string" ? [entry] : rolesOf(entry)));
  }
  if (roles && typeof roles === "object") {
    return Object.values(roles as Record<string, unknown>).flatMap((entry) => rolesOf({ roles: entry }));
  }
  return [];
}

async function readEditorAccess(): Promise<EditorAccess> {
  const me = (await blocksClient.iam.me()) as {
    data?: { roles?: unknown; firstName?: string; lastName?: string; email?: string; name?: string };
    roles?: unknown;
  };
  const record = me.data ?? (me as unknown as Record<string, unknown>);
  const roles = rolesOf({ roles: (record as Record<string, unknown>).roles });
  const first = String((record as Record<string, unknown>).firstName ?? "").trim();
  const last = String((record as Record<string, unknown>).lastName ?? "").trim();
  const fullName = `${first} ${last}`.trim();
  const name = fullName || String((record as Record<string, unknown>).name ?? "").trim() || String((record as Record<string, unknown>).email ?? "Editor");
  return {
    signedIn: true,
    isEditor: roles.some((role) => role.toLowerCase() === "editor"),
    name,
    email: String((record as Record<string, unknown>).email ?? "")
  };
}

/** Reads the signed-in person's roles once per session, to gate the editors' area. */
export function useEditorAccess() {
  const { status } = useAuth();
  const client = useQueryClient();
  const query = useQuery({
    enabled: status === "authenticated",
    queryFn: readEditorAccess,
    queryKey: ["editor", "access"],
    staleTime: 60_000
  });
  return { status, access: query.data, isLoading: query.isLoading, refresh: () => client.invalidateQueries({ queryKey: ["editor", "access"] }) };
}
