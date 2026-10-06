# CLAUDE.md — Site du réseau des Maisons des coursiers

Contexte pour Claude Code.

## Projet

Site vitrine du réseau des Maisons des coursiers et des livreurs, porté par CoopCycle Association. Cadrage : doc « Cadrage – Site du réseau des Maisons des coursiers ». Un seul webmaster centralise les demandes, modifie les fichiers avec des prompts Claude, travaille en local et met en production via Vercel. Pas de CMS.

## Stack

Nuxt 4, Nuxt UI 4, Nuxt Content 3, `@nuxtjs/i18n`, Leaflet (fond OpenStreetMap). Même socle que le POC de vitrine Cascade.

## Où est le contenu

- `content/fr/` : **langue source**. `content/en/` : traduction. Même arborescence et mêmes noms de fichiers dans chaque langue.
  - `pages/` : pages (`index`, `le-reseau`, `carte`, `ressources`, `contact`, `mentions-legales`), composées de composants MDC (`::page-hero`, `::feature-grid`, `::stats`, `::cta-band`, `::contact-cards`, `::maison-map`, `::resource-list`) dans `app/components/content/`.
  - `maisons/<slug>.md` : texte d'une Maison (frontmatter : `description`, `hours`, `updated`).
  - `ressources/<slug>.md` : une ressource (frontmatter : `title`, `description`, `order`, `icon`).
- `content/data/maisons/<slug>.yml` : données communes à toutes les langues (nom, ville, état `open` ou `prefiguration`, coordonnées, adresse). **La carte se construit depuis ces fichiers.**
- `i18n/locales/<langue>.json` : textes de l'interface (menu, libellés).

## Règles

- Toute modification de contenu se fait d'abord en français, puis Claude propose la traduction dans les autres dossiers de langue.
- Claude propose les traductions à partir du français ; une personne qui parle la langue les relit avant la mise en production. Le site n'affiche aucun bandeau sur les traductions.
- Quand on change l'état, l'adresse ou les horaires d'une Maison, mettre à jour `updated` dans les fichiers `maisons/*.md` de chaque langue.
- Dans le YAML, mettre entre guillemets toute valeur qui contient `: ` (deux-points suivi d'une espace), sinon elle est lue comme un objet.
- Pas de compte, pas de cookie de suivi, pas de mesure d'audience, pas de formulaire : le public inclut des personnes sans papiers. Le contact passe par des liens `mailto:` vers `NUXT_PUBLIC_CONTACT_EMAIL`.
- Les fiches de Maisons, les ressources et les cartes du réseau de l'accueil s'ouvrent dans des modales (composant `MaisonModal` pour les Maisons). Dans `::showcase`, une carte avec `maison: <slug>` ouvre la fiche de la Maison ; avec `to:`, elle est un lien.
- Dans les composants MDC, les chemins `to:` s'écrivent sans préfixe de langue : le composant l'ajoute. Dans le Markdown libre, un lien interne en anglais s'écrit `/en/contact`.
- Nom du site : « Maisons des coursiers ». Public prioritaire : les livreurs. Phrases courtes, langage simple.

## Ajouter une Maison

1. `content/data/maisons/<slug>.yml` (copier un fichier existant ; `precision: city` si la Maison n'a pas d'adresse).
2. `content/fr/maisons/<slug>.md`, puis la traduction dans `content/en/maisons/`.

## Ajouter une langue (ex. arabe)

1. `i18n/locales/ar.json` (copie de `fr.json`, traduite).
2. Une entrée dans `i18n.locales` de `nuxt.config.ts` avec `dir: 'rtl'`.
3. Ajouter `'ar'` à la liste `locales` de `content.config.ts`.
4. Un dossier `content/ar/` avec les mêmes fichiers. Les pages non traduites retombent sur le français.
5. Vérifier le sens de lecture de droite à gauche.

## Commandes

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # vérifier que le build passe avant de pousser
```

## Mise en production

Vercel déploie la branche principale. Il ne sert qu'à la production : on vérifie tout en local avant de fusionner. Variable d'environnement à régler sur Vercel : `NUXT_PUBLIC_CONTACT_EMAIL` (l'adresse du réseau).
