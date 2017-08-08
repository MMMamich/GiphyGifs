var topics = ["Girl Skateboards", "Thrasher Skateboards", "Deathwish Skateboards", "Enjoi Skateboards", "Krooked Skateboards", "Skateboarding Dogs", "Aaron Homoki", "Ben Raybourn", "Tony Hawk"];

function gifPull(){  //Pulls Data AJAX CALL
    
    var gif = $(this).attr("data-topic");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=e2a09e3e040b4adf952ddc91bc1b7d06&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
            
        console.log(response);
        
        //return response;
        var gifLength = response.data;
        
            for(var i = 0; i < gifLength.length; i++){

                var gifDiv = $("<div>");

                var gifRating = gifLength[i].rating;

                console.log(gifRating);

                var gifParatag = $("<p>").text("Rating: " + gifRating);

                var gifImg = $("<img>");
                
                gifImg.attr("src",gifLength[i].images.fixed_height.url);
                
                gifImg.attr("data-animate", gifLength[i].images.fixed_height.url);
                
                gifImg.attr("data-still", gifLength[i].images.fixed_height_still.url);
                
                gifDiv.append(gifParatag);

                gifDiv.append(gifImg);

                $("#gifContainer").prepend(gifDiv); // Where the magic happens... hopefully  
                
                
                //Variables for If statement
                
//                var animateVar = gifLength[i].images.fixed_height.url;
//                var stillVar = gifLength[i].images.fixed_height_still.url;

                    gifImg.click(function(){  //Pause or play img
                        
                       var state = $(this).attr("data-state");
                       console.log(this);
                        
	      				if (state === "still") {
	        				var animateURL=$(this).attr("data-animate"); //data-*whatever text* is an attribute that holds custom data that good for jQuery
	        				$(this).attr("src", animateURL);
	        				$(this).attr("data-state", "animate");
                            
	     				 } 
	     				else {
	        				var stillURL=$(this).attr("data-still");
	        				$(this).attr("src", stillURL);
	        				$(this).attr("data-state", "still");
                           
	     				 } 
                        
                        
//                    if (gifImg === animateVar){
//
//                    gifImg.attr("src", stillVar);   
//                        
//                    console.log(stillVar);
//                        
//                    } else if (gifImg === stillVar) {
//                        
//                     gifImg.attr("src", animateVar); 
//                        
//                     console.log(animateVar);    
                        
                   // }

                    });

                }

    });

}


  function newButtons() {  
      
        $("#buttonContainer").empty();

        for (var i = 0; i < topics.length; i++) {
            
          var addButton = $("<button>");
            
          addButton.addClass("topic");
            
          addButton.attr("data-topic", topics[i]);
            
          addButton.text(topics[i]);
          
          $("#buttonContainer").append(addButton);
            
        }
      }

$("#addGif").click(function(){  //This handles where the gif buttons are placed
    
    event.preventDefault();  //Prevents form to be default value
        
        var gifs = $("#gifAddTextBox").val();

        topics.push(gifs);

        newButtons();
      });

      //So I can do the gifPull function on new buttons
      $(document).on("click", ".topic", gifPull);

      
      newButtons(); //Without this function being called the inital buttons wouldn't show up
    
    

