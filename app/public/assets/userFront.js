// User name and image url field validation while filling the form
$('.user-detail').on("input", function() {
    var is_value = $(this).val();
    if (is_value.length === 0) {
        $(this).next().text("This field is required");
    } else {
        $(this).next().text("");
    }
});

// On submitting the form
$("#submit").on("click", function(event) {
    event.preventDefault();
    var userName = $("#user-name").val().trim();
    var userImageURL = $("#photo-url").val().trim();

    // Validation: If any field is not filled show message
    if (!userName || !userImageURL ||
        ($("#question-2").val()) === null || ($("#question-2").val()) === null ||
        ($("#question-3").val()) === null || ($("#question-4").val()) === null ||
        ($("#question-5").val()) === null || ($("#question-6").val()) === null ||
        ($("#question-7").val()) === null || ($("#question-8").val()) === null ||
        ($("#question-9").val()) === null || ($("#question-10").val()) === null) {

        if (!userName) { $("#user-name").next().text("This field is required"); }
        if (!userImageURL) { $("#photo-url").next().text("This field is required"); }
        $("#modal-title").text("Incomplete form");
        $("#match-name").text("Please fill in all fields. 😦");
        $("#match-image").hide();
    } else {

        // Get user data and create an object with that.
        var userData = {
            name: userName,
            photo: userImageURL,
            scores: [$("#question-1").val().trim(), $("#question-2").val().trim(),
                $("#question-3").val().trim(), $("#question-4").val().trim(),
                $("#question-5").val().trim(), $("#question-6").val().trim(),
                $("#question-7").val().trim(), $("#question-8").val().trim(),
                $("#question-9").val().trim(), $("#question-10").val().trim()
            ]
        };

        // Send this user data to server and give a response ie. compactible friend data.
        $.post("/api/friends", userData, function(friendData) {
            $("#modal-title").text("Hi \"" + userData.name + "\" your match 👇🏼");
            $("#match-image").show().attr({ "src": friendData.image });
            $("#match-name").text(friendData.name);

            // Clear the form after submission
            $('#survey-form')[0].reset();
        });
    }
});