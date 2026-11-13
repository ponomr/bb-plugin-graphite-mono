# bb-plugin-graphite-mono — Standalone Context

BB theme plugin: JetBrains Mono everywhere at Light weight, in two palettes.
Sources are `src/common.css` (typography, sidebar, composer) and
`src/palette-{graphite,matrix}.css` (colours); `scripts/build-themes.mjs`
embeds the fonts from `fonts/` and writes `themes/graphite-mono.css` and
`themes/graphite-mono-matrix.css`.

## Critical Rules

1. **Edit sources, not `themes/`.** Run `npm run themes` after every change to
   `src/` or `fonts/` and commit the regenerated files; `npm run check:themes`
   fails on a stale theme.
2. **Check both palettes in both modes.** Every CSS change is verified with a
   screenshot in light and dark for Graphite and Matrix, because each palette
   sets its own composer, selection and accent variables.
3. **Stay under the theme size cap.** BB rejects theme CSS above about 256 KB;
   the embedded fonts take about 190 KB of each file. Add a font subset only
   after checking the generated size.
4. **Fonts stay OFL.** Do not modify the WOFF2 files; when replacing them,
   update `fonts/manifest.json` and the hashes in `THIRD_PARTY_NOTICES.md`.
5. **Screenshots are public.** `screenshots/` ships in the package and in the
   BB marketplace: before committing, replace real thread, project and host
   names in the captured UI with neutral ones.
6. **Other plugins can restyle the UI.** When a colour looks wrong live, check
   `bb plugin list` first: a third-party plugin may override the theme's
   selectors.

## Commands

- Check: `npm ci && npm run check:themes && npm run typecheck && npm run build`.
- Live test from the checkout: `bb plugin install "$PWD"`, then
  `bb theme set plugin:graphite-mono:graphite-mono` or
  `bb theme set plugin:graphite-mono:matrix`.

## Repository and release contract

- Ownership: personal, public (`ponomr/bb-plugin-graphite-mono`), MIT; fonts OFL.
- Checks: the command above; there is no CI yet.
- Release: bump `version` in `package.json` and `package-lock.json` in the PR,
  merge it, then tag the merge commit `vX.Y.Z` and push the tag.
- Distribution: the BB marketplace entry (`entries/graphite-mono.json` in
  get-bb/marketplace) tracks the git source with range `^0.1.0`, so a `0.1.x`
  tag reaches users without a marketplace PR. A marketplace PR is needed for a
  `0.2.0` range change or new screenshots, description or icon.
- Verification: `bb plugin install "git:https://github.com/ponomr/bb-plugin-graphite-mono.git@^0.1.0" --yes`,
  then `bb plugin source graphite-mono` must show the new tag.
- Recovery: reinstall the previous tag with `@X.Y.Z`; no persistent data.
