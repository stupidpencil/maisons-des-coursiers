<script setup lang="ts">
// Bandeau sombre (comme l'accueil) : valeurs ou principes, icône dans un rond rouge.
type Item = { icon: string, title: string, description: string }
defineProps<{ headline?: string, title: string, items: Item[] }>()
</script>

<template>
  <section class="band-dark py-16 sm:py-24">
    <UContainer>
      <p v-if="headline" class="mb-3 text-center text-sm font-semibold tracking-wide text-coop-300 uppercase">
        {{ headline }}
      </p>
      <h2 class="text-center text-3xl font-bold text-balance sm:text-4xl">
        {{ title }}
      </h2>
      <ul class="mx-auto mt-12 grid max-w-5xl gap-x-12 gap-y-10 sm:grid-cols-2">
        <li v-for="item in items" :key="item.title" class="flex items-start gap-5">
          <span class="grid size-12 shrink-0 place-items-center rounded-full bg-coop-600">
            <UIcon :name="item.icon" class="size-6 text-white" aria-hidden="true" />
          </span>
          <div>
            <h3 class="text-lg font-bold">
              {{ item.title }}
            </h3>
            <p class="mt-1 text-white/75 text-pretty">
              {{ item.description }}
            </p>
          </div>
        </li>
      </ul>
    </UContainer>
  </section>
</template>
