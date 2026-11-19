<script setup lang="ts">
// Bandeau d'accueil. Chaque bouton a `label` et soit `to` (chemin interne, localisé
// automatiquement), soit `href` (lien vers un autre site, ouvert dans un nouvel onglet),
// soit `mailSubject` (ouvre la fenêtre de contact, avec cet objet conseillé).
// `image` (ex. /images/paris.jpg, fichier dans public/images) l'affiche à droite.
// Sans image, un motif graphique abstrait (HeroGraphic), tiré au hasard, prend sa place.
// `graphic: large` : motif plus grand (accueil) ; `graphic: none` : pas de motif.
type Cta = { label: string, to?: string, href?: string, mailSubject?: string, icon?: string, variant?: 'solid' | 'outline' | 'subtle' }
const props = defineProps<{ title: string, description?: string, headline?: string, ctas?: Cta[], image?: string, imageAlt?: string, graphic?: 'large' | 'none' }>()
const side = computed(() => !!props.image || props.graphic !== 'none')
const localePath = useLocalePath()
const { openContact } = useContactModal()
const href = (c: Cta) => c.mailSubject ? undefined : c.href ?? localePath(c.to ?? '/')
</script>

<template>
  <UPageHero
    :title="title"
    :description="description"
    :headline="headline"
    :orientation="side ? 'horizontal' : 'vertical'"
    :ui="side ? { container: 'lg:py-28', title: 'text-left', description: 'text-left', headline: 'justify-start', links: 'justify-start' } : {}"
  >
    <template v-if="ctas?.length" #links>
      <UButton
        v-for="c in ctas"
        :key="c.label"
        :to="href(c)"
        :external="!!c.href"
        :target="c.href ? '_blank' : undefined"
        @click="c.mailSubject && openContact(c.mailSubject)"
        size="xl"
        :variant="c.variant ?? 'solid'"
        :trailing-icon="c.icon ?? (c.href ? 'i-lucide-arrow-up-right' : 'i-lucide-arrow-right')"
      >
        {{ c.label }}
      </UButton>
    </template>
    <img v-if="image" :src="image" :alt="imageAlt ?? ''" class="w-full rounded-md object-cover shadow-lg">
    <HeroGraphic
      v-else-if="graphic !== 'none'"
      :cols="graphic === 'large' ? 4 : 3"
      :rows="graphic === 'large' ? 4 : 3"
      class="mx-auto w-full lg:mr-0"
      :class="graphic === 'large' ? 'max-w-xs sm:max-w-md lg:max-w-lg' : 'max-w-[14rem] sm:max-w-xs lg:max-w-sm'"
    />
  </UPageHero>
</template>
