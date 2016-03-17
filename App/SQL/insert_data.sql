
INSERT INTO vehicule_etat (id_vehicule_etat, nom_vehicule_etat, description_vehicule_etat) VALUES (1, 'valide', 'etat valide');
INSERT INTO vehicule_etat (id_vehicule_etat, nom_vehicule_etat, description_vehicule_etat) VALUES (2, 'invalide', 'etat non valide');

INSERT INTO vehicule (code_vehicule, nom_vehicule, date_creation_vehicule, vehicule_fk_compte, vehicule_fk_etat, face) VALUES ('BP-95-FR', 'vehicule test1', '2014-1-2'::timestamp, 18, 1, 'http://images.caradisiac.com/logos-ref/modele/modele--citroen-berlingo-multispace/S7-modele--citroen-berlingo-multispace.jpg');
INSERT INTO vehicule (code_vehicule, nom_vehicule, date_creation_vehicule, vehicule_fk_compte, vehicule_fk_etat, face) VALUES ('AB-725-FR', 'Ma belle berlingo', '2014-1-2'::timestamp, 18, 1, 'http://clairemedium.com/wp-content/uploads/2013/10/voiture-clairemedium.jpg');
INSERT INTO vehicule (code_vehicule, nom_vehicule, date_creation_vehicule, vehicule_fk_compte, vehicule_fk_etat, face) VALUES ('JI-564-MO', 'La voiture de Papa', '2014-1-2'::timestamp, 18, 1, 'http://images.caradisiac.com/logos-ref/modele/modele--citroen-berlingo-multispace/S7-modele--citroen-berlingo-multispace.jpg');
INSERT INTO vehicule (code_vehicule, nom_vehicule, date_creation_vehicule, vehicule_fk_compte, vehicule_fk_etat, face) VALUES ('PIKI?N', 'La moto de Maman', '2014-1-2'::timestamp, 18, 1, 'http://www.cer.asso.fr/images/slider/revolution/index/moto.png');


INSERT INTO vehicule (code_vehicule, nom_vehicule, date_creation_vehicule, vehicule_fk_compte, vehicule_fk_etat, face) VALUES ('PIKI?N', 'CACA', '2014-1-2'::timestamp, 18, 1, 'http://www.cer.asso.fr/images/slider/revolution/index/moto.png');
SELECT LASTVAL() AS newId;