# What Blocks can do

Written by Studio for every run (CLI 0.11.0). Read it before you plan, with `.studio/plan.md` and the
feature files, then write `.studio/blocks-usage.md` (see the brief's "First, translate the plan"). Each service names
the skills that build it: open the ones your features need, judged from what each feature does, not from
the words it happens to use.

## Always

- The app is a React + Vite front end, and nothing else: no server, API or database of its own.
- Anything that must run on a server is a Blocks function, proxy or workflow (see "Server work" below).
- Keys for other companies' services live in Blocks secrets, set by the owner; never in the app, `.env` or a
  `VITE_` value.
- Sign-in and sign-up are the hosted sign-in page: one "Sign in" button opens it (labelled "Sign in or create an
  account" while the project's sign-up is on); the app has no email or password fields of its own.

## Server work

Pick the smallest thing that works, in this order:
1. An access rule or a plain SDK call from the app (records, files, mail, notifications).
2. A proxy: one call to another company's API with a hidden key, nothing around it.
3. A function: your own code that must not run in the browser (a protected calculation, a webhook from
   outside, a call with logic around it).
4. A workflow: something that happens by itself (a record changed, a schedule) or several steps in a row; it
   may call a function or a proxy as a step.

## Who sets it up

- **this app**: app code with the SDK; nothing to set up.
- **project**: you set it up with the CLI, and every app of the project shares it: reuse what exists, change only
  what this plan needs, and report project-wide changes as `project_change` progress lines.
- **owner**: only the owner can supply it (a key, an account, a setting in Studio). Build the rest and name what is
  missing in your summary.
- **Studio**: Studio does it; never you.

"Tried" lines were proven on the dev platform on 2026-10-28.

## The app and its sign-in

- For: The starter app: a React + Vite front end with one Blocks client, the hosted sign-in page wired in (redirect, `/login/callback`, session, route guards) and this app's sign-in client.
- Pick it: Every Blocks app, on its first run. Sign-in is always the hosted page.
- Not for: Never a sign-in form of the app's own unless the plan says in so many words that the form lives in the app's pages. Never a server of the app's own.
- Who sets it up: Studio
- Limit: Studio logs the CLI in, selects the project and checks the sign-in client; the builder only scaffolds once and keeps its sign-in plumbing.
- Limit: The sign-in client's redirect addresses are replaced whole on every save: always send every address the run facts list.
- Limit: Signing in works only when the sign-in client, the identity provider and the project's hosted sign-in setting agree.
- Skills: `blocks-bootstrap`, `blocks-iam-sso-oidc-implementation`, `blocks-frontend-local-https`
- CLI: `blocks new web`, `blocks init`, `blocks pull`, `blocks doctor`, `blocks auth oidc-clients`, `blocks auth config`
- Plan uses: sign-in

## People create their own account

- For: Whether anyone may create an account, and the roles a new account starts with.
- Pick it: A plan where people sign themselves up ("anyone can create an account", "companies sign up").
- Not for: Invite-only apps: those use People and invitations.
- Needs: The owner turns the project's sign-up on or off in Studio.
- Who sets it up: owner
- Limit: One switch for the whole project: on means anyone can create an account, and that account works in every app of the project. There is no sign-up rule per app.
- Limit: The builder reads it (`iam signup-settings get`) and saves it only for an app whose sign-in is companies that sign up themselves (the owner chose that at the start): on, with the plan's top role as the start role. The app reads it at runtime with the SDK's public sign-up settings read.
- Limit: There is no separate sign-up page or sign-up mode to send people to: the hosted sign-in page offers to create an account itself while sign-up is on.
- Tried: The SDK and the skills have no sign-up entry for the hosted page; one "Sign in" button covers both ("Sign in or create an account" while sign-up is on).
- Skills: `blocks-iam-organizations`, `blocks-iam-account`
- CLI: `blocks iam signup-settings`
- Plan uses: self sign-up

## A person's own account

- For: What a signed-in person does with their own account: profile, password change, sign out here or everywhere, their own sign-in codes.
- Pick it: A profile or account settings screen; a sign-out button.
- Not for: Other people's accounts (People and invitations); activation and password reset links, which land on the hosted pages.
- Who sets it up: this app
- Limit: Payload shapes are the platform's: read the skill before writing a form.
- Skills: `blocks-iam-account`
- CLI: `blocks iam me`
- Plan uses: sign-in

## People and invitations

- For: Adding people from the app (an account an admin creates; the person sets their password from an emailed link), listing, editing, deactivating, and giving or taking roles.
- Pick it: An "Invite people" or people list screen for an admin role; a feature that uses invitations.
- Not for: Anyone signing themselves up (People create their own account).
- Needs: The activation email needs the project's mail set up; without it an invited person can't get in.
- Who sets it up: this app
- Limit: People are the project's: one account per person across every app of the project.
- Limit: Giving roles in an organization replaces that organization's whole role list for the person.
- Limit: There is no "is this email taken" check before sign-in: it needs a signed-in user.
- Skills: `blocks-iam-users`
- CLI: `blocks iam users`, `blocks iam email`
- Plan uses: invitations

## Roles and permissions

- For: Who may open which screen or do which action. Roles carry permissions of two kinds: one that guards a call (missing: refused) and one that guards a control (missing: hidden).
- Pick it: Staff areas, admin screens, "only a Manager may…".
- Not for: Guarding records: a hidden button guards nothing; records are guarded by their access rules (Who may read and change records).
- Who sets it up: project
- Limit: Roles and permissions are shared by every app of the project: pull the project's setup first and reuse a role by name; create only what the plan needs.
- Limit: Screens read the person's roles from the SDK's current user; a role picker uses the assignable roles read.
- Skills: `blocks-iam-access-control`
- CLI: `blocks iam roles`, `blocks iam permissions`, `blocks iam resources`
- Plan uses: roles

## Customer companies (organizations)

- For: A product sold to companies: each company is an organization with its own people, their roles in it, and its records.
- Pick it: A plan whose sign-in is customer companies, or a feature that uses customer companies.
- Not for: Teams or departments inside one business (records or roles do that); never a home-made Company record with its own member list.
- Who sets it up: project
- Limit: Companies created at sign-up need the project's multi-organization setup and organization creation from sign-up both on; multi-organization can't be switched off again.
- Limit: Switching company is app code only (the person's organizations, then switch); it is a feature of its own.
- Limit: Every record carries the system `OrganizationId`; a company's records are guarded by a rule that matches it to the person's organization.
- Limit: A person's roles are kept per company, never one list per person: each company they are in gives them its own roles (`{"<company id>": ["team-lead"]}`), so with several companies on one person can lead a team in one company and be a member in another.
- Skills: `blocks-iam-organizations`, `blocks-iam-users`, `blocks-iam-access-control`
- CLI: `blocks iam organizations`
- Plan uses: customer companies

## Sign-in with another provider

- For: Sign-in through a company or social identity provider, as an extra choice on the hosted page.
- Pick it: Only when the plan names a provider and the owner has supplied its id and secret.
- Not for: Ordinary username and password sign-in, which needs nothing.
- Needs: The owner registers the app with that provider and hands over its client id and secret.
- Who sets it up: owner
- Limit: Some provider fields can't change after create; deleting a provider deletes its client.
- Skills: `blocks-iam-sso-oidc-configuration`
- CLI: `blocks auth idp`, `blocks auth client-credentials`
- Plan uses: sign-in

## Sign-in codes (MFA)

- For: A code from an authenticator app or a one-time code at sign-in, backup codes, and who must use them.
- Pick it: A feature that uses sign-in codes; staff or sensitive records when the plan asks.
- Not for: Anything the plan didn't ask for.
- Who sets it up: project
- Limit: The requirement is the project's (or one app's sign-in client, which can only narrow the project's methods).
- Limit: "Required" with no methods allowed does nothing; nobody can reset another person's codes.
- Limit: A person's own enrolment screen is app code (A person's own account).
- Skills: `blocks-iam-mfa`
- CLI: `blocks mfa`
- Plan uses: sign-in codes

## Bot check on sign-in

- For: A captcha on password sign-in.
- Pick it: A feature that uses captcha.
- Not for: Forms inside the app.
- Needs: The owner's captcha provider keys.
- Who sets it up: owner
- Limit: One project-wide setting: the first enabled configuration wins for every app.
- Skills: `blocks-captcha`
- CLI: `blocks captcha`
- Plan uses: captcha

## Records

- For: The app's data: record types (schemas) with fields, validation and indexes, read and written from the app through the gateway: lists with filters, sorting and paging, one record, joins across types, geo search.
- Pick it: Anything the app keeps, lists, creates, edits or deletes. "Keep a list of X" already means records; browser storage is never the plan.
- Not for: Files and pictures (Files); totals and grouped summaries over many records, which the gateway doesn't document (count in the app, or a function).
- Who sets it up: project
- Limit: Record types are the project's: every app sees every type. Push only this plan's types (a push sends every file in the schema folder).
- Limit: A push is only staged: nothing changes until `data reload` succeeds (`data sync` does push, deploy and reload in one).
- Limit: Query names add a plain "s" to the type's name; a new field "doesn't exist" until the reload.
- Limit: A create, edit or delete can answer 200 and still refuse: the reason is in `errors` and the item comes back null.
- Limit: Dates go to a date-and-time field as a full time, never a bare date.
- Limit: No record history is documented beyond the system created/updated by and dates.
- Tried: Schema pushes went live only after `data reload`.
- Skills: `blocks-data-gateway-configuration`, `blocks-data-gateway-crud`
- CLI: `blocks data schema`, `blocks data validation`, `blocks data config`, `blocks data validate`, `blocks data sync`
- Plan uses: records, public records

## Who may read and change records

- For: Each record type's access per operation (read, write, edit, delete): inherited, any signed-in person, public, or custom rules (row or column level). It is the only thing that guards records.
- Pick it: Every record type, from its feature's "Who may" line, before the screens that use it.
- Not for: Hiding a screen or a button: that guards nothing on its own.
- Who sets it up: project
- Limit: "Any signed-in person" means anyone signed in to any app of the project; public opens the operation to everyone.
- Limit: In a rule, a side's source is a number: 0 the signed-in person, 1 a field of the record, 2 a fixed value given in `staticValue`. Roles are matched with "contains" (operator 6). A rule written the other way round shuts everyone out.
- Limit: A deploy is only staged: nothing changes until `data reload` succeeds.
- Limit: Rules already in the project may be wrong: check each against the shape, never copy one as a pattern.
- Limit: `data rules pull` overwrites the workspace's rules file: read live rules back with `data rules policy get <type>` instead.
- Tried: Rules written as person 0 / record field 1 / fixed value 2, with roles as "contains", worked once reloaded: a Management user saved, listed and renamed a team.
- Tried: The same rules deployed without a reload changed nothing.
- Skills: `blocks-data-gateway-configuration`
- CLI: `blocks data rules`, `blocks data reload`
- Plan uses: records, public records, roles, customer companies

## Files

- For: Uploads and downloads, folders, versions, trash and restore, sharing and access, from the app.
- Pick it: Pictures, documents, attachments; a picture people change (a cover, an avatar) is a file id field on its record.
- Not for: A field where someone pastes an image address.
- Who sets it up: this app
- Limit: Files are private by default; public means anyone with the link can download.
- Skills: `blocks-data-storage`
- CLI: `blocks data files`
- Plan uses: files

## Where files are stored

- For: Which storage provider holds the project's files.
- Pick it: Only when the owner brings their own storage.
- Not for: Building a files feature: the project's default storage needs nothing.
- Needs: The owner's storage account and credentials.
- Who sets it up: owner
- Limit: Provider and credentials are fixed when the configuration is created.
- Skills: `blocks-storage-configuration`
- CLI: `blocks storage`

## Email

- For: Emails sent from the app from templates, per purpose and language.
- Pick it: A feature that uses email: receipts, reminders, notices.
- Not for: Sending from the CLI under a project session; marketing lists.
- Needs: The project's mail set up once with the owner's mail account (it also carries invitation and activation emails).
- Who sets it up: project
- Limit: Mail configuration and templates are the project's, set up with the CLI only; sending is the app's (SDK).
- Limit: With no mail configuration, build the feature and say in the summary that email isn't set up.
- Skills: `blocks-mail`
- CLI: `blocks mail`
- Plan uses: email

## In-app notifications

- For: Alerts sent to people, roles or subscribers, an inbox, unread counts, mark as read.
- Pick it: A feature that uses in-app notifications.
- Not for: Email (Email).
- Who sets it up: this app
- Limit: Sending is the app's (SDK); a send from the CLI under a project session fails.
- Limit: The channel configuration is the project's, CLI only, with raw numbers for its options.
- Skills: `blocks-notifier`, `blocks-notification`
- CLI: `blocks notifier`, `blocks notification`
- Plan uses: in-app notifications

## Functions (code that runs on the platform)

- For: A small JavaScript handler the platform runs when called: from the app with the person's token (optionally limited to roles), from outside at a public address (a webhook), or as a workflow step. Answers at once or as a run to poll.
- Pick it: Work that must not happen in the browser: a price or score people mustn't fake, a call to another company with a key and own code around it, a webhook another company calls.
- Not for: A plain call to another company's API with a hidden key (a proxy); "when X happens" or a schedule (a workflow: a function has no trigger of its own); anything over 30 seconds.
- Needs: A key it uses is a project secret the owner sets.
- Who sets it up: project
- Limit: 30 seconds, 128 MB, 10 runs at once per function, 2 attempts, 1 MB in and 5 MB out.
- Limit: Saving is not deploying: callers get the deployed version, and a new function answers 404 until its first deploy.
- Limit: Credentials only as secret references in its variables, never typed in.
- Limit: Its public address comes from `logic function url`, never a gateway path written by hand.
- Tried: On the dev platform create and delete work, but test and deploy fail: the platform's function build image is missing, so no function can go live there yet.
- Skills: `blocks-functions`
- CLI: `blocks logic function`
- Plan uses: functions, proxies, workflows

## Proxies (another company's API)

- For: A named route to one outside API that adds the stored key on every call; the app calls it by its slug, limited to signed-in people or roles.
- Pick it: A feature that shows or sends data to another company's service (maps, weather, text messages, a payment provider's API).
- Not for: Own code around the call (a function); calling the outside API from the browser with a key (never).
- Needs: The owner's account with that company and its key, stored as a project secret.
- Who sets it up: project
- Limit: The key must be a project secret referenced in the header, never typed in.
- Limit: 1 MB request bodies, 5 MB answers; rate limits; a path must match a declared route.
- Limit: The app calls by slug; the CLI configures by id.
- Tried: Create, test (the upstream answered 200) and delete all work on the dev platform.
- Skills: `blocks-proxy`
- CLI: `blocks logic proxy`
- Plan uses: proxies

## Workflows and schedules

- For: A graph the platform runs by itself: when a record is added, changed or removed, on a schedule, or behind a webhook; it can branch, run a little JavaScript, read and write records, call HTTP, call a function or a proxy, and send mail.
- Pick it: "When X happens, do Y", "every Monday…", a feature that uses automation.
- Not for: Heavy or long work, transactions, the fast path of a screen, or a single call the app can make itself with the SDK.
- Needs: Keys it uses are project secrets.
- Who sets it up: project
- Limit: A workflow runs nothing until it is published; import matches by name.
- Limit: A plain cron call to an address is `logic scheduler`; a schedule inside a workflow is its trigger.
- Limit: The CLI and the skill never give a workflow webhook's address, so the app can't call one: start app-triggered work from a record change or a function instead.
- Tried: Import, publish, unpublish and delete work on the dev platform; no webhook address was found.
- Skills: `blocks-workflow`
- CLI: `blocks logic workflow`, `blocks logic scheduler`
- Plan uses: workflows

## Secrets (keys)

- For: Named keys the platform keeps for proxies, functions and workflows: rotate, lock, who may read.
- Pick it: Any key for another company's service.
- Not for: Anything in the app or a `VITE_` value: the browser never holds a key.
- Needs: The value always comes from the owner; it is never printed back.
- Who sets it up: owner
- Limit: Setting a secret always makes a new one (names aren't unique): change a value by rotating.
- Limit: When a key doesn't exist yet, build the rest and name the missing secret in the summary.
- Skills: `blocks-secrets`
- CLI: `blocks secrets`
- Plan uses: secrets, proxies, functions

## Languages

- For: The app's words in each of the project's languages, pushed per module and language, and a language switch in the app.
- Pick it: Every app (its words live in its own translation module); several languages when the project has them.
- Not for: Languages the project didn't choose.
- Who sets it up: project
- Limit: The project's languages are shared by every app; push one language at a time.
- Limit: A key with no text comes back as a missing-key marker the app must skip.
- Skills: `blocks-localization-configuration`, `blocks-localization-implementation`
- CLI: `blocks localization`
- Plan uses: languages

## Going live

- For: Deploying the linked repository to the app's own address.
- Pick it: Never the builder's: Studio deploys when the owner asks.
- Not for: Anything in a run.
- Who sets it up: Studio
- Limit: Linking the repository is done in the console; teardown destroys the deployment.
- Skills: `blocks-release-deployment`
- CLI: `blocks release`, `blocks git`, `blocks github`, `blocks domain`, `blocks certificate`
