<script setup lang="ts">
// Bandeau sombre qui présente des lieux. Une carte avec `maison: <slug>` ouvre la fiche
// de la Maison dans une modale ; avec `to`, elle devient un lien. `image` est optionnelle
// (fichier dans public/images) : sans photo, un pictogramme la remplace.
type Item = { title: string, description: string, to?: string, maison?: string, meta?: string, image?: string, imageAlt?: string, status?: 'open' | 'prefiguration' }
defineProps<{ title: string, description?: string, items: Item[] }>()
const localePath = useLocalePath()
const { t } = useI18n()
// Résolu dans setup : resolveComponent() ne fonctionne pas dans le template.
const NuxtLink = resolveComponent('NuxtLink')
const selectedSlug = ref<string | null>(null)
</script>

<template>
  <section class="band-dark py-16 sm:py-24">
    <UContainer>
      <h2 class="text-center text-3xl font-bold text-balance sm:text-4xl">
        {{ title }}
      </h2>
      <p v-if="description" class="mx-auto mt-4 max-w-2xl text-center text-white/75 text-pretty">
        {{ description }}
      </p>
      <ul class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="item in items" :key="item.title">
          <component
            :is="item.maison ? 'button' : item.to ? NuxtLink : 'div'"
            :type="item.maison ? 'button' : undefined"
            :to="item.to && !item.maison ? localePath(item.to) : undefined"
            class="group flex h-full w-full flex-col items-center gap-3 rounded-md text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            @click="item.maison && (selectedSlug = item.maison)"
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.imageAlt ?? ''"
              class="aspect-[4/3] w-full rounded-md border-4 border-white object-cover"
            >
            <div v-else class="grid aspect-[4/3] w-full place-items-center rounded-md border-4 border-white/20 bg-white/5">
              <UIcon name="i-lucide-map-pin" class="size-12 text-coop-400" />
            </div>
            <h3 class="text-lg font-bold group-hover:underline">
              {{ item.title }}
            </h3>
            <p v-if="item.status" class="text-xs font-semibold tracking-wide text-coop-300 uppercase">
              {{ t(`status.${item.status}`) }}
            </p>
            <p class="text-sm text-white/75 text-pretty">
              {{ item.description }}
            </p>
            <p v-if="item.meta" class="mt-auto flex items-center justify-center gap-1.5 pt-1 text-xs text-white/75">
              <UIcon name="i-lucide-map-pin" class="size-4 shrink-0" />{{ item.meta }}
            </p>
          </component>
        </li>
      </ul>
    </UContainer>
    <MaisonModal v-model:slug="selectedSlug" />
  </section>
</template>
