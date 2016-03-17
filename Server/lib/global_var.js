exports.reponses = function (head, head_bis, message) {
    this.head = head;
    this.head_bis = head_bis;
    this.message = message;
}
exports.reponses = function (head, head_bis) {
    this.head = head;
    this.head_bis = head_bis;
    this.message = {};
}

exports.CAS_ERREUR_NON_CONNECTE = 1;
exports.CAS_ERREUR_SERVEUR = 2;
exports.CAS_REUSSITE = 3;
exports.CAS_ERREUR_DATABASE = 4;

exports.CAS_COMPTE_DEJA_UTILISE = 5;
exports.CAS_ACTION_NOT_ACHIVED = 6;
exports.CAS_OBJET_DEJA_UTILISE = 7;

exports.INACHEVE_REQUEST_CHEATED = 10;
exports.INACHEVE_OBJET_DEJA_UTILISE = 11;

exports.VEHICULE_MATRICULE_MIN_LENGTH = 5;
exports.VEHICULE_MATRICULE_MAX_LENGTH = 10;
exports.VEHICULE_NAME_MIN_LENGTH = 2;
exports.VEHICULE_NAME_MAX_LENGTH = 20;

exports.STATE_VEHICULE_VALIDE = 1;
exports.STATE_VEHICULE_INVALIDE = 2;