# The agreed designs

These are the screens of this plan as the owner agreed them before the build.
Build them one-to-one: the same layout, the same components, the exact words.

- `manifest.json`: each screen's route, the features it serves, the shared parts it
  uses and the screens it links to. `changedByThisPlan: false` screens are only
  context: keep them as built. A route is a suggestion: a screen may live at another
  address (`/` for the main list, `/goals/:id` for one record).
- `screens/<key>.html`: one screen. `<div data-part="header"></div>` marks where a
  shared part from `parts/` goes; build each shared part once as a shared component.
  `data-goto="<key>"` is a link to that screen's route; one whose key no screen in the
  manifest has opens what its feature describes (a form, a dialog): build that.
- Situations: `<section data-state="…">` blocks are the same screen under other
  circumstances (empty, loading, error, signed out, done), listed per screen under
  `situations` in the manifest. Each is the region as it looks then, with its exact words:
  while it applies it takes the place of what `replaces` names (a small one, a banner or a
  field's error, replaces nothing and shows where it is drawn), and `rootClass` goes on the
  page's root. Port each as it is, as a state of that screen's component (shown when the
  real data or request is in that state), not as a separate page; a submit button with
  `data-situation="done"` leads to the done situation once the request succeeds.
- A shared part with `changedByThisPlan: true` is this plan's new version of it: build it
  as drawn, and it replaces the old one on every screen.
- `changedLaterBy: N`: a later plan (Plan N) has already changed what this screen shows,
  after it was designed. Keep that screen as it is built now; don't rebuild it from this design.
- `changedSinceDrawn: [keys]`: those features changed before they were built, after this
  screen was drawn. Where the screen and the feature differ, follow the feature.
- Elements marked `data-sample` hold sample data: show real data there. A named one
  (`data-sample="Goal#2.title"`, `data-sample="me.name"`) says which record and field
  it is; `samples.json` holds those records (with an `itemId` each) and the signed-in
  person, gathered from every screen.
- `data-build-note="…"` on an element is the owner's note to the builder about it (how it
  should behave, what it should do): follow it. It is never shown in the app.
- `port.json`: Studio ports the screens itself at the start of the build. `ported` lists
  each screen and shared part it wrote into the app (a component and its CSS file, under
  `src/features/<key>/` and `src/app/layout/`), each checked against its design;
  `notPorted` lists the screens it couldn't, with why. Build on the ported components:
  route to them, wire real data, translation keys, routes and SDK actions into them, and
  never change their CSS files, elements or classes. Port by hand only the screens under
  `notPorted`, as below.
- `kit.css`: the `ds-*` classes, the same file the app has as `src/app/design-kit.css`.
  A screen ported by hand goes to JSX as it is: its markup, its `ds-*` classes and its own
  `<style>` block (a CSS file next to the component). Then swap sample data for real
  data, words for translation keys, `data-goto` links for routes and actions for SDK
  calls. Change nothing visual, add nothing the design doesn't show (no second logo or
  app name, no extra title, card or button) and leave nothing out: the layout classes (`ds-page`, `ds-bar`, `ds-page-head`,
  `ds-section`, `ds-stack`, `ds-row`, `ds-grid`) keep their widths and gaps because the
  kit is in the app. `ds-theme-switch` is the app's Light / Dark / Auto switch: build it
  as a working control.
- What the designs don't show (open menus and dropdown lists, dialogs, toasts, hover,
  focus, pressed and loading states, a state nobody drew) follows the style guide in
  `.studio/look.json` and the kit, so it looks like the rest of the app.

Where you can't match a design (a rule or a feature says otherwise, or it can't be
built), build what the feature says and report it on its own progress line:
{"type":"design_mismatch","screen":"<key>","text":"what differs and why"}