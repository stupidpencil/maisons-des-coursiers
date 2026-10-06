<script setup lang="ts">
// Bandeau d'accueil. Chaque bouton a `label` et soit `to` (chemin interne, localisé
// automatiquement), soit `mailSubject` (lien mailto vers l'adresse du réseau).
// `image` (ex. /images/paris.jpg, fichier dans public/images) l'affiche à droite.
type Cta = { label: string, to?: string, mailSubject?: string, icon?: string, variant?: 'solid' | 'outline' | 'subtle' }
defineProps<{ title: string, description?: string, headline?: string, ctas?: Cta[], image?: string, imageAlt?: string }>()
const localePath = useLocalePath()
const { mailto } = useMailto()
const href = (c: Cta) => (c.mailSubject ? mailto(c.mailSubject) : localePath(c.to ?? '/'))
</script>

<template>
  <UPageHero
    :title="title"
    :description="description"
    :headline="headline"
    :orientation="image ? 'horizontal' : 'vertical'"
    :ui="image ? { title: 'text-left', description: 'text-left', headline: 'justify-start', links: 'justify-start' } : {}"
  >
    <template v-if="ctas?.length" #links>
      <UButton
        v-for="c in ctas"
        :key="c.label"
        :to="href(c)"
        :external="!!c.mailSubject"
        size="xl"
        :variant="c.variant ?? 'solid'"
        :trailing-icon="c.icon ?? 'i-lucide-arrow-right'"
      >
        {{ c.label }}
      </UButton>
    </template>
    <img v-if="image" :src="image" :alt="imageAlt ?? ''" class="w-full rounded-md object-cover shadow-lg">
  </UPageHero>
</template>
