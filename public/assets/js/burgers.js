// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".change-eat").on("click", function (event) {
        var id = $(this).data("id");
        var newEaten = $(this).data("devoured");

        var newdevoured = {
            devoured: newEaten
        };
        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newdevoured
        }).then(
            function () {
                console.log("changed devoured to", newdevoured);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    //submit form
    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        let newBurger = {
            name: $("#bu").val(),
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
