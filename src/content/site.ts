export type Reason = {
  title: string
  text: string
  icon: "flame" | "clock" | "people"
}

export type ClassCard = {
  name: string
  tagline: string
  art: "spin" | "boxing" | "strength" | "hiit"
}

export type OpeningHour = {
  day: string
  hours: string
}

export type TimetableEntry = {
  day: string
  time: string
  name: string
  trainer: string
  description: string
  art: ClassCard["art"]
}

export type ClassesContent = {
  intro: string
  entries: TimetableEntry[]
}

export type TrainerArt = "mara" | "dan" | "priya" | "sam"

export type Trainer = {
  name: string
  coaches: string
  line: string
  art: TrainerArt
}

export type TrainersContent = {
  intro: string
  people: Trainer[]
}

export type AboutContent = {
  intro: string
  story: string[]
  facilities: string[]
}

export type ContactContent = {
  intro: string
  formTitle: string
  mailsubject: string
  classOptions: string[]
}

export const site = {
  name: "HumoDynamic",
  headline: "Train hard. Start free.",
  heroImage: new URL("../assets/hero.png", import.meta.url).href,
  address: "Unit 7, Fenwick Works, 42 Bridge Street, Manchester M3 3BN",
  phone: "0161 555 0198",
  email: "hello@humodynamic.co.uk",
  mapQuery: "42 Bridge Street, Manchester M3 3BN",
} as const

export const reasons: Reason[] = [
  {
    title: "Coaches who push you",
    text: "Every session is led by a specialist who learns your name and your goals.",
    icon: "flame",
  },
  {
    title: "Classes that fit your day",
    text: "Early mornings to late evenings, six days a week. No wasted trips.",
    icon: "clock",
  },
  {
    title: "A floor that never queues",
    text: "Plenty of racks, cardio and studio space, even at peak hours.",
    icon: "people",
  },
]

export const classCards: ClassCard[] = [
  { name: "Spin", tagline: "45 minutes, sweat guaranteed", art: "spin" },
  { name: "Boxing", tagline: "Pads, bags and footwork", art: "boxing" },
  { name: "Strength", tagline: "Barbell basics, built up", art: "strength" },
  { name: "HIIT", tagline: "Short bursts, big engine", art: "hiit" },
]

export const openingHours: OpeningHour[] = [
  { day: "Monday", hours: "6:00am – 10:00pm" },
  { day: "Tuesday", hours: "6:00am – 10:00pm" },
  { day: "Wednesday", hours: "6:00am – 10:00pm" },
  { day: "Thursday", hours: "6:00am – 10:00pm" },
  { day: "Friday", hours: "6:00am – 9:00pm" },
  { day: "Saturday", hours: "8:00am – 6:00pm" },
  { day: "Sunday", hours: "Closed" },
]

export const trainers: TrainersContent = {
  intro:
    "Specialists, not session leaders. Every coach here has spent years getting people stronger — and knows when to push and when to build you up.",
  people: [
    {
      name: "Mara Okafor",
      coaches: "Spin & conditioning",
      line: "Turns an hour on the bikes into the best part of your week.",
      art: "mara",
    },
    {
      name: "Dan Vance",
      coaches: "Boxing & HIIT",
      line: "Ex-competitor who teaches footwork first and power second.",
      art: "dan",
    },
    {
      name: "Priya Raman",
      coaches: "Strength",
      line: "Gets first-timers under the bar safely and lifts them up from there.",
      art: "priya",
    },
    {
      name: "Sam Ellery",
      coaches: "Mobility & recovery",
      line: "Keeps your joints healthy so the hard sessions keep coming.",
      art: "sam",
    },
  ],
}

