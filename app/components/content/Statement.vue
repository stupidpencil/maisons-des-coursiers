<script setup lang="ts">
// Phrase d'ouverture éditoriale : grand texte centré sur fond rouge très clair.
defineProps<{ headline?: string, title: string, description?: string }>()
</script>

<template>
  <section class="bg-primary/5 py-16 sm:py-24 dark:bg-primary/10">
    <UContainer class="max-w-4xl text-center">
      <p v-if="headline" class="mb-4 text-sm font-semibold tracking-wide text-primary uppercase">
        {{ headline }}
      </p>
      <h2 class="text-2xl leading-snug font-semibold text-balance text-highlighted sm:text-4xl">
        {{ title }}
      </h2>
      <p v-if="description" class="mx-auto mt-6 max-w-2xl text-lg text-muted text-pretty">
        {{ description }}
      </p>
    </UContainer>
  </section>
</template>
