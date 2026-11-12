import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blocksClient } from "../../lib/blocks/client";
import { useT } from "../../lib/i18n/LocalizationProvider";

type EditorPerson = { itemId?: string; email?: string; firstName?: string; lastName?: string };

function reasonOf(answer: unknown): string {
  const body = answer as { errors?: unknown; message?: string } | undefined;
  if (!body) return "";
  if (Array.isArray(body.errors) && body.errors.length > 0) return body.errors.map(String).join(", ");
  if (body.errors && typeof body.errors === "object") {
    const joined = Object.values(body.errors as Record<string, unknown>).map(String).join(", ");
    if (joined) return joined;
  }
  return body.message ?? "";
}

async function readEditors(): Promise<{ people: EditorPerson[]; refused: boolean }> {
  try {
    const answer = (await blocksClient.iam.users.list({ pageNo: 1, pageSize: 100 })) as {
      data?: EditorPerson[];
      items?: EditorPerson[];
      errors?: unknown;
    };
    return { people: answer.data ?? answer.items ?? [], refused: false };
  } catch (error) {
    console.error("Could not read the editors", error);
    return { people: [], refused: true };
  }
}

async function inviteEditor(email: string): Promise<void> {
  const answer = (await blocksClient.iam.users.create({ email, roles: ["editor"] })) as {
    errors?: unknown;
    acknowledged?: boolean;
    isSuccess?: boolean;
  };
  const reason = reasonOf(answer);
  if (reason || answer?.acknowledged === false || answer?.isSuccess === false) {
    throw new Error(reason || "The invite was refused.");
  }
}

/** Adds a new editor by email address, giving them the Editor role so the invite link starts their account. */
export function EditorsPanel({ editorName }: { editorName: string }) {
  const { t } = useT();
  const client = useQueryClient();
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);
  const [failed, setFailed] = useState("");
  const { data, isLoading } = useQuery({ queryKey: ["editor", "people"], queryFn: readEditors });

  const invite = useMutation({
    mutationFn: inviteEditor,
    onError: (error) => {
      console.error("Could not invite the editor", error);
      setFailed(t("editor.inviteFailed"));
      setSaved(false);
    },
    onSuccess: () => {
      setFailed("");
      setSaved(true);
      setEmail("");
      void client.invalidateQueries({ queryKey: ["editor", "people"] });
    }
  });

  function submit(event: FormEvent) {
    event.preventDefault();
    const address = email.trim();
    if (!address) {
      setFailed(t("editor.inviteNeedsEmail"));
      setSaved(false);
      return;
    }
    invite.mutate(address);
  }

  const people = data?.people ?? [];

  return (
    <section className="ed-sec">
      <div className="ed-sec-head">
        <h2>{t("editor.editorsHeading")}</h2>
        <p>{t("editor.editorsNote")}</p>
      </div>
      {failed ? <div className="ds-notice ds-notice-error"><span role="alert">{failed}</span></div> : null}
      {saved ? <div className="ds-notice ds-notice-success"><span>{t("editor.inviteSent")}</span></div> : null}
      <div className="ed-cols">
        <div className="ds-table-card">
          <div className="ds-table-wrap">
            <table className="ds-table ds-table-compact">
              <thead>
                <tr>
                  <th scope="col">{t("editor.colEditor")}</th>
                  <th scope="col">{t("editor.colEmail")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>{editorName}</b></td>
                  <td>
                    <span className="ds-badge ds-badge-quiet">{t("editor.you")}</span>
                  </td>
                </tr>
                {people.map((person, index) => (
                  <tr key={person.itemId ?? person.email ?? index}>
                    <td>{`${person.firstName ?? ""} ${person.lastName ?? ""}`.trim() || t("editor.invited")}</td>
                    <td>{person.email ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data?.refused ? <div className="ds-table-card-foot"><span className="ds-muted">{t("editor.peopleFailed")}</span></div> : null}
          {!isLoading && !data?.refused && people.length === 0 ? (
            <div className="ds-table-card-foot"><span className="ds-muted">{t("editor.noOtherEditors")}</span></div>
          ) : null}
        </div>
        <div className="ds-card ed-form-card">
          <span className="ds-label-caps">{t("editor.inviteLabel")}</span>
          <h2>{t("editor.inviteHeading")}</h2>
          <p>{t("editor.inviteNote")}</p>
          <form className="ds-form" onSubmit={submit}>
            <div className="ds-field">
              <label className="ds-label" htmlFor="invite-email">{t("editor.inviteEmailLabel")}</label>
              <input
                className="ds-input"
                id="invite-email"
                type="email"
                required
                value={email}
                placeholder={t("editor.invitePlaceholder")}
                onChange={(event) => setEmail(event.target.value)}
              />
              <p className="ds-hint">{t("editor.inviteHint")}</p>
            </div>
            <div className="ds-form-actions">
              <button type="submit" className="ds-btn" disabled={invite.isPending} aria-busy={invite.isPending}>
                {invite.isPending ? t("editor.inviting") : t("editor.inviteAction")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
