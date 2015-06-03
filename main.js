$(function() {
  // Grab DOM elements that I will work with
  var $photoList = $(".photo-list");

  // Request products from API
  $.ajax({
    url: 'https://api.instagram.com/v1/tags/lighthouse/media/recent?access_token=357844946.7fa8ffd.f8c258ae549d4ef6bb0a3038b2444b7d',
    jsonp: 'callback',
    dataType: 'jsonp',
    data: {
      format: 'json' 
    },
    success: function(response) {
      console.log(response);
      response.data.forEach(function(photo) {
        $photoList.append(
          $("<div></div>").addClass("jumbotron")
        );
        $(".jumbotron").append(
          $("<div></div>").addClass("photo"),
          $("<img>").addClass("photo-img").attr('src', photo.images.standard_resolution.url),
          photo.tags.forEach(function(tag) {
            $photoList.append( $('<span class="label label-info">' + tag + '</span>') );  
          })
        )
      });
      console.log("Data loaded");
    }
  });

  // Set up event listener for products in aside
  // console.log("setting up event listener for click .photo");
  // $(".photo-list").on('click', ".photo", function() {
  //   // Grab the div.photo that was clicked
  //   var $photo = $(this);
  //   var photoData = $photo.data('photo');
  //   console.log(photoData);
  //   $(".welcome").hide();
  //   $(".photo-info").show();
  //   $(".photo-info h2.name").text(photoData.name);
  //   $(".photo-info img.image").attr('src', photoData.image_thumb_url);
  // });

});


