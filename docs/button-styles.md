# Button styles

This is the shared button reference for AI agents and contributors. The implementation is `app/assets/css/buttons.css`, imported by `main.css`. Theme colors are defined in `app/assets/css/colors.css`.

## Primary buttons

`Browse my journal` is the reference. Add `button-primary` for its appearance and `pill-link` for its text-button layout:

```vue
<NuxtLink class="button-primary pill-link" to="/blogs">
  {{ t('Browse my journal') }} <span aria-hidden="true">↗</span>
</NuxtLink>
```

| Property | Light mode | Dark mode |
| --- | --- | --- |
| Background | `--color-text`: `#2E302C` | `--color-text`: `#E8E8DF` |
| Text / icon | `--color-background`: `#F4F0E9` | `--color-background`: `#171B18` |
| Hover background | `--color-accent`: `#A56850` | `--color-accent`: `#D5A88F` |
| Focus outline | `--color-accent`, 2px, 5px offset | Same role and dimensions |

The shared geometry uses a 999px radius, 12px regular text, 1.2 line height, 6px text-to-arrow gap, and intrinsic width. Text pills have 15px vertical / 20px horizontal padding. At 1050px and below, padding becomes 9px / 14px. Color transitions last .25s. Primary buttons have no floating hover motion.

`--button-height` derives the circular hero-social size from the shared font, line height, and vertical padding, so those circles match the adjacent text pill's height.

These controls must use the primary recipe:

- Browse my journal
- All entries
- Back to journal
- The sidebar Let's connect label
- Email, LinkedIn, and GitHub circles revealed by Let's connect
- Active Journal and Reading filters use the primary palette, with the filter geometry described below.

Icon-only controls and the compact sidebar header keep their own layout dimensions while sharing the primary appearance. Keep Let's connect's dissolve animation and English sizing label; both languages must retain the same responsive width and height. The social circles must retain their aspect ratio. Theme/language controls above the contact pill must keep its outer edges and height.

Do not duplicate primary background, foreground, hover, font, radius, or transition declarations in component CSS. Additional animation transitions should include `var(--button-color-transition)`. Component CSS may define layout, compact-header sizing, icon drawing, and the documented filter shape.

## Buttons that are light in light mode and dark in dark mode

Use `button-surface`. This is the shared opposite palette to primary buttons:

| Property | Light mode | Dark mode |
| --- | --- | --- |
| Background | `--color-background`: `#F4F0E9` | `--color-background`: `#171B18` |
| Text / icon | `--color-text`: `#2E302C` | `--color-text`: `#E8E8DF` |
| Border | `--color-border`: `#CBC4B8` | `--color-border`: `#485745` |
| Hover background | `--color-surface`: `#E8DED1` | `--color-surface`: `#263024` |
| Hover border / focus | `--color-accent`: `#A56850` | `--color-accent`: `#D5A88F` |

The class supplies palette and color transitions, not shape or dimensions. It is used by the three hero socials, unselected Journal/Reading filters, Journal scroll arrows, desktop slider knobs, and mobile appearance/language circles. Mobile knobs inherit the surrounding button's icon color and have transparent inner spans. Disabled scroll arrows keep their base palette, lower opacity, and disabled behavior.

Use `button-surface button-circle` for theme-following circular icon links. `button-circle` provides a centered icon, 1:1 aspect ratio, 50% radius, and a 1px border using the selected palette's border role. The hero socials use this recipe and the shared `--button-height`; the sidebar's revealed circles use `button-primary button-circle`.

## Required filter and scroll-arrow standard

The user confirmed the current scheme. Every filter component must reuse `app/components/ContentFilters.vue` and its shared `.filter-button` / `.filter-count` rules in `main.css`; do not introduce another filter appearance.

- Selected filters use `button-primary`; unselected filters use `button-surface`.
- Keep the 1px palette border, 3px corners, 40px minimum height, 12px label, 11px / 15px padding, and 14px label-to-count gap.
- Counts use 10px tabular numbers at .7 opacity.
- At 420px and below, preserve the 11px label, 10px / 12px padding, and 10px gap.
- Keep the shared palette's hover, color transitions, pressed state, and keyboard focus outline.
- Journal scroll arrows keep the current `button-surface` palette, 40px square shape, 3px corners, and lower opacity when disabled.

## Deliberate exceptions awaiting a design decision

Keep these exceptions until the user chooses to change them:

| Controls | Difference | Implementation |
| --- | --- | --- |
| Desktop appearance/language slider tracks | Use the surface hover tint as their resting background so the page-colored knob remains visible. Border, icon, hover, and focus colors follow the surface palette. | `.preference-control` in `preferences.css`; mobile circles use the ordinary surface recipe. |
| Open source links, Reading timeline labels, sidebar navigation, Journal card arrows, article previous/next links, and footer contact link | Navigation with transparent backgrounds; some links have underlines, outlined arrows, or accent hover text. These are not filled call-to-action buttons. | Existing navigation/link styles in `library.css` and `main.css`. |

## Verification

Do not add tests unless requested. For button changes, inspect the rendered idle, hover, and keyboard-focus states in both themes. Check narrow layouts and English/Chinese labels when layout or content changes. Check actual destinations without triggering email or messaging actions. Run existing build/type checks when the implementation warrants them.
