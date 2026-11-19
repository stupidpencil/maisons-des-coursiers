<script setup lang="ts">
const route = useRoute()
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const { openContact } = useContactModal()

const footerColumns = computed(() => [
  {
    title: t('footer.discover'),
    links: [
      { label: t('nav.reseau'), to: localePath('/le-reseau') },
      { label: t('nav.etude'), to: localePath('/sante-course') },
      { label: t('footer.map'), to: localePath('/carte') }
    ]
  },
  {
    title: t('footer.learnMore'),
    links: [
      { label: t('nav.ressources'), to: localePath('/ressources') },
      { label: 'CoopCycle', to: 'https://coopcycle.org', external: true }
    ]
  },
  {
    title: t('footer.contact'),
    links: [
      { label: t('nav.contacter'), contact: '' },
      { label: t('footer.launch'), contact: t('footer.launchSubject') }
    ]
  }
])

const links = computed(() => [
  { label: t('nav.reseau'), to: localePath('/le-reseau') },
  { label: t('nav.etude'), to: localePath('/sante-course') },
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
        <UButton trailing-icon="i-lucide-mail" class="hidden whitespace-nowrap sm:inline-flex" @click="openContact()">
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

    <ContactModal />

    <USeparator />

    <UFooter :ui="{ top: 'border-b border-default' }">
      <template #top>
        <UContainer class="py-12 lg:py-16">
          <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
            <div>
              <NuxtLink :to="localePath('/')" :aria-label="t('site.name')">
                <AppLogo />
              </NuxtLink>
              <p class="mt-4 max-w-xs text-sm text-muted text-pretty">
                {{ t('footer.tagline') }}
              </p>
            </div>

            <nav v-for="column in footerColumns" :key="column.title" :aria-label="column.title">
              <h2 class="text-sm font-semibold text-highlighted">
                {{ column.title }}
              </h2>
              <ul class="mt-4 space-y-3">
                <li v-for="link in column.links" :key="link.label">
                  <button
                    v-if="'contact' in link"
                    type="button"
                    class="text-sm text-muted transition-colors hover:text-highlighted"
                    @click="openContact(link.contact || undefined)"
                  >
                    {{ link.label }}
                  </button>
                  <ULink
                    v-else
                    :to="link.to"
                    :external="link.external"
                    :target="link.external ? '_blank' : undefined"
                    class="text-sm text-muted transition-colors hover:text-highlighted"
                  >
                    {{ link.label }}
                  </ULink>
                </li>
              </ul>
            </nav>
          </div>
        </UContainer>
      </template>

      <template #left>
        <div class="flex items-center gap-2">
          <CoopyleftLogo class="size-4 shrink-0 text-muted" aria-hidden="true" />
          <p class="text-sm text-muted">
            {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
          </p>
        </div>
      </template>

      <template #right>
        <nav class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" :aria-label="t('footer.mentions')">
          <ULink :to="localePath('/mentions-legales')" class="text-sm text-muted transition-colors hover:text-highlighted">
            {{ t('footer.mentions') }}
          </ULink>
          <ULink :to="localePath('/confidentialite')" class="text-sm text-muted transition-colors hover:text-highlighted">
            {{ t('footer.privacy') }}
          </ULink>
        </nav>
      </template>
    </UFooter>
  </div>
</template>
