<script setup lang="ts">
// Encadré gris avec un titre, un texte et un bouton (lien interne `to` ou externe `href`).
type Cta = { label: string, to?: string, href?: string }
defineProps<{ title: string, description: string, note?: string, cta?: Cta }>()
const localePath = useLocalePath()
</script>

<template>
  <UContainer class="py-4">
    <div class="mx-auto max-w-3xl rounded-md border border-default bg-elevated p-8 text-center">
      <h3 class="text-lg font-bold">
        {{ title }}
      </h3>
      <p class="mt-3 text-muted text-pretty">
        {{ description }}
      </p>
      <UButton
        v-if="cta"
        :to="cta.href ?? localePath(cta.to ?? '/')"
        :external="!!cta.href"
        :target="cta.href ? '_blank' : undefined"
        trailing-icon="i-lucide-arrow-right"
        class="mt-5"
      >
        {{ cta.label }}
      </UButton>
      <p v-if="note" class="mt-4 text-xs text-muted">
        {{ note }}
      </p>
    </div>
  </UContainer>
</template>
