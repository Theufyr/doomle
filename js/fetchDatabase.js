// on récupère les fonctions d'affichage
// à utiliser dans la suite du script
import displayElement from "/js/displayElement.js";

// on appelle la base de données json
const fetchPromise	= fetch("js/json/database.json",);
fetchPromise
	// on récupère le contenu de la promesse
	.then((response) => {
		// on vérifie le statut de la réponse avant de l'utiliser
		if (!response.ok) {
			// on signale une erreur si la requête a échoué
			throw new Error(`Erreur HTTP : ${response.status}`);
		}
		// on récupère le contenu json
		return response.json();
	})
	// on l'utilise
	.then((json) => {
        displayElement(json);
	})
	// seul gestionnaire catch à la fin pour traiter les erreurs
	.catch((error) => {
		console.log(`Impossible de récupérer les données : ${error}`);
	});