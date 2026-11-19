<script setup lang="ts">
// Vignette de carte OpenStreetMap non interactive : un ou plusieurs points, centrée sur
// le point (zoom à l'échelle de la ville) ou ajustée à l'ensemble des points. Occupe tout son parent
// (qui doit être `relative`). Attribution OpenStreetMap : à afficher à côté de la vignette.
type Point = { lat: number, lng: number, color: string }
const props = defineProps<{ points: Point[], zoom?: number }>()

const el = ref<HTMLElement>()
let map: import('leaflet').Map | undefined

onMounted(async () => {
  if (!props.points.length) return
  const L = (await import('leaflet')).default
  map = L.map(el.value!, {
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    touchZoom: false
  })
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)
  for (const p of props.points) {
    L.circleMarker([p.lat, p.lng], { radius: 9, color: '#ffffff', weight: 2, fillColor: p.color, fillOpacity: 1 }).addTo(map)
  }
  if (props.points.length === 1) {
    map.setView([props.points[0]!.lat, props.points[0]!.lng], props.zoom ?? 12)
  } else {
    map.fitBounds(props.points.map(p => [p.lat, p.lng] as [number, number]), { padding: [24, 24] })
  }
})

onBeforeUnmount(() => map?.remove())
</script>

<template>
  <div class="absolute inset-0 bg-white/5" aria-hidden="true">
    <UIcon name="i-lucide-map-pin" class="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 text-coop-400" />
    <!-- pointer-events-none : un clic traverse la carte et atteint la carte cliquable du parent -->
    <div ref="el" class="pointer-events-none absolute inset-0" />
  </div>
</template>
