# Commandes Pizza Paolo

Page de commande groupée pour [Pizza Paolo](https://pizza-paolo.dishop.co) (Villefranche-sur-Saône).

**Onglet « La carte »** — les 61 articles avec photo, description et prix, rangés en 6 catégories. Champ prénom, boutons + / −, total en direct. 🌱 marque les articles sans viande ni poisson, avec un filtre dédié et une recherche par ingrédient.

**Onglet « Les commandes »** — la liste de tout le monde, visible par tous. Chacun peut modifier ou supprimer sa commande. En haut, le récapitulatif agrégé et le total général : c'est ce qu'on dicte au pizzaiolo.

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | Toute la page — photos comprises, aucune dépendance |
| `config.js` | Une seule ligne : l'URL du serveur des commandes |
| `Code.gs` | À coller dans Google Apps Script — lit et écrit les commandes dans un Google Sheet |

## Mise en route

### 1. Le serveur des commandes (une fois)

1. [script.google.com](https://script.google.com) → **Nouveau projet**.
2. Efface le contenu de `Code.gs` et colle celui de ce dépôt. Sauvegarde.
3. **Déployer** → **Nouveau déploiement** → ⚙️ → **Application Web**
   - *Exécuter en tant que* : **Moi**
   - *Qui a accès* : **Tout le monde**
4. Autorise l'accès quand Google le demande.
5. Copie l'**URL de l'application web** (elle finit par `/exec`).

### 2. Brancher la page

Dans `config.js`, colle l'URL entre les guillemets :

```js
window.PP_API = "https://script.google.com/macros/s/XXXX/exec";
```

C'est tout. La page passe en mode partagé — l'en-tête l'indique.

### 3. Retrouver le tableau

Dans l'éditeur Apps Script, sélectionne la fonction `monTableau`, clique **Exécuter**, et lis l'adresse dans le journal d'exécution.

## Bon à savoir

Sans `config.js` rempli, la page fonctionne quand même, mais en mode local : les commandes restent sur l'appareil qui les a saisies.

Après modification de `index.html`, GitHub Pages met une minute environ à publier la nouvelle version.

Prix et compositions repris du site du restaurant, à vérifier avant de commander.
