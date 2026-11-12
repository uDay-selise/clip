import { useEffect, useState } from "react";
import { CallbackPage } from "../../features/auth/CallbackPage";
import { ErrorPage } from "../../features/auth/ErrorPage";
import { NotFoundPage } from "../../features/auth/NotFoundPage";
import { HomeScreen } from "../../features/home/HomeScreen";
import { HowItWorksScreen } from "../../features/how-it-works/HowItWorksScreen";
import { AboutScreen } from "../../features/about/AboutScreen";
import { ContactScreen } from "../../features/contact/ContactScreen";
import { ProductsScreen } from "../../features/products/ProductsScreen";
import { EditorSignInScreen } from "../../features/editor-sign-in/EditorSignInScreen";
import { EditorScreen } from "../../features/editor/EditorScreen";

const VISITOR_PAGES = ["/", "/how-it-works", "/about", "/contact", "/products"];

function VisitorPage({ path, onNavigate }: { path: string; onNavigate: (path: string) => void }) {
  switch (path) {
    case "/":
      return <HomeScreen onNavigate={onNavigate} />;
    case "/how-it-works":
      return <HowItWorksScreen onNavigate={onNavigate} />;
    case "/about":
      return <AboutScreen onNavigate={onNavigate} />;
    case "/contact":
      return <ContactScreen onNavigate={onNavigate} />;
    case "/products":
      return <ProductsScreen onNavigate={onNavigate} />;
    default:
      return null;
  }
}

export function AppRouter() {
  const [path, setPath] = useState(() => window.location.pathname);
  const [search, setSearch] = useState(() => window.location.search);

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
      setSearch(window.location.search);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  function navigate(nextPath: string) {
    const [nextPathname = "/", queryString = ""] = nextPath.split("?");
    window.history.pushState({}, "", nextPath);
    window.scrollTo({ top: 0 });
    setPath(nextPathname);
    setSearch(queryString ? `?${queryString}` : "");
  }

  if (path === "/login/callback") return <CallbackPage onNavigate={navigate} />;
  if (path === "/login") {
    const returnTo = new URLSearchParams(search).get("returnTo") || "/editor";
    window.history.replaceState({}, "", `/editor/sign-in?returnTo=${encodeURIComponent(returnTo)}`);
    return <EditorSignInScreen onNavigate={navigate} />;
  }
  if (path === "/error") return <ErrorPage onNavigate={navigate} />;
  if (path === "/editor/sign-in") return <EditorSignInScreen onNavigate={navigate} />;
  if (path === "/editor" || path.startsWith("/editor/")) return <EditorScreen onNavigate={navigate} />;

  return VISITOR_PAGES.includes(path) ? <VisitorPage path={path} onNavigate={navigate} /> : <NotFoundPage onNavigate={navigate} />;
}
