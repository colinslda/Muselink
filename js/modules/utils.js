// js/utils.js

// Fonction utilitaire pour formater une date (exemple)
export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options); // 'undefined' utilise la locale par défaut
}

// Fonction utilitaire pour valider un email (exemple simple)
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ... Ajouter d'autres fonctions utilitaires ...
