# Product brief

What it's made of:
**A website, with a content editor.**
- A website only, for visitors: the visitor pages have no sign-in, no accounts, no route guard, no sign-in or sign-out button and no person menu. The starter's hosted sign-in (its login and callback routes and guard) stays for the editors' area only: guard `/editor` and everything under it with it; take the sign-in button and person menu off the visitor pages and never link `/editor` from them.
- Content editor: every kind of content the team updates is a Blocks Data schema and its images and files are in Blocks Storage. Read is Public (visitors read what is published); write, edit and delete are Custom for the Editor role, never User (every account in the project). Pages read the content at runtime.
- **The site never opens empty.** Each kind of content starts with the designs' own words: the records `.studio/designs/samples.json` lists for it, and the words the design shows in that place for the rest. Keep them in the app (a file per kind under `src/content/`, every word a translation key so each language has it) and show them while that kind has no records; the build never writes records itself. Visitors never see "not written yet", "no plans yet" or another empty note for content the designs show. People, quotes, figures about the business and contact details are not starting content: a section made only of those is left off the page while it has no records. In the editors' area a kind with no records offers its starting content as the first entries (one button saves them), so editors change the site's words instead of typing them again.
- The editors' area at `/editor` (the "Edit the site's content" feature): behind the hosted sign-in and the Editor role (`blocks-iam-access-control`: reuse the project's Editor role by name, create it only when there is none); a list per kind of content with a form to add, change or remove an entry, and what forms sent. Anyone signed in without the role sees a plain "This area is for the site's editors" page. Editors are invited (`blocks-iam-users`), never sign up: their emailed link needs the project's mail set up; when it isn't, build the area and say so in your summary.
  Uses: sign-in, records, roles, invitations

**What it's for**
Donkey's shop website shows shoppers the products Donkey sells and what they cost. Anyone can open it, and the Sign up button leads into the shop.

**Who uses it**
- Shoppers: browse the products and prices on the site, then use Sign up to go into the shop.
- The Donkey team: update the site's content in the editors' area.

**In this version**
Shoppers look at the products and what they cost, then head into the shop through Sign up.

**Not in this version**
See who Donkey is (kept as an idea for later)

**Tone**
Warm and plain: friendly words, short sentences, no jargon.
