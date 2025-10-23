// les imports sont en début de script
// lors de l'utilisation d'import, les chemins relatifs doivent commencer par /
// et partir du dossier où se trouve le fichier html qui a appelé le script
import notionList from "/js/json/notions.js";
import "/js/fetchDatabase.js";
// barre navigation des notions
function pickNotion(notion) {
        let chapters = Array.from(document.getElementsByClassName("notion_" + notion));
        if (notionList[notion] === true) {
            notionList[notion] = false;
            chapters.map(chapter => chapter.style.display = "none");
            document.querySelector("#pick_" + notion).className = "chosen";
        } else {
            notionList[notion] = true;
            chapters.map(chapter => chapter.style.display = chapter.className.includes("icons") ? "flex" : "inherit");
            document.querySelector("#pick_" + notion).className = "choose";
        }
}
Object.keys(notionList).forEach(notion => {
    // symbole de l'icône
    let iconContent	= "";
    // texte
    if (notionList[notion][1] != "") {
        iconContent = document.createTextNode(notionList[notion][1]);
    // ou image 
    } else {
        iconContent = document.createElement("img");
        iconContent.src = "assets/images/" + notion + ".png";
        iconContent.alt = notionList[notion][0];
    }
	// on crée l'icône
	const newIcon = document.createElement("button");
	// on lui donne ses attributs
	newIcon.id          = "pick_" + notion;
	newIcon.className   = "chosen";
	newIcon.type        = "submit";
    newIcon.title       = notionList[notion][0];
	// on y place son contenu
	newIcon.appendChild(iconContent);
	// on place le div dans le div du cours
	document.querySelector("#pick").appendChild(newIcon);
    // action sur les icônes pour activer/désactiver les contenus
    document.querySelector("#pick_" + notion).addEventListener('click', () => {
        pickNotion(notion);
    });
});
