<script setup lang="ts">
type Item = { icon?: string, title: string, description: string }
defineProps<{ title?: string, description?: string, headline?: string, items: Item[], columns?: number }>()
</script>

<template>
  <UPageSection :title="title" :description="description" :headline="headline">
    <UPageGrid :class="columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'">
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
  </UPageSection>
</template>
