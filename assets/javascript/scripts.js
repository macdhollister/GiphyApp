$(document).ready(function() {
    let shows = ["The Office", "Gotham", "Vikings"];

    $(document).on("click", ".gifButton", function() {
        $("#images").empty();
        let showName = $(this).text();

        addImages(showName);
    });

    $(document).on("click", ".gif", function() {
        let state = $(this).attr("state");
        
        if (state === "a") {
            $(this).attr("state", "s");
            $(this).attr("src", $(this).attr("still"));
        } else if (state === "s") {
            $(this).attr("state", "a");
            $(this).attr("src", $(this).attr("animated"));
        }
    })

    $("#add-gif").on("click", function(event) {
        event.preventDefault();

        let showName = $("#gif-input").val().trim();
        shows.push(showName);
        addButtons();
    })

    function addButtons() {
        $("#buttons").empty();
        for (let i = 0; i < shows.length; i++) {
            let button = $("<button>");
            button.addClass("gifButton");
            button.text(shows[i]);
            $("#buttons").append(button);
        }
    }

    addButtons();

    function addImages(showName) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        showName + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            let results = response.data;

            for (let i = 0; i < results.length; i++) {
                // Defining the card div
                let card = $("<div>").addClass("card gifCard");

                // Defining the image and its properties
                let cardImg = $("<img>").addClass("card-img-top gif");

                let animated = results[i].images.fixed_height.url;
                let still = results[i].images.fixed_height_still.url;

                cardImg.attr("still", still);
                cardImg.attr("animated", animated);
                cardImg.attr("state", "a")

                cardImg.attr("src", animated);

                // Making the card's body
                let cardBody = $("<div>").addClass("card-body");
                let rating = results[i].rating;
                let p = $("<p>");
                p.text("Rating: " + rating);
                cardBody.append(p);

                // Appending everything together
                cardImg.appendTo(card);
                cardBody.appendTo(card);
                card.appendTo($("#images"));
            }
        });
    }
});