# Maisons des coursiers — site du réseau

Site vitrine du réseau des Maisons des coursiers et des livreurs (carte des Maisons, centre de ressources, contact). Français par défaut, anglais disponible.

Voir [CLAUDE.md](./CLAUDE.md) pour la structure du contenu et le processus de mise à jour.

```bash
pnpm install
pnpm dev
```

Copier `.env.example` en `.env` pour régler l'adresse de contact.

## Avant la mise en ligne publique

- Remplacer l'adresse fictive `contact@maisondescoursiers.example` (variable `NUXT_PUBLIC_CONTACT_EMAIL`, en local et sur Vercel).
- Compléter les mentions légales (éditeur, directeur de la publication) dans `content/fr/pages/mentions-legales.md` et la version anglaise.
- Vérifier l'adresse de la Maison de Paris, le code postal de Bordeaux et ses horaires (14 h à 19 h sur la page CoopCycle, 13 h à 18 h dans le kit d'essaimage).
- Ajouter des photos si on en a (droits à vérifier) : les déposer dans `public/images/` et renseigner `image:` dans `::page-hero` ou `::showcase`.
- Faire relire les traductions anglaises.
- Renseigner Strasbourg, Lyon et Marseille (porteurs, état), et leur emplacement si une adresse existe.
