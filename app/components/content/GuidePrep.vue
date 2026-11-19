<script setup lang="ts">
// Encadré « Avant de commencer » d'un guide : titre et liste (mini-balisage : voir richText).
defineProps<{ title: string, items: string[] }>()
// Décalage de niveau du titre : 1 dans une modale (le titre de la modale est le h2).
const headingOffset = inject<number>('headingOffset', 0)
</script>

<template>
  <section class="my-8 rounded-2xl bg-primary/10 p-5 ring ring-primary/25 sm:p-6">
    <component :is="`h${2 + headingOffset}`" class="mb-3 text-xl font-bold text-highlighted">
      {{ title }}
    </component>
    <ul class="space-y-2.5">
      <li v-for="item in items" :key="item" class="flex items-start gap-3 text-lg">
        <UIcon name="i-lucide-circle-check" class="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
        <span>
          <template v-for="(p, i) in richParts(item)" :key="i">
            <strong v-if="p.type !== 'text'">{{ p.value }}</strong>
            <template v-else>{{ p.value }}</template>
          </template>
        </span>
      </li>
    </ul>
  </section>
</template>
