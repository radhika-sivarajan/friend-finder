$('.user-detail').on("input", function() {
    var is_value = $(this).val();
    if (is_value.length === 0) {
        $(this).next().text("This field is required");
    } else {
        $(this).next().text("");
    }
});

$("#submit").on("click", function(event) {
    event.preventDefault();
    var userName = $("#user-name").val().trim();
    var userImageURL = $("#photo-url").val().trim();

    if (!userName || !userImageURL || ($("#question-2").val()) === null || ($("#question-2").val()) === null ||
        ($("#question-3").val()) === null || ($("#question-4").val()) === null ||
        ($("#question-5").val()) === null || ($("#question-6").val()) === null ||
        ($("#question-7").val()) === null || ($("#question-8").val()) === null ||
        ($("#question-9").val()) === null || ($("#question-10").val()) === null) {
        if (!userName) {
            $("#user-name").next().text("This field is required");
        }
        if (!userImageURL) {
            $("#photo-url").next().text("This field is required");
        }
        $("#modal-title").text("Incomplete form");
        $("#match-name").text("Please fill in all fields. 😦");
        $("#match-image").hide();
    } else {
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

        $.post("/api/friends", userData, function(data) {

            $("#modal-title").text("Hi \"" + userData.name + "\" your match 👇🏼");
            $("#match-image").show().attr({ "src": data.image });
            $("#match-name").text(data.name);

            // Clear form after submission
            $('#survey-form')[0].reset();
        });
    }
});