# The screens this plan touches, as they look today

This plan has no designs of its own. These are the designed screens it touches, as the
owner last agreed them. Keep their look, layout and words; change only what the plan's
features say. Where a feature changes something on a screen, follow the feature.
A screen or part with `changedByThisPlan: true` was redrawn for this plan at the owner's
request: build it as drawn. Studio ports those itself at the start of the build
(`port.json` lists the components it wrote and the screens it couldn't): build on the
ported component without changing anything visual, and port by hand (its markup, classes
and `<style>` block as they are) only a screen `port.json` lists under `notPorted`.

- `manifest.json`: each screen's route, the features it serves, the shared parts it uses
  and the screens it links to. `changedLaterBy: N`: a later plan changed the screen after
  this design was drawn; keep it as it is built now.
- `screens/<key>.html`, `parts/<key>.html`: the designs. `<div data-part="header"></div>`
  marks where a shared part goes; `data-sample` marks sample data.
  `situations` in the manifest lists each screen's other states (`<section data-state>`):
  each takes the place of what `replaces` names while it applies; keep them as drawn.
- `kit.css`: the `ds-*` classes, the same file the app has as `src/app/design-kit.css`.
  Where the app doesn't match these screens yet, port their markup and classes as they are.