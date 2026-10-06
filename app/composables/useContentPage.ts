// Charge une page Markdown dans la langue courante. Si elle n'existe pas encore
// dans cette langue, repli sur le français (la langue source) avec un drapeau
// `fallback` pour afficher le bandeau.
export type ContentBase = 'pages' | 'resources' | 'maisons'

export async function useContentPage(base: ContentBase, path: MaybeRefOrGetter<string>) {
  const { locale } = useI18n()
  return await useAsyncData(
    () => `${base}-${locale.value}-${toValue(path)}`,
    async () => {
      const find = (l: string) =>
        queryCollection(`${base}_${l}` as never).path(toValue(path)).first() as Promise<Record<string, any> | null>
      const found = await find(locale.value)
      if (found) return { page: found, fallback: false }
      if (locale.value !== 'fr') {
        const fr = await find('fr')
        if (fr) return { page: fr, fallback: true }
      }
      return null
    },
    { watch: [locale] }
  )
}

// Lien mailto vers l'adresse du réseau, avec un objet prérempli.
export function useMailto() {
  const { public: { contactEmail } } = useRuntimeConfig()
  return {
    contactEmail,
    mailto: (subject?: string) =>
      subject ? `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}` : `mailto:${contactEmail}`
  }
}
