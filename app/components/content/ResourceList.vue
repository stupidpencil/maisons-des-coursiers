<script setup lang="ts">
const { locale, t } = useI18n()
// Dans la modale, le titre de la modale est le h2 : les titres du contenu descendent d'un niveau.
provide('headingOffset', 1)

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
  set: (v: boolean) => {
    if (!v) {
      selected.value = null
      fullscreen.value = false
    }
  }
})

// Bouton « plein écran » : utile pour suivre un guide pas à pas sur téléphone ou ordinateur.
const fullscreen = ref(false)
const modalUi = computed(() => ({
  content: fullscreen.value ? '' : 'max-w-2xl max-h-[85dvh] sm:max-h-[85dvh]',
  header: 'shrink-0 items-start py-4 pe-24',
  title: 'text-2xl font-bold text-balance',
  body: 'min-h-0 overflow-y-auto',
  footer: 'shrink-0'
}))
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
      :fullscreen="fullscreen"
      :ui="modalUi"
    >
      <template #actions>
        <UButton
          :icon="fullscreen ? 'i-lucide-minimize-2' : 'i-lucide-maximize-2'"
          :aria-label="fullscreen ? t('resources.exitFullscreen') : t('resources.fullscreen')"
          :title="fullscreen ? t('resources.exitFullscreen') : t('resources.fullscreen')"
          color="neutral"
          variant="ghost"
          class="absolute end-12 top-4"
          @click="fullscreen = !fullscreen"
        />
      </template>
      <template #body>
        <template v-if="selected">
          <ContentRenderer :value="shiftHeadings(introAsNote(selected), 1)" :class="fullscreen ? 'mx-auto max-w-3xl' : ''" />
        </template>
      </template>
    </UModal>
  </div>
</template>
