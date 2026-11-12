import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";

/**
 * Opens Donkey app: the project's hosted sign-in page, where a new shopper can
 * create an account while sign-up is on. Never a form of this site's own.
 * While the project has sign-up off, the hosted page cannot create an account,
 * so the same button opens the page with its plain sign-in instead.
 */
export function useEnterShop() {
  const { login } = useAuth();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function enter() {
    setFailed(false);
    setPending(true);
    try {
      await login("/");
    } catch (error) {
      console.error("Could not open Donkey app", error);
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  return { enter, failed, pending };
}