export const about: AboutContent = {
  intro:
    "One room, loud music, and coaches who know your name. This is where neighbours become regulars.",
  story: [
    "HumoDynamic started with a single rack in a borrowed unit under the arches. A handful of regulars turned up, word spread, and within a year we had taken over the whole floor.",
    "We kept the things that worked — proper coaching, no queues, and a mix of sessions for every level — and dropped the things that didn't. No pressure, no posing, no contracts you can't get out of.",
    "Today we run a full weekly timetable of spin, boxing, strength and HIIT, with free weights, cardio and a studio floor open whenever we are. Come see the place for yourself.",
  ],
  facilities: [
    "Free weights",
    "Cardio machines",
    "Studio space",
    "Showers",
  ],
}

export const contact: ContactContent = {
  intro:
    "Come and try a session on us. Send us a quick enquiry and we'll sort your first visit — or just call in.",
  formTitle: "Book a free trial",
  mailsubject: "Free trial enquiry — HumoDynamic",
  classOptions: ["Spin", "Boxing", "Strength", "HIIT", "Not sure yet"],
}

export const classes: ClassesContent = {
  intro:
    "Six days a week, every class is coached by a specialist and scaled to the room. Pick a session, turn up, and we'll show you the ropes for free.",
  entries: [
    {
      day: "Monday",
      time: "6:30am",
      name: "Spin",
      trainer: "Mara Okafor",
      description:
        "A 45-minute ride on the bikes. Big climbs, fast sprints and a playlist that keeps your legs turning.",
      art: "spin",
    },
    {
      day: "Monday",
      time: "6:00pm",
      name: "Boxing",
      trainer: "Dan Vance",
      description:
        "Pads, bags and footwork. Learn the basics of stance, jab and movement — no sparring required.",
      art: "boxing",
    },
    {
      day: "Tuesday",
      time: "7:00am",
      name: "Strength",
      trainer: "Priya Raman",
      description:
        "Barbell basics built up week by week. Squat, press and pull with a coach watching every rep.",
      art: "strength",
    },
    {
      day: "Tuesday",
      time: "6:30pm",
      name: "HIIT",
      trainer: "Dan Vance",
      description:
        "Short bursts, big engine. Twenty minutes of work, short recoveries, and a full-body finish.",
      art: "hiit",
    },
    {
      day: "Wednesday",
      time: "6:30am",
      name: "Spin",
      trainer: "Mara Okafor",
      description:
        "A 45-minute ride on the bikes. Big climbs, fast sprints and a playlist that keeps your legs turning.",
      art: "spin",
    },
    {
      day: "Wednesday",
      time: "6:00pm",
      name: "Strength",
      trainer: "Priya Raman",
      description:
        "Barbell basics built up week by week. Squat, press and pull with a coach watching every rep.",
      art: "strength",
    },
    {
      day: "Thursday",
      time: "7:00am",
      name: "HIIT",
      trainer: "Dan Vance",
      description:
        "Short bursts, big engine. Twenty minutes of work, short recoveries, and a full-body finish.",
      art: "hiit",
    },
    {
      day: "Thursday",
      time: "6:30pm",
      name: "Boxing",
      trainer: "Dan Vance",
      description:
        "Pads, bags and footwork. Learn the basics of stance, jab and movement — no sparring required.",
      art: "boxing",
    },
    {
      day: "Friday",
      time: "6:30am",
      name: "Spin",
      trainer: "Mara Okafor",
      description:
        "A 45-minute ride on the bikes. Big climbs, fast sprints and a playlist that keeps your legs turning.",
      art: "spin",
    },
    {
      day: "Friday",
      time: "6:00pm",
      name: "Strength",
      trainer: "Priya Raman",
      description:
        "Barbell basics built up week by week. Squat, press and pull with a coach watching every rep.",
      art: "strength",
    },
    {
      day: "Saturday",
      time: "9:00am",
      name: "HIIT",
      trainer: "Dan Vance",
      description:
        "Short bursts, big engine. Twenty minutes of work, short recoveries, and a full-body finish.",
      art: "hiit",
    },
    {
      day: "Saturday",
      time: "10:30am",
      name: "Spin",
      trainer: "Mara Okafor",
      description:
        "A 45-minute ride on the bikes. Big climbs, fast sprints and a playlist that keeps your legs turning.",
      art: "spin",
    },
  ],
}