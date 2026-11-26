# Plan 2 · Readable footer labels

The shared footer gets darker labels so the small headings, address and contact links are easy to read on every page.

**Build steps**
- [x] **T05 Rebuild the Footer as redrawn** — Builds the Footer as redrawn in this plan (`.studio/designs/`). What it does stays the same. Done when The Footer in the app matches its new design, and everything on it works as before.

No step of this plan is built in this run.

## The project

This app is one of 1 in Donkey; they share sign-in, roles, record types (Data schemas), files and translations.

Reuse these record types; never create a second one under a similar name, and never change one another app keeps (push only the schemas this plan owns):
- Calculation (kept by another app): sum, answer, workedOutBy, workedOutAt, Create, Read, Update, Delete, Roles, UserIds and 1 more
- PageWording (kept by another app; read by Donkey website): pageKey, heading, intro, Create, Read, Update, Delete, Roles, UserIds, Permissions and 5 more
- Product (kept by another app; read by Donkey website): name, description, pricePence, group, medicineNote, visible, photoFileId, sortOrder, Create, Read and 5 more
