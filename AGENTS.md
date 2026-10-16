# Project instructions

- Do not add tests unless the user asks for them.
- Start the response to each user prompt with a natural English rephrasing of that prompt.
- Before editing buttons or interactive links, read [docs/button-styles.md](docs/button-styles.md).
- Reuse the button recipes in `app/assets/css/buttons.css`; theme colors come from `app/assets/css/colors.css`. Do not copy a recipe into a component stylesheet.
- Every filter component must reuse `app/components/ContentFilters.vue` and exactly match its current scheme: 3px corners, primary palette when selected, surface palette when unselected, and the shared hover, focus, count, spacing, and responsive rules. Keep the Journal scroll-arrow scheme as documented.
- Keep the documented button exceptions unless the user's request includes changing them.
- Preserve the responsive, single-row mobile header, equal English/Chinese contact-button dimensions, keyboard interaction, and focus outlines.
