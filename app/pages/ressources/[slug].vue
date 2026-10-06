<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const { data } = await useContentPage('resources', () => `/ressources/${String(route.params.slug)}`)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: t('error.pageNotFound'), fatal: true })
}

const page = computed(() => data.value!.page)

useSeoMeta({
  title: () => page.value.title,
  description: () => page.value.description
})
</script>

<template>
  <UContainer class="py-10">
    <UButton :to="localePath('/ressources')" color="neutral" variant="link" icon="i-lucide-arrow-left" class="mb-4 -ms-2.5">
      {{ t('resources.back') }}
    </UButton>


    <h1 class="text-3xl font-bold text-balance sm:text-4xl">
      {{ page.title }}
    </h1>
    <p v-if="page.description" class="mt-3 max-w-2xl text-lg text-muted text-pretty">
      {{ page.description }}
    </p>

    <div class="prose prose-neutral mt-8 max-w-3xl dark:prose-invert">
      <ContentRenderer :value="page" />
    </div>
  </UContainer>
</template>
