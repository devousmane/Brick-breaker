package main

import (
	"fmt"
	"net/http"
	"score/handler" 
)

func main() {
	addr := ":8080" // Adresse sur laquelle le serveur écoutera les requêtes HTTP

	fmt.Println("listening at http://localhost:8080")

	// Utilisation de http.ListenAndServe pour démarrer un serveur HTTP
	
	if err := http.ListenAndServe(addr, http.HandlerFunc(handler.Handler)); err != nil {
		fmt.Printf("Erreur de démarrage du serveur: %s\n", err)
	}
}
