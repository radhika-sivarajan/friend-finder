$("#submit").on("click", function(event) {
    event.preventDefault();

    var userData = {
        name: $("#user-name").val().trim(),
        photo: $("#photo-url").val().trim(),
        scores: [$("#question-1").val().trim(), $("#question-2").val().trim(),
            $("#question-3").val().trim(), $("#question-4").val().trim(),
            $("#question-5").val().trim(), $("#question-6").val().trim(),
            $("#question-7").val().trim(), $("#question-8").val().trim(),
            $("#question-9").val().trim(), $("#question-10").val().trim()
        ]
    };

    $.post("/api/friends", userData, function(data) {

        $(".match-name").text(data.name);
        $("#match-image").attr("src", data.image);

        // Clear form after submission
        $('#survey-form')[0].reset();
    });
});