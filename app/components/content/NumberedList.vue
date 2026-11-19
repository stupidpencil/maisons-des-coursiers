<script setup lang="ts">
// Liste numérotée en grandes lignes séparées : un grand chiffre rouge, un titre, un texte.
type Item = { title: string, description: string }
defineProps<{ headline?: string, title?: string, description?: string, items: Item[] }>()
</script>

<template>
  <UPageSection :headline="headline" :title="title" :description="description">
    <ol class="mx-auto max-w-4xl list-none divide-y divide-default border-y border-default p-0">
      <li
        v-for="(item, i) in items"
        :key="item.title"
        class="grid gap-2 py-8 sm:grid-cols-[7rem_1fr] sm:gap-8"
      >
        <span class="text-5xl font-bold text-primary tabular-nums sm:text-6xl" aria-hidden="true">
          {{ String(i + 1).padStart(2, '0') }}
        </span>
        <div>
          <h3 class="text-xl font-bold text-highlighted">
            {{ item.title }}
          </h3>
          <p class="mt-2 text-lg text-muted text-pretty">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ol>
  </UPageSection>
</template>
