exports.voitureDepuisSQL = function (infos) {
    this.id = infos.id_vehicule;
    this.numImatriculation = infos.code_vehicule;
    this.name = infos.nom_vehicule;
    this.dateCreation = infos.date_creation_vehicule;
    this.compte = infos.vehicule_fk_compte;
    this.face = infos.face;
}