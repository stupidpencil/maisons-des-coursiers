<script setup lang="ts">
// Guide pas à pas avec captures d'écran. Les parties se suivent et les étapes sont
// numérotées de bout en bout. Une étape : `text` (mini-balisage : voir richText),
// `image` (fichier dans public/), `tap` = [x, y] en % pour entourer l'endroit où
// appuyer, `final: true` pour la dernière étape (coche verte).
type Step = { text: string, image: string, alt?: string, tap?: [number, number], final?: boolean }
type Part = { title: string, description?: string, steps: Step[] }
const props = defineProps<{ legend?: string, parts: Part[] }>()
const { t } = useI18n()
// Décalage de niveau des titres : 1 dans une modale (le titre de la modale est le h2).
const headingOffset = inject<number>('headingOffset', 0)

// Numéro de la première étape de chaque partie.
const offsets = computed(() => props.parts.reduce<number[]>((acc, part, i) => {
  acc.push(i === 0 ? 1 : acc[i - 1]! + props.parts[i - 1]!.steps.length)
  return acc
}, []))
</script>

<template>
  <div class="my-8">
    <p v-if="legend" class="mb-2 flex items-center gap-3 text-base text-muted">
      <span class="size-6 shrink-0 rounded-full border-[3px] border-amber-400 shadow-[0_0_0_2px_var(--ui-text-highlighted)]" aria-hidden="true" />
      {{ legend }}
    </p>

    <section v-for="(part, pi) in parts" :key="part.title">
      <component :is="`h${2 + headingOffset}`" class="mt-10 font-bold text-highlighted" :class="headingOffset ? 'text-xl' : 'text-2xl'">
        {{ part.title }}
      </component>
      <p v-if="part.description" class="mt-1 mb-6 text-muted">
        {{ part.description }}
      </p>

      <ol class="mt-6 list-none p-0">
        <li
          v-for="(step, si) in part.steps"
          :key="si"
          class="relative pb-9 ps-14"
          :class="step.final ? '' : 'before:absolute before:start-5 before:top-12 before:bottom-1 before:w-0.5 before:-translate-x-1/2 before:rounded-full before:bg-(--ui-border-accented) rtl:before:translate-x-1/2'"
        >
          <span
            class="absolute start-0 top-0 grid size-10 place-items-center rounded-full text-xl font-bold text-white"
            :class="step.final ? 'bg-success' : 'bg-primary'"
            aria-hidden="true"
          >{{ step.final ? '✓' : offsets[pi]! + si }}</span>

          <p class="mb-3 text-lg leading-relaxed text-pretty">
            <template v-for="(p, i) in richParts(step.text)" :key="i">
              <strong v-if="p.type === 'bold'">{{ p.value }}</strong>
              <span
                v-else-if="p.type === 'button'"
                class="rounded-md bg-primary/10 px-2 py-0.5 text-base font-bold text-primary ring ring-primary/25 ring-inset [box-decoration-break:clone]"
              >{{ p.value }}</span>
              <template v-else>{{ p.value }}</template>
            </template>
          </p>

          <figure class="relative m-0 max-w-[17rem] overflow-hidden rounded-[1.4rem] border-[6px] border-neutral-900 bg-black leading-none">
            <img
              :src="step.image"
              :alt="step.alt ?? t('guide.screenOfStep', { n: offsets[pi]! + si })"
              loading="lazy"
              width="540"
              class="block h-auto w-full"
            >
            <span
              v-if="step.tap"
              class="guide-tap pointer-events-none absolute aspect-square w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-amber-400 shadow-[0_0_0_3px_rgba(0,0,0,0.45)]"
              :style="{ left: `${step.tap[0]}%`, top: `${step.tap[1]}%` }"
              aria-hidden="true"
            />
          </figure>
        </li>
      </ol>
    </section>
  </div>
</template>
