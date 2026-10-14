import { useEffect, useState } from "react"

export type Route = "home" | "classes" | "trainers" | "about" | "contact"

const CLASSES_PATHS = new Set(["classes"])
const TRAINERS_PATHS = new Set(["trainers"])
const ABOUT_PATHS = new Set(["about"])
const CONTACT_PATHS = new Set(["contact"])

function pathFromHash(hash: string): string {
  return hash.replace(/^#\/?/, "").split("?")[0]
}

export function routeFromHash(hash: string): Route {
  const path = pathFromHash(hash)
  if (CLASSES_PATHS.has(path)) return "classes"
  if (TRAINERS_PATHS.has(path)) return "trainers"
  if (ABOUT_PATHS.has(path)) return "about"
  if (CONTACT_PATHS.has(path)) return "contact"
  return "home"
}

function scrollToAnchor(hash: string) {
  const id = pathFromHash(hash)
  if (
    id === "" ||
    id === "classes" ||
    id === "trainers" ||
    id === "about" ||
    id === "contact" ||
    id === "/"
  )
    return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView()
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? "home" : routeFromHash(window.location.hash),
  )

  useEffect(() => {
    const onChange = () => {
      setRoute(routeFromHash(window.location.hash))
      scrollToAnchor(window.location.hash)
    }
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])

  return route
}

export const classesHref = "#/classes"
export const trainersHref = "#/trainers"
export const aboutHref = "#/about"
export const contactHref = "#/contact"
export const trialHref = "#/contact"