<script setup lang="ts">
// FAQ sur fond sombre. Chaque question a `answer` (texte), et au besoin `points`
// (liste à puces) et `after` (texte sous la liste). Les données structurées
// FAQPage sont ajoutées pour les moteurs de recherche.
type Item = { question: string, answer: string, points?: string[], after?: string }
const props = defineProps<{ title?: string, description?: string, items: Item[] }>()

const accordion = computed(() => props.items.map((it, i) => ({ label: it.question, value: String(i), slot: 'answer' as const, item: it })))

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: computed(() => JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': props.items.map(it => ({
        '@type': 'Question',
        'name': it.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': [it.answer, ...(it.points ?? []), it.after].filter(Boolean).join(' ') }
      }))
    }))
  }]
})
</script>

<template>
  <section class="band-dark py-16 sm:py-24">
    <UContainer class="grid gap-10 lg:grid-cols-[1fr_2fr]">
      <div>
        <h2 class="text-3xl font-bold sm:text-4xl">
          {{ title }}
        </h2>
        <p v-if="description" class="mt-4 text-white/75 text-pretty">
          {{ description }}
        </p>
      </div>
      <UAccordion
        :items="accordion"
        type="single"
        collapsible
        :ui="{
          root: 'w-full',
          item: 'mb-3 rounded-md border border-white/30 last:mb-0',
          trigger: 'px-4 py-4 text-start text-sm font-bold text-white hover:bg-white/5',
          trailingIcon: 'text-white',
          body: 'text-sm text-white/85'
        }"
      >
        <template #answer="{ item }">
          <div class="space-y-3 px-4 pb-5 text-pretty">
            <p>{{ item.item.answer }}</p>
            <ul v-if="item.item.points?.length" class="list-disc space-y-1 ps-5">
              <li v-for="p in item.item.points" :key="p">
                {{ p }}
              </li>
            </ul>
            <p v-if="item.item.after">
              {{ item.item.after }}
            </p>
          </div>
        </template>
      </UAccordion>
    </UContainer>
  </section>
</template>
