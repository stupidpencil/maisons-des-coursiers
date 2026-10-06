<script setup lang="ts">
const { locale, t } = useI18n()

// Les ressources non encore traduites s'affichent en français.
const { data: items } = await useAsyncData(() => `resources-list-${locale.value}`, async () => {
  const fr = await queryCollection('resources_fr').order('order', 'ASC').all()
  if (locale.value === 'fr') return fr
  const translated = await queryCollection(`resources_${locale.value}` as never).all() as typeof fr
  const byPath = new Map(translated.map(r => [r.path, r]))
  return fr.map(r => byPath.get(r.path) ?? r)
}, { watch: [locale] })

// Une seule modale, dont le contenu change selon la carte choisie.
const selected = ref<NonNullable<typeof items.value>[number] | null>(null)
const open = computed({
  get: () => selected.value !== null,
  set: (v: boolean) => { if (!v) selected.value = null }
})
</script>

<template>
  <div class="page-container not-prose my-8">
    <ul class="grid gap-4 sm:grid-cols-2">
      <li v-for="r in items" :key="r.path">
        <button
          type="button"
          class="flex h-full w-full flex-col items-center gap-2 rounded-lg text-center bg-default p-5 ring ring-default transition hover:bg-elevated/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-6"
          @click="selected = r"
        >
          <UIcon v-if="r.icon" :name="r.icon" class="size-5 shrink-0 text-primary" aria-hidden="true" />
          <span class="text-base font-semibold text-highlighted text-pretty">{{ r.title }}</span>
          <span class="text-[15px] text-muted text-pretty">{{ r.description }}</span>
          <span class="mt-auto pt-2 text-sm font-medium text-primary">{{ t('resources.open') }} →</span>
        </button>
      </li>
    </ul>

    <UModal
      v-model:open="open"
      :title="selected?.title"
      :description="selected?.description"
      :ui="{ content: 'max-w-2xl max-h-[85dvh] sm:max-h-[85dvh]', body: 'overflow-y-auto' }"
    >
      <template #body>
        <template v-if="selected">
          <ContentRenderer :value="selected" />
        </template>
      </template>
    </UModal>
  </div>
</template>
