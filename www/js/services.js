angular.module('starter.services', [])

.factory('chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'AB-725-FR',
    lastText: 'Ma belle berlingo',
    //face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    face: 'http://images.caradisiac.com/logos-ref/modele/modele--citroen-berlingo-multispace/S7-modele--citroen-berlingo-multispace.jpg'
  }, {
    id: 1,
    name: 'JI-564-MO',
    lastText: 'La voiture de Papa',
    //face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    face: 'http://clairemedium.com/wp-content/uploads/2013/10/voiture-clairemedium.jpg'
  }, {
    id: 2,
    name: 'MP-184-ES',
    lastText: 'La moto de Maman',
    //face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    face: 'http://www.cer.asso.fr/images/slider/revolution/index/moto.png'
  }, {
    id: 3,
    name: 'OR-562-FR',
    lastText: 'Mon camion à moi',
    //face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
    face: 'http://eu.mio.com/media/extras/extra_product_truck-mode.png'
  }, {
    id: 4,
    name: 'AR-022-FR',
    lastText: 'Ma voiture de fonction',
    //face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    face: 'http://lactu.pro/wp-content/uploads/2013/07/fonction.gif'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
