<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { mailto } = useMailto()

const slug = computed(() => String(route.params.slug))

// Données communes (coordonnées, état) + texte dans la langue courante.
const { data: maison } = await useAsyncData(() => `maison-${slug.value}`, () =>
  queryCollection('maisons').where('slug', '=', slug.value).first()
)
const { data: content } = await useContentPage('maisons', () => `/maisons/${slug.value}`)

if (!maison.value) {
  throw createError({ statusCode: 404, statusMessage: t('error.pageNotFound'), fatal: true })
}

const page = computed(() => content.value?.page)

useSeoMeta({
  title: () => maison.value!.name,
  description: () => page.value?.description
})

// « 2026-02-26 » s'affiche « 26 février 2026 » (ou « February 26, 2026 »).
const updatedLabel = computed(() => {
  const d = page.value?.updated ? new Date(`${page.value.updated}T12:00:00`) : null
  return d && !Number.isNaN(d.getTime())
    ? d.toLocaleDateString(locale.value, { day: 'numeric', month: 'long', year: 'numeric' })
    : page.value?.updated
})

const facts = computed(() => {
  const m = maison.value!
  const p = page.value
  return [
    { icon: 'i-lucide-map-pin', label: t('maison.address'), value: m.address ?? m.city },
    p?.hours && { icon: 'i-lucide-clock', label: t('maison.hours'), value: p.hours },
    m.opened && { icon: 'i-lucide-calendar', label: t('maison.opened'), value: m.opened }
  ].filter(Boolean) as { icon: string, label: string, value: string }[]
})
</script>

<template>
  <UContainer class="py-10">
    <UButton :to="localePath('/carte')" color="neutral" variant="link" icon="i-lucide-arrow-left" class="mb-4 -ms-2.5">
      {{ t('maison.back') }}
    </UButton>


    <div class="flex flex-wrap items-center gap-3">
      <h1 class="text-3xl font-bold text-balance sm:text-4xl">
        {{ maison!.name }}
      </h1>
      <UBadge :color="maison!.status === 'open' ? 'primary' : 'warning'" variant="subtle" size="lg">
        {{ t(`status.${maison!.status}`) }}
      </UBadge>
    </div>
    <p v-if="page?.description" class="mt-3 max-w-2xl text-lg text-muted text-pretty">
      {{ page.description }}
    </p>

    <dl class="mt-8 grid gap-4 sm:grid-cols-3">
      <div v-for="f in facts" :key="f.label" class="rounded-lg border border-default p-4">
        <dt class="flex items-center gap-2 text-sm text-muted">
          <UIcon :name="f.icon" class="size-4" />{{ f.label }}
        </dt>
        <dd class="mt-1 font-medium">
          {{ f.value }}
        </dd>
      </div>
    </dl>
    <p v-if="maison!.precision === 'city'" class="mt-3 text-sm text-muted">
      {{ t('map.approxCity') }}
    </p>

    <div v-if="page" class="prose prose-neutral mt-8 max-w-3xl dark:prose-invert">
      <ContentRenderer :value="page" />
    </div>

    <p v-if="page?.updated" class="mt-8 text-sm text-muted">
      {{ t('maison.updatedOn', { date: updatedLabel }) }}
    </p>

    <UPageCard :title="t('maison.help')" variant="subtle" class="mt-10 max-w-3xl">
      <UButton :to="mailto(`${maison!.name}`)" external trailing-icon="i-lucide-mail" class="w-fit">
        {{ t('maison.contact') }}
      </UButton>
    </UPageCard>
  </UContainer>
</template>
