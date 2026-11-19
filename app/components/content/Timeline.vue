<script setup lang="ts">
// Frise chronologique verticale : date, titre, texte.
type Item = { date: string, title: string, description: string }
defineProps<{ headline?: string, title?: string, description?: string, items: Item[] }>()
</script>

<template>
  <UPageSection :headline="headline" :title="title" :description="description">
    <ol class="mx-auto max-w-3xl list-none space-y-10 border-s-2 border-(--ui-border-accented) ps-8">
      <li v-for="item in items" :key="item.date + item.title" class="relative">
        <span class="absolute top-1.5 -start-[2.55rem] size-4 rounded-full bg-primary ring-4 ring-(--ui-bg)" aria-hidden="true" />
        <p class="text-sm font-bold tracking-wide text-primary uppercase">
          {{ item.date }}
        </p>
        <h3 class="mt-1 text-lg font-bold text-highlighted">
          {{ item.title }}
        </h3>
        <p class="mt-1 text-muted text-pretty">
          {{ item.description }}
        </p>
      </li>
    </ol>
  </UPageSection>
</template>
