package handler

import (
	"encoding/json" // Pour l'encodage et le décodage JSON
	"fmt"           // Pour l'affichage de messages de débogage
	"os"            // Pour la manipulation de fichiers
)

// Structure de données pour les informations à sauvegarder et lire depuis la base de données
type donnees struct {
	Rank  int    `json:"rank"`  // Classement
	Name  string `json:"name"`  // Nom
	Score int    `json:"score"` // Score
	Time  string `json:"time"`  // Temps
}

// Fonction pour sauvegarder les données dans la base de données
func saveInDataBase(data []donnees) error {
	// Crée le fichier "dataBase.json" pour la base de données
	dataBase, err := os.Create("dataBase.json")
	if err != nil {
		return err
	}
	defer dataBase.Close()

	// Encode les données en format JSON
	encodedData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	// Écrit les données encodées dans le fichier
	_, err = dataBase.Write(encodedData)
	if err != nil {
		return err
	}

	return nil
}

// Fonction pour lire les données depuis la base de données
func readFromDataBase() ([]donnees, error) {
	var tabForData []donnees

	// Lit le contenu du fichier "dataBase.json"
	data, err := os.ReadFile("dataBase.json")
	if err != nil {
		fmt.Println("ici")
		return tabForData, err
	}

	// Décodage des données JSON dans la structure de données
	err = json.Unmarshal(data, &tabForData)
	if err != nil {
		fmt.Println("la bas")
		return tabForData, err
	}

	return tabForData, nil
}
