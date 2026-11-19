<script setup lang="ts">
// Motif abstrait des bandeaux : une grille de tuiles carrées, chacune avec une forme
// simple tirée du logo et du vélo (maison, sac de livraison, roue, quarts de cercle…).
// Tout est tiré au hasard à chaque visite : formes, couleurs, orientation, symétrie.
// Un clic sur le motif en tire un nouveau. Le tirage se fait dans le navigateur
// (le serveur rend une grille vide de la même taille), pour éviter un décalage à l'affichage.
const props = withDefaults(defineProps<{ cols?: number, rows?: number }>(), {
  cols: 3,
  rows: 3
})

// Couleurs : rouge du logo, bordeaux, rose, crème. Chaque tuile a un fond et une forme.
// Mêmes couleurs en mode sombre : des teintes assombries se confondaient entre elles.
// Seule la crème est un peu plus chaude, pour ne pas éblouir sur fond noir.
const COLORS = {
  red: 'fill-[#e62f1d]',
  dark: 'fill-[#2a0a0a]',
  pink: 'fill-coop-200',
  light: 'fill-coop-50 dark:fill-[#f6e6e1]'
} as const
type Color = keyof typeof COLORS
const COLOR_NAMES = Object.keys(COLORS) as Color[]
const SHAPES = ['house', 'box', 'wheel', 'quarter', 'half', 'circle', 'band', 'roof'] as const
type Shape = typeof SHAPES[number]
type Tile = { x: number, y: number, bg: Color, fg: Color, shape: Shape, rot: number, flip: boolean }

const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)]!

const tiles = ref<Tile[]>([])
const generation = ref(0)

function draw() {
  const grid: Tile[] = []
  const bgs: Color[][] = []
  for (let y = 0; y < props.rows; y++) {
    bgs[y] = []
    for (let x = 0; x < props.cols; x++) {
      // Deux tuiles voisines n'ont jamais le même fond.
      const taken = [bgs[y]![x - 1], bgs[y - 1]?.[x]]
      const bg = pick(COLOR_NAMES.filter(c => !taken.includes(c)))
      bgs[y]![x] = bg
      // La forme doit se voir sur son fond : pas de rose sur crème, ni l'inverse.
      const fg = pick(COLOR_NAMES.filter(c => c !== bg && !(bg === 'light' && c === 'pink') && !(bg === 'pink' && c === 'light')))
      // Le sac de livraison et la maison sont des formes fortes : une seule fois chacune.
      const used = grid.map(g => g.shape)
      const shape = pick(SHAPES.filter(s => !((s === 'box' || s === 'house') && used.includes(s))))
      grid.push({ x, y, bg, fg, shape, rot: pick([0, 90, 180, 270]), flip: Math.random() < 0.5 })
    }
  }
  tiles.value = grid
  generation.value++
}

onMounted(draw)
</script>

<template>
  <svg
    :viewBox="`0 0 ${cols * 100} ${rows * 100}`"
    class="hero-graphic block h-auto w-full cursor-pointer select-none"
    aria-hidden="true"
    focusable="false"
    @click="draw"
  >
    <g
      v-for="(t, i) in tiles"
      :key="`${generation}-${i}`"
      :transform="`translate(${t.x * 100} ${t.y * 100})`"
    >
      <rect width="100" height="100" :class="COLORS[t.bg]" />
      <g class="tile" :style="{ animationDelay: `${i * 60}ms` }">
        <g :transform="`rotate(${t.rot} 50 50)${t.flip ? ' translate(100 0) scale(-1 1)' : ''}`" :class="COLORS[t.fg]">
          <!-- Maison : le contour du logo -->
          <path v-if="t.shape === 'house'" d="M50 10 L88 44 V90 H12 V44 Z" />
          <!-- Sac de livraison : un cube vu de biais -->
          <g v-else-if="t.shape === 'box'">
            <rect x="14" y="38" width="48" height="48" />
            <path d="M14 34 L34 14 H86 L66 34 Z M66 38 L86 18 V66 L66 86 Z" />
          </g>
          <!-- Roue -->
          <g v-else-if="t.shape === 'wheel'">
            <path d="M50 12 A38 38 0 1 1 49.99 12 Z M50 26 A24 24 0 1 0 50.01 26 Z" fill-rule="evenodd" />
            <circle cx="50" cy="50" r="8" />
          </g>
          <path v-else-if="t.shape === 'quarter'" d="M0 100 V0 A100 100 0 0 1 100 100 Z" />
          <path v-else-if="t.shape === 'half'" d="M0 100 A50 50 0 0 1 100 100 Z" />
          <circle v-else-if="t.shape === 'circle'" cx="50" cy="50" r="34" />
          <!-- Bande en diagonale : la route -->
          <path v-else-if="t.shape === 'band'" d="M0 100 V68 L68 0 H100 V32 L32 100 Z" />
          <!-- Toit : deux chevrons -->
          <path v-else d="M0 60 L50 10 L100 60 V90 L50 40 L0 90 Z" />
        </g>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.tile {
  transform-box: fill-box;
  transform-origin: center;
  animation: tile-in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes tile-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tile {
    animation: none;
  }
}
</style>
