import { Header, Footer } from "./features/home/Chrome"
import { Hero } from "./features/home/Hero"
import { Reasons } from "./features/home/Reasons"
import { ClassStrip } from "./features/home/ClassStrip"
import { Location } from "./features/home/Location"
import { ClassesPage } from "./features/classes/ClassesPage"
import { TrainersPage } from "./features/trainers/TrainersPage"
import { AboutPage } from "./features/about/AboutPage"
import { ContactPage } from "./features/contact/ContactPage"
import { useRoute } from "./features/classes/router"

export default function App() {
  const route = useRoute()

  return (
    <div className="page">
      <Header current={route} />
      <main>
        {route === "classes" ? (
          <ClassesPage />
        ) : route === "trainers" ? (
          <TrainersPage />
        ) : route === "about" ? (
          <AboutPage />
        ) : route === "contact" ? (
          <ContactPage />
        ) : (
          <>
            <Hero />
            <Reasons />
            <ClassStrip />
            <Location />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}