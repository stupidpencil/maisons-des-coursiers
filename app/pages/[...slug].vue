<script setup lang="ts">
const route = useRoute()
const { t, locales } = useI18n()

// `route.path` contient le préfixe de langue (/en, …) sauf pour le français :
// on le retire pour obtenir le chemin du contenu, identique dans toutes les langues.
const prefix = new RegExp(`^/(${locales.value.map(l => l.code).join('|')})(?=/|$)`)
const contentPath = computed(() => route.path.replace(prefix, '').replace(/\/$/, '') || '/')

const { data } = await useContentPage('pages', contentPath)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: t('error.pageNotFound'), fatal: true })
}

const page = computed(() => data.value!.page)

useSeoMeta({
  title: () => page.value.title,
  description: () => page.value.description,
  ogTitle: () => page.value.title,
  ogDescription: () => page.value.description
})
</script>

<template>
  <div>
    <ContentRenderer :value="page" class="page-content" />
  </div>
</template>
