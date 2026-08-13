# Commandes Pizza Paolo

Page de commande groupée pour [Pizza Paolo](https://pizza-paolo.dishop.co) (Villefranche-sur-Saône).

**En ligne :** https://maudebaudier.github.io/commandes-pizza-paolo/

**Onglet « La carte »** — les 61 articles avec photo, description et prix, rangés en 6 catégories. Champ prénom, boutons + / −, total en direct. 🌱 marque les articles sans viande ni poisson, avec un filtre dédié et une recherche par ingrédient.

**Onglet « Les commandes »** — la liste de tout le monde, visible par tous. Chacun peut modifier ou supprimer sa commande. En haut, le récapitulatif agrégé et le total général : c'est ce qu'on dicte au pizzaiolo.

## Comment la synchronisation marche

Aucun compte, aucun serveur à gérer. La page publie chaque commande sur un salon [ntfy.sh](https://ntfy.sh) au nom aléatoire, défini dans `config.js`. Les autres navigateurs relisent ce salon et reconstituent la liste.

| Fichier | Rôle |
| --- | --- |
| `index.html` | Toute la page — photos comprises, aucune dépendance |
| `config.js` | Une ligne : le nom du salon ntfy où atterrissent les commandes |

## Bon à savoir

- Les commandes sont **conservées 12 heures** puis effacées. Pour une commande du jour, c'est sans conséquence.
- Pour repartir d'une liste vide immédiatement, change le nom du salon dans `config.js`.
- Le salon est public pour qui connaît son nom : n'y mets rien de sensible.
- Après un commit, GitHub Pages republie en une minute environ.

Prix et compositions repris du site du restaurant, à vérifier avant de commander.
