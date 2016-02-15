exports.reponses = function (head, message) {
    this.head = head;
    this.message = message;
}

exports.CAS_ERREUR_NON_CONNECTE = 1;
exports.CAS_ERREUR_SERVEUR = 2;
exports.CAS_REUSSITE = 3;
exports.CAS_ERREUR_DATABASE = 4;

exports.CAS_COMPTE_DEJA_UTILISE = 5;
exports.CAS_OBJET_DEJA_UTILISE = 5;