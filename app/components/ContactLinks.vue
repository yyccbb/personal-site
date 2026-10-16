<script setup lang="ts">
defineProps<{ email: string; variant?: 'dissolve' | 'static' }>()
const { t } = useSitePreferences()
</script>

<template>
  <nav class="rail-connect" :class="{ 'contact-links-static': variant === 'static' }" :aria-label="t('Contact and social links')">
    <!-- Use the English label to keep the pill's responsive size consistent in both languages. -->
    <span v-if="variant !== 'static'" class="connect-label connect-label-sizer button-primary" lang="en" aria-hidden="true">
      Let's connect <span>↗</span>
    </span>
    <span v-if="variant !== 'static'" class="connect-label button-primary" aria-hidden="true">
      {{ t("Let's connect") }} <span>↗</span>
    </span>
    <div class="connect-links">
      <a class="connect-link button-circle" :class="{ 'button-surface': variant === 'static', 'button-primary': variant !== 'static' }" :href="`mailto:${email}`" :aria-label="t('Email me')" :title="t('Email me')" style="--connect-shift:1">
        <svg aria-hidden="true" viewBox="0 0 24 24" class="connect-email-icon"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 6 8 7 8-7" /></svg>
      </a>
      <a class="connect-link button-circle" :class="{ 'button-surface': variant === 'static', 'button-primary': variant !== 'static' }" href="https://www.linkedin.com/in/yyccbb/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" style="--connect-shift:0">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0Z" /></svg>
      </a>
      <a class="connect-link button-circle" :class="{ 'button-surface': variant === 'static', 'button-primary': variant !== 'static' }" href="https://github.com/yyccbb" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" style="--connect-shift:-1">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 .297a12 12 0 0 0-3.793 23.385c.6.113.82-.258.82-.577v-2.234c-3.338.725-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.52 11.52 0 0 1 12 6.097c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.652.243 2.873.12 3.176.769.84 1.235 1.911 1.235 3.221 0 4.609-2.806 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.216.694.825.576A12.001 12.001 0 0 0 12 .297Z" /></svg>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.rail-connect {
  --connect-gap:6px;
  position:relative;
  display:inline-grid;
  width:max-content;
  min-width:calc(72px + 2 * var(--connect-gap));
  max-width:100%;
  flex-shrink:0;
  isolation:isolate
}
.connect-label {
  grid-area:1/1;
  min-width:0;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:var(--connect-gap);
  padding:0 28px;
  white-space:nowrap;
  pointer-events:none;
  transition:opacity .2s,filter .2s,var(--button-color-transition)
}
.connect-label-sizer {
  visibility:hidden
}
.connect-links {
  grid-area:1/1;
  /* Exclude the overlaid icons from the pill's intrinsic width. */
  contain:inline-size;
  display:grid;
  grid-template-columns:repeat(3,minmax(24px,1fr));
  align-items:center;
  gap:var(--connect-gap);
  width:100%;
  min-width:0
}
.connect-link {
  width:100%;
  opacity:0;
  pointer-events:none;
  transform:translateX(calc((100% + var(--connect-gap)) * var(--connect-shift))) scale(.8);
  transition:opacity .22s,transform .28s cubic-bezier(.22,1,.36,1),var(--button-color-transition)
}
.connect-link svg {
  width:clamp(12px,50%,18px);
  aspect-ratio:1;
  fill:currentColor
}
.connect-link .connect-email-icon {
  fill:none;
  stroke:currentColor;
  stroke-width:1.6;
  stroke-linecap:round;
  stroke-linejoin:round
}
.rail-connect:is(:hover,:focus-within) .connect-label {
  opacity:0;
  filter:blur(5px)
}
.rail-connect:is(:hover,:focus-within) .connect-link {
  opacity:1;
  pointer-events:auto;
  transform:translateX(0) scale(1)
}
.contact-links-static {
  --connect-gap:8px;
  min-width:0
}
.contact-links-static .connect-links {
  contain:none;
  grid-template-columns:repeat(3,var(--button-height))
}
.contact-links-static .connect-link {
  opacity:1;
  pointer-events:auto;
  transform:none;
  transition:var(--button-color-transition)
}
@media(max-width:1050px) {
  .connect-label {
    padding:0 10px
  }
}
@media(max-width:760px) {
  .connect-label {
    font-size:11px
  }
}
@media(max-width:480px) {
  .connect-label {
    padding:0 8px;
    font-size:10px
  }
}
@media(max-width:360px) {
  .rail-connect:not(.contact-links-static) {
    --connect-gap:4px
  }
  .connect-label {
    padding:0 7px;
    font-size:9.5px
  }
}
@media(hover:none) {
  .connect-label {
    opacity:0
  }
  .connect-link {
    opacity:1;
    pointer-events:auto;
    transform:none
  }
}
@media(prefers-reduced-motion:reduce) {
  .connect-label,.connect-link {
    transition:none
  }
}
</style>
