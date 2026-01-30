# Montema API Server

Backend API pour le site Montema avec MySQL.

## Installation

```bash
cd server
npm install
```

## Configuration

1. Copier `.env.example` vers `.env`
2. Configurer les variables d'environnement :
   - Base de données MySQL
   - Configuration email SMTP

## Base de données

Exécuter le script SQL pour créer la base :

```bash
mysql -u root -p < src/database/schema.sql
```

Ou via phpMyAdmin/MySQL Workbench.

## Démarrage

```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

L'API sera disponible sur `http://localhost:3001`

## Endpoints API

### Services
- `GET /api/services` - Liste tous les services
- `GET /api/services/:id` - Détails d'un service
- `POST /api/services` - Créer un service
- `PUT /api/services/:id` - Modifier un service
- `DELETE /api/services/:id` - Supprimer un service

### Galerie
- `GET /api/gallery` - Liste toutes les réalisations
- `GET /api/gallery?category=Cuisines` - Filtrer par catégorie
- `POST /api/gallery` - Ajouter une réalisation
- `PUT /api/gallery/:id` - Modifier une réalisation
- `DELETE /api/gallery/:id` - Supprimer une réalisation

### Contact
- `POST /api/contact` - Soumettre le formulaire
- `GET /api/contact` - Liste des demandes (admin)
- `PATCH /api/contact/:id/status` - Changer le statut
