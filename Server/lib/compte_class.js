exports.FromDatas = function (fd_id, fd_loggin, fd_motDePasse, fdDateCreationCompte, fd_Token) {
    this.id = fd_id;
    this.loggin = fd_loggin;
    this.mot_de_passe = fd_motDePasse;
    this.date_creation_compte = fdDateCreationCompte;
    this.token = fd_Token;
};
