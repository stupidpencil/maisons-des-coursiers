<script setup lang="ts">
// Grille d'éléments (icône, titre, texte). Sous la grille, après un trait : `afterTitle` et
// `after` (un court paragraphe), `ctas` (boutons : lien interne `to`, externe `href`, ou
// `mailSubject` pour ouvrir la fenêtre de contact) et `note` (petite ligne de source).
type Item = { icon?: string, title: string, description: string }
type Cta = { label: string, to?: string, href?: string, mailSubject?: string, variant?: 'solid' | 'outline' }
defineProps<{ title?: string, description?: string, headline?: string, items: Item[], columns?: number, variant?: 'cards' | 'plain', ctas?: Cta[], note?: string, afterTitle?: string, after?: string }>()
const localePath = useLocalePath()
const { openContact } = useContactModal()
const ctaTo = (c: Cta) => c.mailSubject !== undefined ? undefined : c.href ?? localePath(c.to ?? '/')
const ctaIcon = (c: Cta) => c.mailSubject !== undefined ? 'i-lucide-mail' : c.href ? 'i-lucide-arrow-up-right' : 'i-lucide-arrow-right'
</script>

<template>
  <UPageSection :title="title" :description="description" :headline="headline">
    <ul v-if="variant === 'plain'" class="grid gap-x-10 gap-y-8" :class="columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'">
      <li v-for="item in items" :key="item.title" class="flex items-start gap-4">
        <span v-if="item.icon" class="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10">
          <UIcon :name="item.icon" class="size-5 text-primary" aria-hidden="true" />
        </span>
        <div>
          <h3 class="text-lg font-bold text-highlighted">
            {{ item.title }}
          </h3>
          <p class="mt-1 text-muted text-pretty">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
    <UPageGrid v-else :class="columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'">
      <UPageCard
        v-for="item in items"
        :key="item.title"
        :icon="item.icon"
        :title="item.title"
        :description="item.description"
        variant="subtle"
        :ui="{ wrapper: 'items-center text-center', description: 'text-pretty' }"
      />
    </UPageGrid>
    <div v-if="ctas?.length || note || after" class="flex flex-col items-center gap-5 border-t border-default pt-10 text-center">
      <div v-if="afterTitle || after" class="max-w-2xl">
        <h3 v-if="afterTitle" class="text-lg font-bold text-highlighted">
          {{ afterTitle }}
        </h3>
        <p v-if="after" class="mt-2 text-muted text-pretty">
          {{ after }}
        </p>
      </div>
      <div v-if="ctas?.length" class="flex flex-wrap justify-center gap-x-6 gap-y-3">
        <UButton
          v-for="c in ctas"
          :key="c.label"
          :to="ctaTo(c)"
          :external="!!c.href"
          :target="c.href ? '_blank' : undefined"
          size="lg"
          :variant="c.variant ?? 'solid'"
          :trailing-icon="ctaIcon(c)"
          @click="c.mailSubject !== undefined && openContact(c.mailSubject || undefined)"
        >
          {{ c.label }}
        </UButton>
      </div>
      <p v-if="note" class="text-xs text-muted">
        {{ note }}
      </p>
    </div>
  </UPageSection>
</template>
