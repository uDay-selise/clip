# Blocks work for this plan

## PG-01 See the home page
- **Blocks work** (plan): public records: the home page wording (PageWording, pageKey `home`) is read by signed-out visitors.
  Reading one record by `pageKey` at runtime; records are already in the project, so no schema push, only rules.
- **The plan left out**: the PageWording records must be readable by the public (read Public), and the editors (T02 onward)
  need write/edit/delete as Custom for the Editor role. Nothing from the owner.
- **Skills**: `blocks-data-gateway-configuration` (rules), `blocks-data-gateway-crud` (read in app).

## PG-02 See how buying works
- **Blocks work** (plan): public records: the delivery and returns text on the `how-it-works` PageWording record.
  Same record type, same rules as PG-01. Visitor pages read it at runtime.
- **The plan left out**: deliveryText / returnsText are the site's own page wording fields (plan says so); with no record the
  page shows the designs' empty lines, kept in the app as starting content (`src/content/`).
- **Skills**: `blocks-data-gateway-configuration`, `blocks-data-gateway-crud`.

## PG-03 Reach Donkey
- **Blocks work** (plan): public records: the contact details (email, phone, address) on the `contact` PageWording record.
  Read Public; shown in the page and the footer.
- **The plan left out**: the sample email/phone/address in the designs are sample data, never the owner's facts: with no
  record the page shows the designs' "Contact details are on their way" and the footer shows no contact links.
- **Skills**: `blocks-data-gateway-configuration`, `blocks-data-gateway-crud`.

## PR-01 Browse the products and prices (T03)
- **Blocks work** (plan): public records: Product records marked visible, read by visitors; prices are whole pence turned into
  pounds in the app. Photos are Blocks Storage files (`photoFileId`), shown through the storage SDK.
- **The plan left out**: read is Public; write/edit/delete Custom for the Editor role, never User.
- **Skills**: `blocks-data-gateway-configuration`, `blocks-data-gateway-crud`, `blocks-data-storage`.

## ED-01 Edit the site's content (T02, T03, T04)
- **Blocks work** (plan): hosted sign-in guards `/editor`; Editor role; records (PageWording, Product) with Custom write for
  the Editor role; invitations with `blocks-iam-users`; files for product photos.
- **The plan left out**: the Editor role's platform permissions to list/invite people; the project's mail so invite emails go
  out (owner); Form entry schema if the contact form exists (feature says no form on Contact, so none).
- **Skills**: `blocks-iam-access-control`, `blocks-iam-users`, `blocks-data-gateway-configuration`,
  `blocks-data-gateway-crud`, `blocks-data-storage`.

## Languages
- **Blocks work**: the app's own module `app-bec07a69`; the project's languages only.
- **Skills**: `blocks-localization-configuration`, `blocks-localization-implementation`.
