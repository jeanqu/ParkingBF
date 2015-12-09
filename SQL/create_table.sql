--cd Projects/VoituresApp/parkingBF/

--sudo -u postgres -i
--psql maGrosseVoiture
--password: jeanjean

CREATE TABLE compte
(
	id_compte SERIAL PRIMARY KEY,
	loggin CHAR(50),
	mot_de_passe CHAR(50) NOT NULL,
	date_creation_compte TIMESTAMP,
	token VARCHAR(500)
);

CREATE TABLE vehicule_etat
(
	id_vehicule_etat INT PRIMARY KEY,
	nom_vehicule_etat CHAR(50),
	description_vehicule_etat CHAR(500)
);

CREATE TABLE alert_etat
(
	id_alert_etat INT PRIMARY KEY,
	nom_alert_etat CHAR(50),
	description_alert_etat CHAR(500)
);

CREATE TABLE alert_type
(
	id_alert_type INT PRIMARY KEY,
	nom_alert_type CHAR(50),
	description_alert_type CHAR(500)
);

CREATE TABLE vehicule
(
	id_vehicule SERIAL PRIMARY KEY,
	code_vehicule CHAR(30) NOT NULL,
	nom_vehicule CHAR(75) NOT NULL,
	date_creation_vehicule TIMESTAMP,
	vehicule_fk_compte INT REFERENCES compte NOT NULL,
	vehicule_fk_etat INT REFERENCES vehicule_etat NOT NULL,
	face CHAR(250);
);

CREATE TABLE alert
(
	id_alert SERIAL PRIMARY KEY,
	date_creation_alert TIMESTAMP,
	date_decouverte_alert TIMESTAMP,
	alert_fk_etat INT REFERENCES alert_etat NOT NULL,
	alert_fk_type INT REFERENCES alert_type NOT NULL,
	alert_fk_compte INT REFERENCES compte NOT NULL,
	alert_fk_vehicule INT REFERENCES vehicule NOT NULL
);
