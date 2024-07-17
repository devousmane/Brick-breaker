package handler

import (
	"encoding/json" // Pour l'encodage et le décodage JSON
	"fmt"           // Pour l'affichage de messages de débogage
	"html/template" // Pour le rendu des templates HTML
	"net/http"      // Pour la gestion des requêtes et réponses HTTP
)

// Gestionnaire de la page d'index
func indexHandler(w http.ResponseWriter, r *http.Request) {
	// Analyse le fichier template "index.html"
	tmp, err := template.ParseFiles("index.html")
	if err != nil {
		// Affiche un message d'erreur si le template ne peut pas être analysé
		fmt.Println("y'a erreur")
		return
	}
	// Exécute le template et écrit le résultat dans la réponse
	tmp.Execute(w, nil)
}

// Gestionnaire pour obtenir des données (GET)
func getDataHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		// Message de débogage
		fmt.Println("getdatahandeler")

		// Lit les données de la base de données
		arrayofdata, err := readFromDataBase()
		if err != nil {
			// Affiche un message d'erreur si la lecture échoue
			fmt.Println("error01")
			return
		}

		// Convertit les données en JSON
		jsondata, err := json.Marshal(arrayofdata)
		if err != nil {
			// Affiche un message d'erreur si la conversion échoue
			fmt.Println("error02")
			return
		}

		// Définit le type de contenu de la réponse en tant que JSON
		w.Header().Set("Content-Type", "application/json")
		// Écrit les données JSON dans la réponse
		w.Write(jsondata)

		// Affiche les données JSON pour le débogage
		fmt.Println(string(jsondata))
	} else {
		// Affiche un message d'erreur si la méthode HTTP n'est pas GET
		fmt.Println("page d'erreur ok")
		return
	}
}

// Gestionnaire pour poster des données (POST)
func postDataHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		// Message de débogage
		fmt.Println("postdatahandeler")

		// Décode les données JSON du corps de la requête
		var mydonnee donnees
		err := json.NewDecoder(r.Body).Decode(&mydonnee)
		if err != nil {
			// Affiche un message d'erreur si le décodage échoue
			fmt.Println("error1")
			return
		}

		// Lit les données existantes de la base de données
		arrayofdonnees, err := readFromDataBase()
		if err != nil {
			// Affiche un message d'erreur si la lecture échoue
			fmt.Println("error2")
			return
		}

		// Ajoute les nouvelles données à l'array existant
		arrayofdonnees = append(arrayofdonnees, mydonnee)

		// Affiche les données pour le débogage
		fmt.Println(arrayofdonnees)

		// Sauvegarde les données mises à jour dans la base de données
		err = saveInDataBase(arrayofdonnees)
		if err != nil {
			// Affiche un message d'erreur si la sauvegarde échoue
			fmt.Println("error3")
			return
		}
	} else {
		// Affiche un message d'erreur si la méthode HTTP n'est pas POST
		fmt.Println("page d'erreur")
		return
	}
}

// Gestionnaire principal pour configurer les répertoires statiques et les routes
func Handler(w http.ResponseWriter, r *http.Request) {
	// Configuration des répertoires statiques
	staticDir := "assets"
	staticDir2 := "Web"
	staticDir3 := "Script"

	// Création des gestionnaires de fichiers statiques
	fileServer := http.FileServer(http.Dir(staticDir))
	fileServer2 := http.FileServer(http.Dir(staticDir2))
	fileServer3 := http.FileServer(http.Dir(staticDir3))

	// Définition des routes
	mux := http.NewServeMux()
	mux.Handle("/assets/", http.StripPrefix("/assets/", fileServer))
	mux.Handle("/Web/", http.StripPrefix("/Web/", fileServer2))
	mux.Handle("/Script/", http.StripPrefix("/Script/", fileServer3))
	mux.HandleFunc("/", indexHandler)
	mux.HandleFunc("/postdata", postDataHandler)
	mux.HandleFunc("/getdata", getDataHandler)

	// Utilisation de mux pour gérer les requêtes
	mux.ServeHTTP(w, r)
}
