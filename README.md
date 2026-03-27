Playwright BDD - Contact Form Testing (HiPay)

Ce projet présente des tests automatisés E2E réalisés avec Playwright + BDD (Cucumber), appliqués à un cas concret : le formulaire de contact "Fraud Management" de HiPay.

Objectif
L’objectif était de valider le bon fonctionnement du parcours utilisateur sur cette page.

J’ai testé :

La soumission du formulaire avec des données valides
L’affichage du message de confirmation après envoi
Le comportement du formulaire lorsque des champs obligatoires sont manquants
Le feedback utilisateur après soumission

Observation QA
Lors des tests, j’ai identifié un point d’amélioration :
Quel que soit le problème (champ vide, mauvais format…), le formulaire affiche uniquement un message global :
"Sorry, there must have been an error. Please try again."
Il n’y a pas :
de message spécifique par champ
de validation claire du format email
C’est un point d’amélioration UX évident.

Stratégie de test
Les tests sont organisés en deux catégories :
@smoke → parcours principal (soumission réussie)
@regression → cas complets + gestion des erreurs

Exemples :
Soumission réussie → @smoke + @regression
Champs manquants → @regression

Architecture
Structure du projet :
features/ → scénarios métier (Gherkin)
steps/ → logique métier (sans locator)
pages/ → Page Objects (centralisation des locators)
test-data/ → données de test
utils/ → helpers

Bonnes pratiques
Utilisation du BDD pour une meilleure lisibilité
Page Object Model pour la maintenabilité
Aucun locator dans les step definitions
Utilisation des locators Playwright :
getByRole
getByLabel
Utilisation de data-testid uniquement si nécessaire

Données de test
Génération de données dynamiques (email, etc.) pour éviter les conflits
Données fixes conservées pour garantir la reproductibilité

Lancer les tests
Tous les tests :
npm test
Mode headed : npm run test:headed

Smoke :
npm run test:smoke

Regression :
npm run test:regression

Par navigateur :
npm run test:smoke:chromium
npm run test:smoke:firefox
npm run test:smoke:webkit

Rapport

Afficher le rapport HTML :
npx playwright show-report

Fichier disponible dans :
/playwright-report/index.html

Évolutivité
Le projet est prêt à être étendu avec :
des tests API
d’autres scénarios
une intégration CI/CD

Conclusion
Ce projet pose une base propre et maintenable pour couvrir d’autres besoins QA, au-delà du simple test du formulaire.
