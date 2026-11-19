<script setup lang="ts">
type Cta = { label: string, to?: string, mailSubject?: string, variant?: 'solid' | 'outline' | 'subtle' }
defineProps<{ title: string, description?: string, ctas: Cta[] }>()
const localePath = useLocalePath()
const { openContact } = useContactModal()
const href = (c: Cta) => (c.mailSubject ? undefined : localePath(c.to ?? '/'))
</script>

<template>
  <UPageSection>
    <UPageCTA :title="title" :description="description" variant="subtle">
      <template #links>
        <UButton
          v-for="c in ctas"
          :key="c.label"
          :to="href(c)"
          @click="c.mailSubject && openContact(c.mailSubject)"
          size="lg"
          :variant="c.variant ?? 'solid'"
        >
          {{ c.label }}
        </UButton>
      </template>
    </UPageCTA>
  </UPageSection>
</template>
