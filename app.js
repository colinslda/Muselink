// app.js

// Enregistrement du Service Worker pour PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker enregistré avec succès:', registration);
            })
            .catch(error => {
                console.log('Erreur lors de l\'enregistrement du Service Worker:', error);
            });
    });
}

// Exemple d'initialisation d'un module (si vous utilisez une approche modulaire)
import * as profileModule from './js/modules/profile.js';
import * as feedModule from './js/modules/feed.js';

document.addEventListener('DOMContentLoaded', () => {
    profileModule.init();
    feedModule.init();
    // ... Initialiser d'autres modules ...
});

// Exemple d'écouteur d'événement global (pour la recherche, par exemple)
const searchBar = document.querySelector('.search-bar input[type="text"]');
const searchButton = document.querySelector('.search-bar button[type="submit"]');

searchButton.addEventListener('click', (event) => {
    event.preventDefault(); // Empêcher la soumission par défaut du formulaire
    const searchTerm = searchBar.value;
    if (searchTerm.trim() !== '') {
        console.log('Recherche pour:', searchTerm);
        // ... Appeler une fonction de recherche ou rediriger vers une page de résultats ...
    } else {
        alert('Veuillez entrer un terme de recherche.');
    }
});
