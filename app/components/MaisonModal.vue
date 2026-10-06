<script setup lang="ts">
// Fiche d'une Maison dans une modale. `v-model:slug` : identifiant de la Maison
// affichée (fichier content/data/maisons/<slug>.yml), `null` = modale fermée.
const slug = defineModel<string | null>('slug', { default: null })
const { t, locale } = useI18n()
const { mailto } = useMailto()

const { data: maisons } = await useAsyncData('maisons-data', () =>
  queryCollection('maisons').order('name', 'ASC').all()
)

// Texte de chaque fiche dans la langue courante, repli sur le français.
const { data: texts } = await useAsyncData(() => `maisons-texts-${locale.value}`, async () => {
  const fr = await queryCollection('maisons_fr').all()
  if (locale.value === 'fr') return fr
  const translated = await queryCollection(`maisons_${locale.value}` as never).all() as typeof fr
  const byPath = new Map(translated.map(p => [p.path, p]))
  return fr.map(p => byPath.get(p.path) ?? p)
}, { watch: [locale] })

const selected = computed(() => {
  const m = maisons.value?.find(x => x.slug === slug.value)
  if (!m) return null
  return { m, page: texts.value?.find(p => p.path === `/maisons/${m.slug}`) }
})

const open = computed({
  get: () => slug.value !== null,
  set: (v: boolean) => { if (!v) slug.value = null }
})

// « 2026-02-26 » s'affiche « 26 février 2026 » (ou « February 26, 2026 »).
const updatedLabel = computed(() => {
  const u = selected.value?.page?.updated
  const d = u ? new Date(`${u}T12:00:00`) : null
  return d && !Number.isNaN(d.getTime())
    ? d.toLocaleDateString(locale.value, { day: 'numeric', month: 'long', year: 'numeric' })
    : u
})

const facts = computed(() => {
  const s = selected.value
  if (!s) return []
  return [
    { icon: 'i-lucide-map-pin', label: t('maison.address'), value: s.m.address ?? s.m.city },
    s.page?.hours && { icon: 'i-lucide-clock', label: t('maison.hours'), value: s.page.hours },
    s.m.opened && { icon: 'i-lucide-calendar', label: t('maison.opened'), value: s.m.opened }
  ].filter(Boolean) as { icon: string, label: string, value: string }[]
})
</script>

<template>
  <UModal
    v-model:open="open"
    :title="selected?.m.name"
    :description="selected?.page?.description"
    :ui="{ content: 'max-w-2xl max-h-[85dvh] sm:max-h-[85dvh]', body: 'overflow-y-auto' }"
  >
    <template #body>
      <template v-if="selected">
        <UBadge :color="selected.m.status === 'open' ? 'primary' : 'warning'" variant="subtle" size="lg">
          {{ t(`status.${selected.m.status}`) }}
        </UBadge>

        <dl class="mt-4 grid gap-3 sm:grid-cols-3">
          <div v-for="f in facts" :key="f.label" class="rounded-lg border border-default p-3">
            <dt class="flex items-center gap-2 text-xs text-muted">
              <UIcon :name="f.icon" class="size-4" />{{ f.label }}
            </dt>
            <dd class="mt-1 text-sm font-medium">
              {{ f.value }}
            </dd>
          </div>
        </dl>
        <p v-if="selected.m.precision === 'city'" class="mt-3 text-sm text-muted">
          {{ t('map.approxCity') }}
        </p>

        <div v-if="selected.page" class="mt-6">
          <ContentRenderer :value="selected.page" />
        </div>
        <p v-if="selected.page?.updated" class="mt-6 text-sm text-muted">
          {{ t('maison.updatedOn', { date: updatedLabel }) }}
        </p>
      </template>
    </template>
    <template #footer>
      <UButton
        v-if="selected"
        :to="mailto(selected.m.name)"
        external
        trailing-icon="i-lucide-mail"
      >
        {{ t('maison.contact') }}
      </UButton>
    </template>
  </UModal>
</template>
