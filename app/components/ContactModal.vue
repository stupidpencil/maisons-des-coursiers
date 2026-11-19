<script setup lang="ts">
// Fenêtre de contact : l'adresse du réseau à copier, un bouton pour ouvrir la messagerie,
// et l'objet conseillé. Montée une seule fois dans le layout.
const { open, subject } = useContactModal()
const { contactEmail, mailto } = useMailto()
const { t } = useI18n()
const toast = useToast()

const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(contactEmail)
    copied.value = true
    toast.add({ title: t('contactModal.copied'), icon: 'i-lucide-check', color: 'success' })
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Presse-papiers indisponible : l'adresse reste sélectionnable à la main.
  }
}
</script>

<template>
  <UModal v-model:open="open" :title="t('contactModal.title')" :description="t('contactModal.description')">
    <template #body>
      <div class="space-y-6">
        <div class="flex items-center gap-2 rounded-md border border-default bg-elevated p-2 pl-4">
          <span class="min-w-0 flex-1 truncate text-lg font-semibold text-highlighted select-all">{{ contactEmail }}</span>
          <UButton
            :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
            :color="copied ? 'success' : 'primary'"
            @click="copy"
          >
            {{ copied ? t('contactModal.copiedShort') : t('contactModal.copy') }}
          </UButton>
        </div>

        <p v-if="subject" class="text-sm text-muted">
          {{ t('contactModal.subject') }} : <span class="font-medium text-highlighted">{{ subject }}</span>
        </p>

        <UButton
          :to="mailto(subject)"
          external
          variant="outline"
          trailing-icon="i-lucide-arrow-up-right"
          block
        >
          {{ t('contactModal.openMail') }}
        </UButton>

        <p class="text-xs text-muted text-pretty">
          {{ t('contactModal.safety') }}
        </p>
      </div>
    </template>
  </UModal>
</template>
