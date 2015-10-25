var mesVoitures = [{
    id: 0,
    numImatriculation: 'AB-725-FR',
    name: 'Ma belle berlingo',
    //face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    face: 'http://images.caradisiac.com/logos-ref/modele/modele--citroen-berlingo-multispace/S7-modele--citroen-berlingo-multispace.jpg'
  }, {
    id: 1,
    numImatriculation: 'JI-564-MO',
    name: 'La voiture de Papa',
    //face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    face: 'http://clairemedium.com/wp-content/uploads/2013/10/voiture-clairemedium.jpg'
  }, {
    id: 2,
    numImatriculation: 'MP-184-ES',
    name: 'La moto de Maman',
    //face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    face: 'http://www.cer.asso.fr/images/slider/revolution/index/moto.png'
  }];


exports.sendMyCars = function (req, res, next) {
	console.log('Salut, j essaie d envoyer mes voitures');
    res.send(mesVoitures);
};