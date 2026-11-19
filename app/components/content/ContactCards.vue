<script setup lang="ts">
// Les raisons de nous écrire (icône, titre, texte), puis un seul bouton qui ouvre
// la fenêtre de contact avec l'adresse à copier.
type Item = { icon?: string, title: string, description: string }
defineProps<{ items: Item[] }>()
const { contactEmail } = useMailto()
const { openContact } = useContactModal()
const { t } = useI18n()
</script>

<template>
  <div class="page-container not-prose my-8">
    <ul class="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      <li v-for="item in items" :key="item.title" class="flex items-start gap-4">
        <span v-if="item.icon" class="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10">
          <UIcon :name="item.icon" class="size-5 text-primary" aria-hidden="true" />
        </span>
        <div>
          <h2 class="text-lg font-bold text-highlighted">
            {{ item.title }}
          </h2>
          <p class="mt-1 text-muted text-pretty">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
    <div class="mt-12 flex flex-col items-start gap-4 border-t border-default pt-10">
      <UButton size="xl" trailing-icon="i-lucide-mail" @click="openContact()">
        {{ t('nav.contacter') }}
      </UButton>
      <p class="text-sm text-muted">
        {{ t('contact.address') }} : <button type="button" class="underline" @click="openContact()">{{ contactEmail }}</button>
      </p>
    </div>
  </div>
</template>
