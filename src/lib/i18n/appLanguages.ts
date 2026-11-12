import { useEffect, useState } from "react";
import { blocksClient } from "../../lib/blocks/client";

export type AppLanguage = { code: string; label: string; isDefault: boolean };

/** The app speaks English only: its words are pushed for this one language. */
export const APP_LANGUAGES: AppLanguage[] = [{ code: "en", label: "English", isDefault: true }];

export function useSignupOpen(): boolean {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    blocksClient.iam.signupSettings
      .get()
      .then((settings) => {
        const record = settings as Record<string, unknown>;
        const value = record.emailPasswordSignup ?? record.isEmailPasswordSignupEnabled ?? record.isSignupEnabled ?? record.isEnabled;
        if (alive) setOpen(value === true);
      })
      .catch(() => {
        if (alive) setOpen(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return open;
}
