# Third-party notices

Graphite Mono for BB embeds the JetBrains Mono typeface.

- Copyright 2020 The JetBrains Mono Project Authors
- Licence: SIL Open Font License, Version 1.1, with no Reserved Font Name; the full text is in fonts/OFL.txt (copied from https://github.com/JetBrains/JetBrainsMono).
- Project: https://github.com/JetBrains/JetBrainsMono
- Files: the variable (weight 100–800) upright and italic WOFF2 subsets served by Google Fonts, version v24, for Latin, Latin Extended and Cyrillic. They were downloaded unchanged; source URLs and unicode ranges are listed in fonts/manifest.json. scripts/build-themes.mjs embeds them in themes/*.css as base64 data URLs, which is a form of bundling the OFL permits.

SHA-256 of the files in fonts/:

- jetbrains-mono-normal-latin.woff2: 1e06740a02a443fb7f3eeda8fcaa685a0f6c620e3f01e6666e847295469ce3ad
- jetbrains-mono-normal-latin-ext.woff2: 7db7affbce1fdee69c1ffc2641bbca289b049867f524c9d861fe35ab6670bf29
- jetbrains-mono-normal-cyrillic.woff2: af7486955880be1c2b972e9c766acffb776768d669b6576ed9a0919ce72e7ca6
- jetbrains-mono-italic-latin.woff2: 6548575d68391672486bf3815a8dd9fe0ae251d1087875581ac8912d5cb52baa
- jetbrains-mono-italic-latin-ext.woff2: bdce8a4f00f61bed7141af8ac231a91be56de82f41ca2b981b34ff48359c288a
- jetbrains-mono-italic-cyrillic.woff2: 1e9a92863e564a1699e0dd92fed98c2d1a7471f64356296c4cd45e8b444ed62b

The fonts are distributed under the OFL only; the MIT licence of this repository does not apply to them.

Theme CSS, palettes, build script, packaging and the icon: Copyright (c) 2026 Alex Ponomar (ponomr), distributed under MIT.
