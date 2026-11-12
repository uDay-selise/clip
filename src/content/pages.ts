/**
 * The words the designs show while the team hasn't written its own yet.
 * Every kind of content starts from here; the app never writes these as records.
 */

export type PageStartingWords = {
  heading: string;
  intro: string;
  deliveryText?: string;
  returnsText?: string;
};

export const startingWords: Record<string, PageStartingWords> = {
  home: {
    heading: "Good things, fair prices.",
    intro:
      "Donkey sells everyday goods chosen with care: homeware, pantry staples and small gifts. Browse what we have, see what it costs, and sign up to buy."
  },
  "how-it-works": {
    heading: "From the shop to your door, in three steps.",
    intro: "Pick what you want, pay at the checkout, and we'll get it to you. Here's what happens along the way.",
    deliveryText: "",
    returnsText: ""
  },
  contact: {
    heading: "Talk to Donkey. We answer.",
    intro: "A question about a product, an order on its way, or sending something back?"
  },
  about: {
    heading: "We sell the things that make a house feel lived in.",
    intro: "A small shop for kitchens, doorsteps and quiet corners. Every price is in pounds, and every item is picked by hand."
  }
};

/** The design's own empty lines, shown when the team has written nothing yet. */
export const startingEmptyLines = {
  delivery: "We'll add our delivery details here soon.",
  returns: "We'll add our returns details here soon.",
  contactDetails: "Contact details are on their way. Check back soon.",
  products: "Our products are on their way. Check back soon."
};
