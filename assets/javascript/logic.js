$(document).ready(function(event){
    var dogs = ["Doberman", "Golden Retriever", "Bulldog", "Malamute", "Siberian Husky", "Pomeranian"];

    function displayGifInfo() {

		var limits = 10 ; 
		var key = "RS4t0aJbHx2iswT899MeUFvndd6dcz7Z" ; 
		var search = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ search + "&api_key=" + key + "&limit=" + limits;


    $("#dog-view").empty();
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        for (var i = 0 ; i < limits ; i++) {

        var dogDiv = $("<div class='dog pull-left'>");
        var rating = response.data[i].rating;
        var pOne = $("<p>").text("Rating: " + rating);
        dogDiv.append(pOne);
        var imgURL = response.data[i].images.fixed_height_still.url;
        var image = $("<img>").attr("src", imgURL);
        dogDiv.append(image);
        $("#dog-view").prepend(dogDiv);

      }; 
      });

    }


    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < dogs.length; i++) {

          var a = $("<button>");
          a.addClass("gif-btn");
          a.attr("data-name", dogs[i]);
          a.text(dogs[i]);
          $("#buttons-view").append(a);
        }
      }


    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var dog = $("#gif-input").val().trim();
        dogs.push(dog);
        renderButtons();
      });

      $(document).on("click", ".gif-btn", displayGifInfo);
      renderButtons();

      $(document).on("click", "img", function(){
 
        var src = $(this).attr("src");
         if($(this).hasClass('playing')){
            //stop
            $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
            $(this).removeClass('playing');
         } else {
           //play
           $(this).addClass('playing');
           $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
         }


      });

});





