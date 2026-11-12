# Plan 1 · First version

**How to build it**
What kind of thing this is: Content pages, Records app.
The shop's website is a set of public pages a shopper can open without signing in: Home, How it works, Products and Contact, with a Sign up button that leads into Donkey app. The wording of each page and the products with their prices are kept as records, so the Donkey team changes them without anyone rebuilding the site. The team edits everything in an editors' area at /editor, which visitors never see; the platform's sign-in page and Editor role decide who gets in, and editors are invited by email. The product list shows the products the team has switched visible, with prices turned from pence into pounds. Inviting editors emails them, which needs the project's email set up once.
No library beyond the starter's.
Not this way: Products typed straight into the page files: nobody on the team could change a price without a rebuild.
Not this way: A sign-up or sign-in form on this site: both belong to Donkey app, and this site only sends shoppers there.
Not this way: Editors' pages for writing products inside Donkey app only: the shop details and delivery text belong with the site they appear on.
Prove by running (reading the code is not enough for these):
- PR-01 AC1: Save a product with pricePence 1250 and visible on, open /products, and check the card reads £12.50.
- PR-01 AC2: Turn a product's visible switch off, reload /products, and check the product is gone.
- PR-01 AC3: Switch every product off, open /products, and check it reads "Our products are on their way. Check back soon."
- ED-01 AC2: Open each visitor page in a signed-out browser and check its links and footer contain nothing pointing to /editor.
- ED-01 AC3: Sign in at /editor, change a product's price to 1250, save, then open /products and check £12.50.
- PG-02 AC1: Write a delivery text in /editor, save, and open /how-it-works to check it reads word for word.
Answer each of these with a `check_verified` line that says `by: ran` and what you saw; without that, the check is recorded as claimed, not held.
Risks:
- Invite emails do not go out until the project's email is set up, so the first editors cannot set their passwords.
- Products and page wording are kept by Donkey app, so a field added there later has to be picked up here.
- Prices stay in pence in the record; a product saved without a price would show wrong, so the price is required.

**What this plan does**
- Adds PG-01 See the home page
- Adds PG-02 See how buying works
- Adds PG-03 Reach Donkey
- Adds PR-01 Browse the products and prices
- Adds ED-01 Edit the site's content

**Built with (Blocks)**: what the plan says each feature uses and why. `.studio/blocks-usage.md` starts from these lines: keep each, and add what a feature needs that they miss.
- PG-01 See the home page
  - public records: Shows the home page wording the team keeps, so shoppers read it without signing in.
- PG-02 See how buying works
  - public records: Shows the delivery and returns text the team keeps, so shoppers read it without signing in.
- PG-03 Reach Donkey
  - public records: Shows the contact details the team keeps, so shoppers read them without signing in.
- PR-01 Browse the products and prices
  - public records: Shows the products and prices the team publishes, so shoppers read them without signing in.
- ED-01 Edit the site's content
  - sign-in: Lets each editor sign in on the hosted sign-in page before they reach /editor.
  - records: Keeps the editors' area's own editor accounts and their role.
  - public records: Keeps the page wording and products the editors change, which visitors then read.
  - roles: Only people with the Editor role may open /editor and change anything.
  - invitations: The owner invites each editor by email to set their password. Needs from the owner: The project's email set up once, so invite emails can go out.
  - files: Keeps the product photos editors upload.

**Only the owner can supply**: build the rest, and name what is still missing in your summary.
- ED-01 (invitations): The project's email set up once, so invite emails can go out.

**Build steps**
- [ ] **T01 The shop's pages open with the designs' words, and Sign up leads into Donkey app** — Covers PG-01 (See the home page), PG-02 (See how buying works), PG-03 (Reach Donkey). Done when PG-02 AC2 and PG-03 AC2 hold, and every page in the top menu opens with the designers' words and a Sign up button.
- [ ] **T02 The editors' area opens at /editor, with editors invited by email** — Covers ED-01 (Edit the site's content). Done when ED-01 AC1 and AC2 hold.
- [ ] **T03 Shoppers see the products and prices, and editors change them** — Covers PR-01 (Browse the products and prices). Done when PR-01 AC1–AC3 and ED-01 AC3 hold.
- [ ] **T04 The team's delivery, returns and contact details show on the site** — Covers PG-02 (See how buying works), PG-03 (Reach Donkey). Done when PG-02 AC1 and PG-03 AC1 hold.

This run builds T01, T02, T03, T04, one step at a time: Studio gives you each step when the one before it is done.

## The project

This app is one of 1 in Donkey; they share sign-in, roles, record types (Data schemas), files and translations.

Reuse these record types; never create a second one under a similar name, and never change one another app keeps (push only the schemas this plan owns):
- Calculation (kept by another app): sum, answer, workedOutBy, workedOutAt
- PageWording (kept by another app): pageKey, heading, intro
- Product (kept by another app): name, description, pricePence, group, medicineNote, visible, photoFileId, sortOrder
