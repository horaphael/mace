# Level Up — MACE

Application web React pour l'association **MACE**, permettant aux utilisateurs d'explorer cinq disciplines d'apprentissage dans un carousel 3D interactif et de soutenir l'association via un système de dons.

---

## Aperçu

L'application présente cinq disciplines :

| Glyph | Discipline | Description |
|-------|-----------|-------------|
| 𝄞 | **Lecture** | Fluidité de lecture et compréhension de textes |
| ∑ | **Calcul** | Bases arithmétiques et logique mathématique |
| ⌘ | **Écriture** | Expression écrite et enrichissement du vocabulaire |
| ◈ | **Mémoire** | Mémoire de travail et capacité de rétention |
| ✦ | **Logique** | Pensée analytique et reconnaissance de schémas |

---

## Fonctionnalités

- **Carousel 3D** : navigation par clic sur les chevrons, glisser-déposer souris ou swipe tactile
- **Page détail** : image, description, barre de progression et niveau affiché par discipline
- **Bloc de don** : choix parmi des montants prédéfinis (2 €, 5 €, 10 €, 20 €) ou saisie libre, avec confirmation animée
- **Responsive complet** : 5 breakpoints (xs < 600 px · sm 600–1023 px · md 1024–1279 px · lg 1280–1599 px · xl ≥ 1600 px)

---

## Stack technique

| Outil | Version |
|-------|---------|
| React | ^19.2.0 |
| Vite | ^7.3.1 |
| ESLint | ^9.39.1 |
| Police | Cormorant Garamond (Google Fonts) |

Aucune dépendance CSS externe — tous les styles sont écrits en inline JS.

---

## Installation et lancement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

Le serveur de développement tourne par défaut sur [http://localhost:5173](http://localhost:5173).

---

## Structure du projet

```
Hackaton-x-MACE/
├── public/               # Assets statiques
├── src/
│   ├── App.jsx           # Composant racine (carousel, page détail, dons)
│   ├── App.css           # Styles globaux complémentaires
│   ├── index.css         # Reset / variables CSS
│   └── main.jsx          # Point d'entrée React
├── index.html            # Template HTML
├── vite.config.js        # Configuration Vite
└── eslint.config.js      # Configuration ESLint
```

### Composants internes (`App.jsx`)

| Composant | Rôle |
|-----------|------|
| `useBreakpoint()` | Hook — renvoie le breakpoint actif selon `window.innerWidth` |
| `SkillCard` | Carte du carousel avec perspective 3D, barre de progression et bouton « Commencer » |
| `DetailPage` | Page de détail d'une discipline (image, description, progression) |
| `TipBlock` | Sélecteur de montant et formulaire de don avec confirmation |
| `App` | Orchestre le carousel, la navigation et l'état global |

---

## Licence

Voir [LICENSE](./LICENSE).
