# Frontend ObRail Europe

Application web de gestion et de consultation de trajets ferroviaires européens, construite avec Next.js et React.

## Fonctionnalités

- Liste des routes dans un tableau.
- Filtre de recherche sur les trajets.
- Affichage des informations principales d’une route.
- Interface construite avec des composants Shadcn UI.

## Stack technique

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Shadcn UI
- Lucide React pour les icônes

## Prérequis

- Node.js récent
- pnpm recommandé

## Installation

```bash
pnpm install
```

## Lancer le projet en local

```bash
pnpm dev
```

Ensuite, ouvre [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Structure du projet

- `app/page.tsx` : page principale avec la liste des routes et le filtre.
- `app/components/RoutesTable.tsx` : tableau des trajets.
- `app/components/RoutesFilter.tsx` : filtres complémentaires.
- `app/trajet/page.tsx` : page de détail d’un trajet.
- `components/ui/` : composants d’interface réutilisables.

## Remarque

Les données affichées dans l’application sont actuellement statiques et servent de base pour le développement.
