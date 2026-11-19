<script setup lang="ts">
// Encadré d'introduction (rouge clair du site) : texte en défilement libre dans le slot.
// Utilisé tel quel dans le Markdown (`::intro-note`) ou ajouté automatiquement sur le
// premier paragraphe du contenu des modales (voir `introAsNote`).
</script>

<template>
  <div class="my-5 flex items-start gap-3 rounded-xl bg-primary/10 p-4 text-base leading-relaxed text-default ring ring-primary/20 ring-inset sm:p-5">
    <UIcon name="i-lucide-lightbulb" class="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
    <p class="m-0 text-pretty">
      <slot />
    </p>
  </div>
</template>
