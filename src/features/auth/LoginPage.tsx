import { useState } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { isLoginConfigured } from "../../lib/blocks/config";
import { useT } from "../../lib/i18n/LocalizationProvider";

export function LoginPage({ returnTo }: { returnTo?: string }) {
  const { login } = useAuth();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const { t } = useT();
  const configured = isLoginConfigured();

  async function handleLogin() {
    setFailed(false);
    setPending(true);
    try {
      await login(returnTo);
    } catch (error) {
      console.error("Could not open the sign-in page", error);
      setFailed(true);
      setPending(false);
    }
  }

  return (
    <div className="auth-screen ds-root">
      <div className="auth-card">
        <div className="auth-brand"><span className="brand-mark">D</span><span>{t("app.name")}</span></div>
        <h2>{t("editor.heading")}</h2>
        <p>{t("editor.help")}</p>
        {!configured || failed ? <p className="auth-error" role="alert">{t("auth.openFailed")}</p> : null}
        <button className="ds-btn ds-btn-lg auth-submit" disabled={!configured || pending} onClick={handleLogin}>
          {pending ? t("auth.opening") : t("auth.signIn")}
        </button>
        <button className="ds-btn ds-btn-ghost" onClick={() => { window.location.assign("/"); }}>{t("editor.backToShop")}</button>
      </div>
    </div>
  );
}
