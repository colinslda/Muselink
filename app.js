// app.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestion de la Navigation SPA (Single Page Application)
    setupNavigationSPA();

    // 2. Enregistrement du Service Worker pour PWA (déjà présent, on le garde)
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

    // 3. Exemple d'initialisation des modules (si vous utilisez une approche modulaire -  à adapter)
    // import * as profileModule from './js/modules/profile.js';
    // import * as feedModule from './js/modules/feed.js';

    // profileModule.init();
    // feedModule.init();
    // ... Initialiser d'autres modules ...

    // 4. Exemple d'écouteur d'événement global (pour la recherche - déjà présent, on le garde et on peut l'adapter)
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
});


// --- Fonctions pour la Navigation SPA ---

function setupNavigationSPA() {
    const navLinks = document.querySelectorAll('.nav-links .nav-link'); // Sélectionne les liens de navigation

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick); // Ajoute un écouteur d'événement à chaque lien
    });

    // Affiche la page d'accueil au chargement initial (si nécessaire, peut être déjà géré par CSS avec 'active-page' sur accueil)
    // showPage('accueil'); // Décommenter si vous voulez forcer l'affichage de l'accueil au chargement JS
}


function handleNavLinkClick(event) {
    event.preventDefault(); // 1. Empêche le comportement par défaut du lien (défilement vers l'ancre)

    const targetPage = event.target.getAttribute('data-page'); // Récupère l'attribut data-page (ex: 'accueil', 'reseau'...)

    if (targetPage) {
        showPage(targetPage); // 2. Affiche la page cible
        updateActiveNavLink(event.target); // 3. Met à jour le lien de navigation actif
        updateURL(targetPage); // 4. Met à jour l'URL (optionnel, pour une vraie SPA)
    }
}


function showPage(pageId) {
    // 1. Masque toutes les pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active-page');
    });

    // 2. Affiche la page demandée
    const pageToShow = document.getElementById(`${pageId}-page`); // Ex: 'accueil-page', 'reseau-page'
    if (pageToShow) {
        pageToShow.classList.add('active-page');
    } else {
        console.error(`Page avec l'ID '${pageId}-page' non trouvée.`); // Gestion d'erreur si la page n'existe pas
    }
}


function updateActiveNavLink(clickedLink) {
    // 1. Retire la classe 'active' de tous les liens de navigation
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // 2. Ajoute la classe 'active' au lien cliqué
    clickedLink.classList.add('active');
}


function updateURL(pageId) {
    // Optionnel: Met à jour l'URL dans la barre d'adresse sans recharger la page (pour une vraie SPA)
    // Exemple: '/#reseau' ou '/reseau'  (choisir le format selon votre préférence)
    const newURL = `#${pageId}`; // Ou bien : `/${pageId}` si vous configurez votre serveur pour gérer les routes sans le #
    history.pushState({}, '', newURL); // Utilise l'API History pour modifier l'URL
}
