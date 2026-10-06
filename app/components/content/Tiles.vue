<script setup lang="ts">
// Tuiles rouges à fond plein : icône, titre, court texte.
type Item = { icon: string, title: string, description: string }
defineProps<{ title?: string, description?: string, items: Item[] }>()
</script>

<template>
  <UPageSection :title="title" :description="description">
    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="item in items"
        :key="item.title"
        class="flex flex-col items-center gap-3 rounded-md bg-coop-600 p-6 text-center text-white"
      >
        <UIcon :name="item.icon" class="size-10" />
        <h3 class="text-lg font-bold">
          {{ item.title }}
        </h3>
        <p class="text-sm text-white/90 text-pretty">
          {{ item.description }}
        </p>
      </li>
    </ul>
  </UPageSection>
</template>
