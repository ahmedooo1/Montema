# Système de Gestion des Cookies - Documentation

## Vue d'ensemble

Un système complet de gestion des cookies a été implémenté pour le site Montema, conforme au RGPD et aux réglementations sur la protection des données.

## Composants créés

### 1. **Hook personnalisé: `useCookieConsent`** 
**Fichier:** `src/hooks/useCookieConsent.ts`

Gère l'état du consentement des cookies avec les fonctionnalités suivantes:
- Stockage persistant dans `localStorage`
- Trois types de cookies: nécessaires, analyse, marketing
- Méthodes pour accepter tout, refuser, ou personnaliser

**Interface:**
```typescript
interface CookieConsent {
  necessary: boolean;  // Toujours true
  analytics: boolean;  // Peut être modifié
  marketing: boolean;  // Peut être modifié
  timestamp: number;   // Date du consentement
}
```

### 2. **Composant Banneau: `CookieBanner`**
**Fichier:** `src/components/CookieBanner.tsx`

Affiche un banneau en bas de la page avec:
- Message informatif sur les cookies
- 3 boutons d'action: "Refuser tout", "Personnaliser", "Accepter tout"
- Liens directs vers les politiques

**Apparence:** 
- Gradient gris foncé avec bordure supérieure
- Responsive (adapté mobile et desktop)
- Z-index élevé pour rester visible

### 3. **Pages de Politique**

#### a. `CookiesPolicy` 
**Fichier:** `src/pages/CookiesPolicy.tsx`

Page complète expliquant:
- Qu'est-ce qu'un cookie
- Types de cookies utilisés (nécessaires, analyse, marketing)
- Comment gérer les cookies
- Paramètres des navigateurs
- Contact RGPD

#### b. `PrivacyPolicy`
**Fichier:** `src/pages/PrivacyPolicy.tsx`

Politique de confidentialité incluant:
- Données collectées
- Utilisation des données
- Sécurité
- Droits RGPD
- Contact et coordination de consentement

#### c. `TermsOfService`
**Fichier:** `src/pages/TermsOfService.tsx`

Conditions d'utilisation avec:
- Licence d'utilisation
- Responsabilités de l'utilisateur
- Propriété intellectuelle
- Limitation de responsabilité
- Modifications possibles

### 4. **Paramètres des Cookies: `CookieSettings`**
**Fichier:** `src/pages/CookieSettings.tsx`

Page permettant à l'utilisateur de:
- Voir l'état des cookies nécessaires (toujours activés)
- Activer/désactiver les cookies d'analyse
- Activer/désactiver les cookies de marketing
- Sauvegarder les préférences
- Accepter/refuser tout

## Routes ajoutées à App.tsx

```
/politique-cookies        → Page de politique des cookies
/politique-confidentialite → Page de politique de confidentialité  
/conditions-utilisation   → Conditions d'utilisation
/parametres-cookies       → Paramètres de gestion des cookies
```

## Intégration dans le Footer

Le footer (LandingPage et FAQPage) a été mis à jour pour inclure:
- Lien vers "Politique de Confidentialité"
- Lien vers "Politique de Cookies"
- Lien vers "Gérer les Cookies"

## Fonctionnalités principales

### 1. Persistance des préférences
Les préférences de l'utilisateur sont stockées dans `localStorage` avec la clé `montema_cookie_consent`.

```json
{
  "necessary": true,
  "analytics": false,
  "marketing": false,
  "timestamp": 1706810000000
}
```

### 2. Affichage intelligent du banneau
- N'apparaît qu'une seule fois si l'utilisateur a déjà choisi
- Réapparaît si les données stockées sont supprimées
- Disparaît immédiatement après l'acceptation

### 3. Conformité RGPD
- ✅ Consentement explicite requis
- ✅ Cookies nécessaires toujours activés
- ✅ Possibilité de refuser les non-nécessaires
- ✅ Accès facile aux politiques
- ✅ Droit à oublier (reset du consentement)

## Utilisation du hook

```typescript
import { useCookieConsent } from '../hooks/useCookieConsent';

function MyComponent() {
  const { consent, showBanner, acceptAll, acceptNecessary, updateConsent } = useCookieConsent();
  
  if (consent?.analytics) {
    // Activer Google Analytics
  }
  
  if (consent?.marketing) {
    // Activer Facebook Pixel
  }
}
```

## Styles appliqués

- **Banneau:** Gradient slate 900→800, shadow-2xl
- **Pages:** Fond gradient slate 50→100, cartes blanches avec ombres
- **Boutons:** Divers styles avec hover states
- **Textes:** Hiérarchie claire avec contraste excellent

## Fichiers modifiés

1. `src/App.tsx` - Routes et CookieBanner ajoutés
2. `src/LandingPage.tsx` - Footer amélioré avec liens légaux
3. `src/pages/FAQPage.tsx` - Footer amélioré avec liens légaux

## Fichiers créés

1. `src/hooks/useCookieConsent.ts` - Hook de gestion
2. `src/components/CookieBanner.tsx` - Banneau de cookies
3. `src/pages/CookiesPolicy.tsx` - Politique de cookies
4. `src/pages/PrivacyPolicy.tsx` - Politique de confidentialité
5. `src/pages/TermsOfService.tsx` - Conditions d'utilisation
6. `src/pages/CookieSettings.tsx` - Gestion des préférences
7. `src/components/Footer.tsx` - Composant Footer réutilisable (optionnel)

## Bonnes pratiques implémentées

✅ **Séparation des responsabilités** - Hook dédié, composant réutilisable
✅ **TypeScript strict** - Interfaces bien définies
✅ **Accessibilité** - Semantic HTML, contraste adéquat
✅ **Performance** - Stockage client pour éviter les requêtes serveur
✅ **UX** - Design clair, messages explicites
✅ **SEO friendly** - Pages statiques avec contenu structuré
✅ **Mobile-first** - Responsive design complète
✅ **Maintenabilité** - Code bien organisé et commenté

## Points de développement futurs

1. Intégration réelle d'outils (Google Analytics, Facebook Pixel)
2. Base de données pour les consentements (backend)
3. Audit trail des changements de consentement
4. Support multi-langue pour les politiques
5. Animations plus fluides du banneau
6. Tests unitaires et d'intégration
