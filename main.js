$(function() {
  // Grab DOM elements that I will work with
  var $carouselInner = $(".carousel-inner");
  var $carouselIndicators = $(".carousel-indicators");
  
  function addGuessNameButton(response){
    $('<button>').addClass('btn btn-primary guessName').text('Guess Name').appendTo('.container').fadeIn();
    addProfilePic(response);
    $('.guessName').click(function(){
      var $this = $(this);
      if($this.hasClass('guessName')){
        if ( response.data[0].user.full_name != "" ){
          $this.text(response.data[0].user.full_name);
        }else {
          $this.text(response.data[0].user.username);
        }
        $this.removeClass('guessName');        
      } else {
        $this.addClass('guessName');
        $this.text('Guess Name');
      }
    });
  }

  function addProfilePic(response){
    if (!response.data[0].user.profile_picture.match(/anonymousUser.jpg$/)){
      $profilePic = $('<a>').attr('href', '#').attr('data-toggle','modal').attr('data-target','#profilePicModal');
      $('<img>').addClass('profilePic').attr('src',response.data[0].user.profile_picture).appendTo($profilePic);
      $modalDiv = $('<div>').addClass('modal fade profilePicModal')
        .attr('aria-hidden', 'true')
        .attr('aria-labelledby', 'profilePicModal')
        .attr({
          id: 'profilePicModal',
          tabindex: '-1',
          role: 'dialog'
      });
      $modalDialog = $('<div>').addClass('modal-dialog modal-sm').appendTo($modalDiv);
      $modalContent = $('<div>').addClass('modal-content').appendTo($modalDialog);
      $('<img>').addClass('modal-content').attr('src',response.data[0].user.profile_picture).appendTo($modalContent);
      $modalDiv.appendTo('.container');
      $profilePic.appendTo('.container');
    }
  }

  function apiCall(tag){
    $('#newPerson').button('loading');
    var randNum = Math.floor((Math.random() * 100000000) + 1);
    var randUserUrl = 'https://api.instagram.com/v1/users/' + randNum + '/media/recent/?access_token=357844946.7fa8ffd.f8c258ae549d4ef6bb0a3038b2444b7d';
    if(tag == undefined){
      url = randUserUrl;
    } else {
      url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=357844946.7fa8ffd.f8c258ae549d4ef6bb0a3038b2444b7d'
    }

    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(response) {
        
        var ctr = 0;
        if (response.data == undefined || response.data.length == 0) {
          apiCall();
        } else {
          $('#newPerson').button('reset');
          console.log(response);
          addGuessNameButton(response);
          response.data.forEach(function(photo) {
            var tagCtr = 0;
            $item = $("<div>").addClass("item").attr('id', ctr);
            $("<img>").addClass("photo-img").attr('src', photo.images.standard_resolution.url).appendTo($item);
            $caption = $('<div>').addClass('carousel-caption').appendTo($item);

            if ( photo.location != null ){
              var lat = photo.location.latitude;
              var lng = photo.location.longitude;
              var latLng = "http://maps.google.com/maps/place/@" + lat + "," + lng + ',7z/data=!4m2!3m1!1s0x0:0x0!5m1!1e4!6m1!1e1';
              $mapLink = $('<a>').attr("href", latLng).attr("target", "_blank");
              $('<button>').addClass('btn-xs btn-success guessName').text('Guess Location').appendTo($mapLink);
              $mapLink.appendTo($caption);
            }            

            $captionTags = $('<div>').addClass('caption-tags').appendTo($caption);
            photo.tags.forEach(function(tag) {
              if (tagCtr < 3) {
                // var tagUrl = 'https://api.instagram.com/v1/tags/'+tag+'/media/recent?access_token=357844946.7fa8ffd.f8c258ae549d4ef6bb0a3038b2444b7d'
                // $('<button class="label label-info" onclick="apiCall('+tagUrl+')">' + tag + '</button>').appendTo($captionTags);
                $('<span class="label label-info">' + tag + '</span>').appendTo($captionTags);
              }
              tagCtr++;
            });

            $item.appendTo('.carousel-inner');
            $carouselIndicators.append('<li class="ind" data-target="#carousel-example-generic" data-slide-to="' + ctr + '"></li>');
            ctr++;
          });
          $('#0').addClass('active');
          console.log("Data loaded");
        } // end of else
      } // end of success
    }); // end of .ajax
  } // end of apiCall
  apiCall();
  $('#newPerson').on('click', function () {
    location.reload();
  })
  $('#tagSearch').on('submit', function(){
    event.preventDefault();
    apiCall('lighthouses');
  })

});


