<script setup lang="ts">
const { locale, locales } = useI18n()

// Langue et sens de lecture du document (droite à gauche pour l'arabe).
useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
    dir: computed(() => locales.value.find(l => l.code === locale.value)?.dir ?? 'ltr')
  }
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
