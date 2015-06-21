var app = angular.module('tunes', [])

.factory('navFact', function(){
  var songData = [
    {
      url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/04+One+In+A+Million.mp3",
      title: "One In A Million",
      artist: "Aaliyah",
    },
    {
      url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/03+Age+Ain%27t+Nothing+But+A+Number.mp3",
      title: "Age Ain't Nothing But A Number",
      artist: "Aaliyah",
    },
    {
      url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/05+Hot+Like+Fire.mp3",
      title: "Hot Like Fire",
      artist: "Aaliyah",
    },
    {
      url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/06+If+Your+Girl+Only+Knew.mp3",
      title: "If Your Girl Only Knew",
      artist: "Aaliyah",
    }
  ];

  var addSong = function(url, title, artist){
    var song = {
      url: url,
      title: title,
      artist: artist
    }

    songData.push(song);
  };

  return {
    songData: songData,
    addSong: addSong
  }

})

.controller('navbarCtrl', function($scope, navFact){
  $scope.songs = navFact.songData;
  $scope.queue = [];



  var player = {
    looping: false,
    paused: false,
    playing: false,
    muted: false,
    currentSong: null,
    time: null
  }

  // player.currentSong.volume = 0.3;

  $scope.addToQueue = function(){
    var song = {
      url: this.song.url,
      title: this.song.title,
      artist: this.song.artist
    };

    $scope.queue.push(song);
    if(!player.playing && !player.paused){
      $scope.play();
    }
  };

  $scope.removeFromQueue = function(){
    $scope.queue.splice(this.$index, 1);
  };




  $scope.mute = function(){
    if(player.muted && player.currentSong){
      player.muted = false;
      player.currentSong.volume = 0.3;
      $('.button.mute').addClass('activated');
    }
    else if(!player.muted && player.currentSong){
      player.muted = true;
      player.currentSong.volume = 0;
      $('.button.mute').removeClass('activated');
    }
    else {
      player.muted = true;
      $('.button.mute').removeClass('activated');
    }
  };

  $scope.loop = function(){
    if(player.loop){
      player.loop = false;
      $('.button.loop').removeClass('activated');
    }
    else {
      player.loop = true;
      $('.button.loop').addClass('activated');      
    }
  };

  $scope.pause = function(){
    if(player.paused || !player.playing){
      return;
    }
    if(player.playing){
      $('.button.play').removeClass('activated');
      $('.button.pause').addClass('activated');

      player.playing = false;
      player.paused = true;
      player.time = player.currentSong.currentTime;
      player.currentSong.pause();
    }

  };

  $scope.play = function(skip){
    if(!skip && player.playing){
      return;
    }

    if($scope.queue.length > 0){

      var url = $scope.queue[0].url;
      player.currentSong = new Audio(url);

      if(! $('.button.play').hasClass('activated')){
        $('.button.play').addClass('activated');
      };

      if(player.paused){
        player.paused = false;
        player.currentSong.currentTime = player.time;
        $('.button.pause').removeClass('activated');
      }

      if(!player.muted){
        player.currentSong.volume = 0.3;
      }

      player.currentSong.play();
      player.playing = true;

      $(player.currentSong).bind('ended', function(){
          if(player.loop){
            player.currentTime = 0;
            player.currentSong.play();
          }
          else {
            player.currentTime = 0;
            $scope.next();
          }
      });
    }
  };

  $scope.next = function(){
    console.log('song has ended in next - queue - ', $scope.queue);

    $scope.queue.shift();
    console.log('song has ended in next - queue after- ', $scope.queue);

    player.currentSong.pause();

    if($scope.queue.length > 0){
      $scope.play(true);
    }
    else {
      if($('.button.play').hasClass('activated')){
        $('.button.play').removeClass('activated');
      };
      player.playing = false;
    }
  };


  
})











