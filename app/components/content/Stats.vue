<script setup lang="ts">
// Grands chiffres : un trait rouge au-dessus, le chiffre en très grand, une légende courte.
// `headline` : petit surtitre en capitales. `dark` : bandeau sombre (chiffres forts).
// `tinted` : fond gris clair. `source` : ligne de source en petit sous les chiffres.
// `cta` : bouton sous les chiffres (lien interne `to` ou externe `href`).
type Item = { value: string, label: string }
type Cta = { label: string, to?: string, href?: string }
defineProps<{
  headline?: string
  title?: string
  description?: string
  items: Item[]
  source?: string
  tinted?: boolean
  dark?: boolean
  cta?: Cta
}>()
const localePath = useLocalePath()
</script>

<template>
  <section
    class="py-16 sm:py-24"
    :class="dark ? 'band-dark' : tinted ? 'bg-elevated' : ''"
  >
    <UContainer>
      <div v-if="headline || title || description" class="mb-12 max-w-3xl">
        <p
          v-if="headline"
          class="mb-3 text-sm font-semibold tracking-wide uppercase"
          :class="dark ? 'text-coop-300' : 'text-primary'"
        >
          {{ headline }}
        </p>
        <h2
          v-if="title"
          class="text-3xl font-bold text-balance sm:text-4xl"
          :class="dark ? '' : 'text-highlighted'"
        >
          {{ title }}
        </h2>
        <p
          v-if="description"
          class="mt-4 text-lg text-pretty"
          :class="dark ? 'text-white/75' : 'text-muted'"
        >
          {{ description }}
        </p>
      </div>

      <dl class="grid gap-x-8 gap-y-10 sm:grid-cols-2" :class="items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : ''">
        <div
          v-for="item in items"
          :key="item.label"
          class="flex flex-col border-t-4 pt-5"
          :class="dark ? 'border-coop-400' : 'border-primary'"
        >
          <dd
            class="order-1 text-5xl font-bold tracking-tight tabular-nums sm:text-6xl"
            :class="dark ? 'text-coop-300' : 'text-primary'"
          >
            {{ item.value }}
          </dd>
          <dt
            class="order-2 mt-3 text-pretty"
            :class="dark ? 'text-white/80' : 'text-muted'"
          >
            {{ item.label }}
          </dt>
        </div>
      </dl>

      <div v-if="cta || source" class="mt-12 flex flex-col items-start gap-6">
        <UButton
          v-if="cta"
          :to="cta.href ?? localePath(cta.to ?? '/')"
          :external="!!cta.href"
          :target="cta.href ? '_blank' : undefined"
          trailing-icon="i-lucide-arrow-right"
          size="lg"
          :color="dark ? 'neutral' : 'primary'"
          :class="dark ? 'bg-white text-coop-900 hover:bg-coop-50' : ''"
        >
          {{ cta.label }}
        </UButton>
        <p v-if="source" class="text-xs" :class="dark ? 'text-white/60' : 'text-muted'">
          {{ source }}
        </p>
      </div>
    </UContainer>
  </section>
</template>
