<script setup lang="ts">
const route = useRoute()
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()

const links = computed(() => [
  { label: t('nav.reseau'), to: localePath('/le-reseau') },
  { label: t('nav.carte'), to: localePath('/carte') },
  { label: t('nav.ressources'), to: localePath('/ressources') },
  { label: t('nav.contact'), to: localePath('/contact') }
])

// Sélecteur de langue : on retire le préfixe de la langue courante du chemin,
// puis on ajoute celui de la langue choisie (le français n'a pas de préfixe).
const otherLocales = computed(() => locales.value.filter(l => l.code !== locale.value))
const localeLink = (code: string) => {
  const bare = route.path.replace(new RegExp(`^/(${locales.value.map(l => l.code).join('|')})(?=/|$)`), '') || '/'
  if (code === 'fr') return bare
  return bare === '/' ? `/${code}` : `/${code}${bare}`
}
</script>

<template>
  <div>
    <UHeader :to="localePath('/')" :title="t('site.name')" :ui="{ container: 'max-w-none' }">
      <template #title>
        <AppLogo />
      </template>

      <UNavigationMenu :items="links" variant="link" />

      <template #right>
        <UButton
          v-for="l in otherLocales"
          :key="l.code"
          :to="localeLink(l.code)"
          external
          color="neutral"
          variant="ghost"
          :aria-label="l.name"
          class="hidden uppercase sm:flex"
        >
          {{ l.code }}
        </UButton>
        <UColorModeButton class="hidden sm:flex" />
        <UButton :to="localePath('/contact')" trailing-icon="i-lucide-mail" class="hidden whitespace-nowrap sm:inline-flex">
          {{ t('nav.contacter') }}
        </UButton>
      </template>

      <template #body>
        <UNavigationMenu
          :items="links"
          orientation="vertical"
          class="-mx-2.5"
          :ui="{ link: 'text-lg py-3', linkLabel: 'text-lg' }"
        />
        <div class="mt-6 flex items-center gap-3">
          <UColorModeButton size="lg" />
          <UButton
            v-for="l in otherLocales"
            :key="l.code"
            :to="localeLink(l.code)"
            external
            color="neutral"
            variant="ghost"
            size="lg"
            class="uppercase"
          >
            {{ l.code }}
          </UButton>
        </div>
      </template>
    </UHeader>

    <UMain>
      <slot />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} {{ t('site.name') }} — {{ t('footer.porteur') }}
        </p>
      </template>
      <template #right>
        <UButton :to="localePath('/mentions-legales')" color="neutral" variant="link" size="sm">
          {{ t('footer.mentions') }}
        </UButton>
        <UButton :to="localePath('/contact')" color="neutral" variant="link" size="sm">
          {{ t('footer.contact') }}
        </UButton>
      </template>
    </UFooter>
  </div>
</template>
