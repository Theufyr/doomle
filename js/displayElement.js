import notionList from "/js/json/notions.js";
// création et affichage d'éléments
export default function displayElement(json) {
	// fonction pour créer l'élément à afficher
	function addElement(id1, id2, type, text1, text2, text3) {
		// on crée un nouvel élément en fonction du type de balise demandée
		let newElement	= document.createElement(type);
		let newContent	= "";
		// son contenu
		if (type == "a") {
			// si le nouvel élément est un lien
			newElement.href = text1;
			newElement.title = text2;
			text1 = text3;
		}
		// si le nouvel élément est une icône (affichée en bouton)
		if (type == "button") {
			// titrage
			newElement.title = notionList[text1][0];
			// texte
			if (notionList[text1][1] != "") {
				newContent = document.createTextNode(notionList[text1][1]);
			// ou image 
			} else {
				newContent = document.createElement("img");
				newContent.src = "assets/images/" + text1 + ".png";
				newContent.alt = notionList[text1][0];
			}
		} else {
			// pour les autres balises, on crée un élément contenu à insérer
			newContent = document.createTextNode(text1);
		}
		// on met le contenu dans le nouvel élément
		newElement.appendChild(newContent);
		if (type == "a") {
			// si le nouvel élément est un lien
			// on met le lien dans un paragraphe
			const newP = document.createElement("p");
			newP.appendChild(newElement);
			newElement = newP;
		}
		// on place le nouvel élément dans l'élémént identifié
//		let subDiv = (id2 == 0) ? "_" + id2 : "";						// div d'entête de cours ou de la leçon/exercice
		let subDiv = "_" + id2;						// div d'entête de cours ou de la leçon/exercice
		subDiv = (type == "button") ? "Icons" + id2 : subDiv;	// div d'icônes de thème
		const parentElement = document.querySelector("#" + id1 + subDiv);
		parentElement.appendChild(newElement);
	}
	// on liste tous les cours
	Object.keys(json).forEach(cours => {
		// on prépare un div pour englober le cours
		const newDiv = document.createElement("div");
		// on lui donne un id et une classe pour le manier
		newDiv.id = cours;
		newDiv.className = "course";
		// on place le div approprié
		const divTrack = (cours == "A01") ? "track" : "courses";
		document.querySelector("#" + divTrack).appendChild(newDiv);
		// on prépare l'url du Repo
		let urlRepo = "https://github.com/Theufyr/";
		for (let i = 0; i < json[cours].length; i++) {
			// on prépare un div pour l'entête du cours ou la leçon/exercice
			const newDivBloc = document.createElement("div");
			// on lui donne un id et une classe pour le manier
			newDivBloc.id = cours + "_" + i;
			newDivBloc.className = "";
			if (i == 0) {
				// design spécifique à l'entéte du cours
				newDivBloc.className = "course_title";
			}
			// on place ce div dans le div du cours
			newDiv.appendChild(newDivBloc);
			// on ajoute la référence pour le titre du cours (index 0)
			let courseRef = (i == 0) ? "[GHL] [" + cours + "] " : "";
			addElement(cours, i, "h2", courseRef + json[cours][i]["titre"], "", "");
			// lien Moodle
			addElement(cours, i, "a", "https://moodle.adatechschool.fr/" + json[cours][i]["lien"], json[cours][i]["titre"], "Cliquer pour accéder à la page Moodle");
			// s'il n'y a pas de Repo GitHub pour ce cours
			// on empêche les liens GitHut, même pour les exercices
			urlRepo = ((i == 0) && (json[cours][i]["github"] == "")) ? "" : urlRepo;
			// lien vers le Repo GitHub seulement si présent
			if ((urlRepo !== "") && (json[cours][i]["github"] !== "")) {
				urlRepo += (i == 0) ? json[cours][i]["github"] : "";
				// lien vers l'excercice sur GitHub
				let urlGitHub = (i !== 0) ? "/tree/main/" + json[cours][i]["github"] : "";
				addElement(cours, i, "a", urlRepo + urlGitHub, "lien vers le repo GitHub", "Cliquer pour accéder au Repo GitHub");
			}
			// notions
			if (json[cours][i]["notions"]) {
				// on prépare un div pour les incones
				const newDivIcons = document.createElement("div");
				// on lui donne un id et une classe pour le manier
				newDivIcons.id = cours + "Icons" + i;
				newDivIcons.className = "icons";
				// on place le div dans le div du cours
				newDiv.appendChild(newDivIcons);
				// on crée les icônes
				json[cours][i]["notions"].forEach(notion => {
					addElement(cours, i, "button", notion, "");
					// on ajoute la notion aux classes de la leçon ou de l'exercice
					newDivBloc.className += " notion_" + notion;
					newDivIcons.className += " notion_" + notion;
					// on cavhe ces bloc par défaut
					newDivBloc.style.display = "none";
					newDivIcons.style.display = "none";
				});
			}
		}
	});
}