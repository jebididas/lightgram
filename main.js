$(function() {
  // Grab DOM elements that I will work with
  var $carouselInner = $(".carousel-inner");
  var $carouselIndicators = $(".carousel-indicators");
  var randNum = Math.floor((Math.random() * 100000000) + 1);
  console.log(randNum);
  var url = 'https://api.instagram.com/v1/users/' + randNum + '/media/recent/?access_token=357844946.7fa8ffd.f8c258ae549d4ef6bb0a3038b2444b7d';

  function addGuessNameButton(response){
    $('<button>').addClass('btn btn-primary guessName').text('Guess Name').appendTo('.container');
    $('.guessName').click(function(){
      var $this = $(this);
      if($this.hasClass('guessName')){
        $this.removeClass('guessName');
        $this.text('Guess Name');         
      } else {
        $this.addClass('guessName');
        if ( response.data[0].user.full_name != "" ){
          $this.text(response.data[0].user.full_name);
        }else {
          $this.text(response.data[0].user.username);
        }
      }
    });
  }

  // Request products from API
  $.ajax({
    url: url,
    dataType: 'jsonp',
    data: {
      format: 'json' 
    },
    success: function(response) {
      console.log(response);
      var ctr = 0;

      if (response.data == undefined || response.data.length == 0) {
        location.reload();
      } else {
        addGuessNameButton(response);
        response.data.forEach(function(photo) {
          var tagCtr = 0;
          $item = $("<div>").addClass("item").attr('id', ctr);
          $("<img>").addClass("photo-img").attr('src', photo.images.standard_resolution.url).appendTo($item);
          $caption = $('<div>').addClass('carousel-caption').appendTo($item);
          $captionTags = $('<div>').addClass('caption-tags').appendTo($caption);
          photo.tags.forEach(function(tag) {
            if (tagCtr < 3) {
              $('<span class="label label-info">' + tag + '</span>').appendTo($captionTags);
            }
            tagCtr++;
          });
          if ( photo.location != null ){
            var lat = photo.location.latitude;
            var lng = photo.location.longitude;
            var latLng = "http://maps.google.com/maps?q=" + lat + "," + lng;
            $mapLink = $('<a>').attr("href", latLng).attr("target", "_blank");
            $('<button>').addClass('btn-xs btn-success guessName').text('Guess Location').appendTo($mapLink);
            $mapLink.appendTo($caption);
          }

          $item.appendTo('.carousel-inner');
          $carouselIndicators.append('<li class="ind" data-target="#carousel-example-generic" data-slide-to="' + ctr + '"></li>');
          ctr++;
        });
        $('#0').addClass('active');
        console.log("Data loaded");
      }
    } // end of else
  });

});


