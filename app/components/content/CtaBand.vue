<script setup lang="ts">
type Cta = { label: string, to?: string, mailSubject?: string, variant?: 'solid' | 'outline' | 'subtle' }
defineProps<{ title: string, description?: string, ctas: Cta[] }>()
const localePath = useLocalePath()
const { mailto } = useMailto()
const href = (c: Cta) => (c.mailSubject ? mailto(c.mailSubject) : localePath(c.to ?? '/'))
</script>

<template>
  <UPageSection>
    <UPageCTA :title="title" :description="description" variant="subtle">
      <template #links>
        <UButton
          v-for="c in ctas"
          :key="c.label"
          :to="href(c)"
          :external="!!c.mailSubject"
          size="lg"
          :variant="c.variant ?? 'solid'"
        >
          {{ c.label }}
        </UButton>
      </template>
    </UPageCTA>
  </UPageSection>
</template>
