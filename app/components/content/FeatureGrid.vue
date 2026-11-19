<script setup lang="ts">
// Grille d'éléments (icône, titre, texte). `ctas` : boutons sous la grille (lien interne `to`
// ou externe `href`) ; `note` : petite ligne de source sous les boutons.
type Item = { icon?: string, title: string, description: string }
type Cta = { label: string, to?: string, href?: string, variant?: 'solid' | 'outline' }
defineProps<{ title?: string, description?: string, headline?: string, items: Item[], columns?: number, variant?: 'cards' | 'plain', ctas?: Cta[], note?: string }>()
const localePath = useLocalePath()
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
    <div v-if="ctas?.length || note" class="flex flex-col items-center gap-5 border-t border-default pt-10 text-center">
      <div v-if="ctas?.length" class="flex flex-wrap justify-center gap-x-6 gap-y-3">
        <UButton
          v-for="c in ctas"
          :key="c.label"
          :to="c.href ?? localePath(c.to ?? '/')"
          :external="!!c.href"
          :target="c.href ? '_blank' : undefined"
          size="lg"
          :variant="c.variant ?? 'solid'"
          :trailing-icon="c.href ? 'i-lucide-arrow-up-right' : 'i-lucide-arrow-right'"
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
