<script setup lang="ts">
// Paroles de livreurs ou de partenaires : citation en grand, nom en dessous.
type Item = { text: string, author: string }
defineProps<{ headline?: string, title?: string, description?: string, items: Item[], note?: string }>()
</script>

<template>
  <UPageSection :headline="headline" :title="title" :description="description">
    <ul class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <li v-for="item in items" :key="item.author">
        <figure class="flex h-full flex-col gap-4 rounded-md bg-primary/5 p-6 dark:bg-primary/10">
          <UIcon name="i-lucide-quote" class="size-7 text-primary" aria-hidden="true" />
          <blockquote class="flex-1 text-lg leading-snug font-medium text-highlighted text-pretty">
            {{ item.text }}
          </blockquote>
          <figcaption class="text-sm text-muted">
            {{ item.author }}
          </figcaption>
        </figure>
      </li>
    </ul>
    <p v-if="note" class="text-xs text-muted">
      {{ note }}
    </p>
  </UPageSection>
</template>
