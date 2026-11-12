# Studio handover

Written by Studio before each build. Read it; don't edit it (it is rewritten every run), except
`blocks-usage.md`, which you write.

- `brief.md`: what the app is made of (and what that rules out), what it is for, who uses it, what is in and out of scope.
- `plan.md`, `plan.json`: the plan being built, its steps in order, which step(s) to build now, and
  what each feature uses of Blocks and why ("Built with").
- `features/<KEY>.md`: one file per feature, its full documentation: what it is, who can use it,
  where it lives, how it works, rules, the exact words people see, what it keeps, what it is built
  with, what it doesn't do, and its acceptance checks.
- `look.json`: the look to apply: style family, its principles and component notes, fonts, palette, notes, tokens.
- `blocks.md`: what Blocks can do, per service: when to pick it, what it needs, its limits.
- `blocks-usage.md`: yours to write before any code, starting from the plan's "Built with": per feature,
  the Blocks work it needs, what the plan left out, and the skill you will open.
- `progress.jsonl`: where you report progress, one JSON object per line (see the build message).