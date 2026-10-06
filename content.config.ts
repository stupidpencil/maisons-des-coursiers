import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Une collection par langue et par type de contenu. Le français est la langue
// source ; les autres dossiers (content/en, …) en sont les traductions.
const locales = ['fr', 'en']

const collections: Record<string, ReturnType<typeof defineCollection>> = {
  // Données communes à toutes les langues (coordonnées, état) : un fichier par Maison.
  maisons: defineCollection({
    type: 'data',
    source: 'data/maisons/*.yml',
    schema: z.object({
      slug: z.string(),
      name: z.string(),
      city: z.string(),
      status: z.enum(['open', 'prefiguration']),
      lat: z.number(),
      lng: z.number(),
      precision: z.enum(['address', 'city']),
      address: z.string().optional(),
      opened: z.string().optional()
    })
  })
}

for (const l of locales) {
  collections[`pages_${l}`] = defineCollection({
    type: 'page',
    source: { include: `${l}/pages/**`, prefix: '' },
    schema: z.object({})
  })
  collections[`resources_${l}`] = defineCollection({
    type: 'page',
    source: { include: `${l}/ressources/**`, prefix: '/ressources' },
    schema: z.object({ order: z.number().optional(), icon: z.string().optional() })
  })
  collections[`maisons_${l}`] = defineCollection({
    type: 'page',
    source: { include: `${l}/maisons/**`, prefix: '/maisons' },
    schema: z.object({
      hours: z.string().optional(),
      updated: z.string().optional()
    })
  })
}

export default defineContentConfig({ collections })
