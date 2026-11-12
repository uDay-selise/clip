import { useState } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { useT } from "../../lib/i18n/LocalizationProvider";

/**
 * Opens Donkey app: the project's hosted sign-in page, where a new shopper can
 * create an account while sign-up is on. Never a form of this site's own.
 */
export function useEnterShop() {
  const { login } = useAuth();
  const { t } = useT();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function enter() {
    setFailed(false);
    setPending(true);
    try {
      await login("/", "signup");
    } catch (error) {
      console.error("Could not open Donkey app's sign-up", error);
      setFailed(true);
      setPending(false);
    }
  }

  return {
    enter,
    failed,
    pending,
    failedMessage: t("auth.openFailed"),
    pendingLabel: t("auth.opening")
  };
}
