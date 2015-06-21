$(function() {
  
  // Navbar panel
  $('.navbar-panel').mtrPanel({toggle: '.toolbar .menu-toggle'});

  $('.init-menu').click(function(){
    $('#init-instructions').empty();
  });

  setInterval(function(){
    $('#init-instructions').toggleClass('testtest');
  }, 2500);



  $('.mute').click(function(){
    if ($('.mute').text() === 'volume_up'){
      $('.mute').text('volume_off');
    } 
    else {
      $('.mute').text('volume_up');
    }
  })

  // $('.button').click(function(){

  //   var that = $(this)

  //   if(that.hasClass('skip')){
  //     console.log('skippy');
  //     return;
  //   }

  //   $(this).toggleClass('activated');
  // })


});