<script setup lang="ts">
// Grands chiffres centrés. `source` : ligne de source sous les chiffres.
type Item = { value: string, label: string }
defineProps<{ title?: string, description?: string, items: Item[], source?: string }>()
</script>

<template>
  <UPageSection :title="title" :description="description">
    <dl class="mx-auto grid max-w-4xl gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="item in items" :key="item.label">
        <dd class="text-5xl font-bold tabular-nums">
          {{ item.value }}
        </dd>
        <dt class="mt-2 text-sm text-muted text-pretty">
          {{ item.label }}
        </dt>
      </div>
    </dl>
    <p v-if="source" class="mt-8 text-center text-xs text-muted">
      {{ source }}
    </p>
  </UPageSection>
</template>
