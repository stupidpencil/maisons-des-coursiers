<script setup lang="ts">
// Un bloc par motif de contact. Le bouton ouvre le client mail avec l'objet prérempli.
type Item = { icon?: string, title: string, description: string, subject: string, cta: string }
defineProps<{ items: Item[] }>()
const { mailto, contactEmail } = useMailto()
const { t } = useI18n()
</script>

<template>
  <div class="page-container not-prose my-8">
    <UPageGrid class="lg:grid-cols-2">
      <UPageCard
        v-for="item in items"
        :key="item.subject"
        :icon="item.icon"
        :title="item.title"
        :description="item.description"
        variant="outline"
        :ui="{ wrapper: 'items-center text-center', container: 'items-center' }"
      >
        <UButton :to="mailto(item.subject)" external trailing-icon="i-lucide-mail" class="mx-auto w-fit">
          {{ item.cta }}
        </UButton>
      </UPageCard>
    </UPageGrid>
    <p class="mt-6 text-sm text-muted">
      {{ t('contact.address') }} : <a :href="mailto()" class="underline">{{ contactEmail }}</a>
    </p>
  </div>
</template>
