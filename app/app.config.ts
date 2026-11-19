export default defineAppConfig({
  ui: {
    colors: {
      primary: 'coop',
      neutral: 'stone'
    },
    // Surtitre des sections en petites capitales, comme dans les autres bandeaux du site.
    pageSection: {
      slots: {
        headline: 'text-sm font-semibold tracking-wide uppercase'
      }
    },
    pageHero: {
      slots: {
        headline: 'text-sm font-semibold tracking-wide uppercase'
      }
    }
  }
})
