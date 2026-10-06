<script setup lang="ts">
import type { Map as LeafletMap, LayerGroup } from 'leaflet'

const { t } = useI18n()

const { data: maisons } = await useAsyncData('maisons-data', () =>
  queryCollection('maisons').order('name', 'ASC').all()
)

type Filter = 'all' | 'open' | 'prefiguration'
const filter = ref<Filter>('all')
const shown = computed(() =>
  (maisons.value ?? []).filter(m => filter.value === 'all' || m.status === filter.value)
)

const filters = computed<{ value: Filter, label: string }[]>(() => [
  { value: 'all', label: t('map.all') },
  { value: 'open', label: t('map.open') },
  { value: 'prefiguration', label: t('map.prefiguration') }
])

// Maison dont la fiche est ouverte dans la modale (carte de la liste ou point de la carte).
const selectedSlug = ref<string | null>(null)

const COLORS = { open: '#dc2626', prefiguration: '#f59e0b' } as const

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' })[c]!)

const mapEl = ref<HTMLElement>()
let map: LeafletMap | undefined
let layer: LayerGroup | undefined
let L: typeof import('leaflet') | undefined

function draw() {
  if (!map || !layer || !L) return
  layer.clearLayers()
  const points: [number, number][] = []
  for (const m of shown.value) {
    L.circleMarker([m.lat, m.lng], {
      radius: m.precision === 'city' ? 9 : 11,
      color: '#ffffff',
      weight: 2,
      fillColor: COLORS[m.status],
      fillOpacity: m.precision === 'city' ? 0.75 : 1
    })
      .bindTooltip(escapeHtml(m.name))
      .on('click', () => { selectedSlug.value = m.slug })
      .addTo(layer)
    points.push([m.lat, m.lng])
  }
  if (points.length) map.fitBounds(points, { padding: [48, 48], maxZoom: 12 })
}

onMounted(async () => {
  L = (await import('leaflet')).default
  map = L.map(mapEl.value!, { scrollWheelZoom: false }).setView([46.6, 2.4], 5)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: t('map.attribution')
  }).addTo(map)
  layer = L.layerGroup().addTo(map)
  draw()
})

watch(shown, draw)
onBeforeUnmount(() => map?.remove())
</script>

<template>
  <div class="page-container not-prose my-8">
    <div class="mb-3 flex flex-wrap items-center gap-2">
      <UButton
        v-for="f in filters"
        :key="f.value"
        size="sm"
        color="neutral"
        :variant="filter === f.value ? 'solid' : 'outline'"
        @click="filter = f.value"
      >
        {{ f.label }}
      </UButton>
      <span class="ms-auto flex items-center gap-3 text-sm text-muted">
        <span class="flex items-center gap-1.5"><span class="size-3 rounded-full" style="background:#dc2626" />{{ t('status.open') }}</span>
        <span class="flex items-center gap-1.5"><span class="size-3 rounded-full" style="background:#f59e0b" />{{ t('status.prefiguration') }}</span>
      </span>
    </div>

    <div
      ref="mapEl"
      role="application"
      :aria-label="t('map.label')"
      class="h-[26rem] w-full rounded-lg border border-default bg-muted"
    />

    <h2 class="mt-10 mb-4 text-xl font-semibold">
      {{ t('map.list') }}
    </h2>
    <ul class="grid gap-4 sm:grid-cols-2">
      <li v-for="m in shown" :key="m.slug">
        <button
          type="button"
          class="flex h-full w-full flex-col items-center gap-2 rounded-lg bg-default p-5 text-center ring ring-default transition hover:bg-elevated/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-6"
          @click="selectedSlug = m.slug"
        >
          <span class="text-base font-semibold text-highlighted text-pretty">{{ m.name }}</span>
          <span class="flex flex-wrap items-center justify-center gap-2 text-[15px] text-muted">
            <UBadge :color="m.status === 'open' ? 'primary' : 'warning'" variant="subtle">
              {{ t(`status.${m.status}`) }}
            </UBadge>
            <span>{{ m.address ?? m.city }}</span>
          </span>
        </button>
      </li>
    </ul>

    <MaisonModal v-model:slug="selectedSlug" />
  </div>
</template>
