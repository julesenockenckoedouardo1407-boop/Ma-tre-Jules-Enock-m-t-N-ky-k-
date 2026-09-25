Maître Jules Enock (Mèt Nòkyòk) — V1 PWA corrigée pour GitHub Pages

Tous les fichiers sont directement à la racine du projet :
index.html
style.css
app.js
manifest.json
sw.js
icon-192.png
icon-512.png
README.txt

Le manifest utilise des chemins relatifs (./), avec start_url="./", scope="./", id="./" et display="standalone", afin de mieux fonctionner lorsque GitHub Pages publie le projet dans un sous-chemin.

Publication :
1. Envoie TOUS les fichiers directement à la racine du dépôt GitHub.
2. Active GitHub Pages avec la branche et le dossier racine.
3. Ouvre l'adresse HTTPS de GitHub Pages.
4. Recharge la page après le remplacement des anciens fichiers.
5. Dans Chrome, utilise « Installer l'application » lorsqu'il est proposé.

Après une ancienne version, supprime l'ancien raccourci/app installé avant le nouveau test.

Vérifications utiles :
/manifest.json
/sw.js
/icon-192.png
/icon-512.png

Pour un dépôt de projet GitHub Pages, ils seront normalement sous :
/NOM-DU-DEPOT/manifest.json
/NOM-DU-DEPOT/sw.js
/NOM-DU-DEPOT/icon-192.png
/NOM-DU-DEPOT/icon-512.png

Après une première ouverture en ligne, le Service Worker met en cache les ressources nécessaires pour le fonctionnement hors connexion.

Cette V1 n'utilise aucun service d'IA.


V3 EXPERT : modules avancés sans IA — partages, prix de revient, jours de travail, remises, problèmes composés, conversions et entraînement aléatoire.
