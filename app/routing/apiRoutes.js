// Load data, these data sources hold arrays of information on friends.
var friendsList = require("../data/friends");

// Function to find the smallest element in an array
Array.prototype.minArray = function() {
    return Math.min.apply(Math, this);
};

// Routing
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsList);
    });

    app.post("/api/friends", function(req, res) {
        // Variable to hold request data from user, empty object to hold compactiple fried's data ---
        // --- and an array to hold sum of diifference between user score array and friend array.
        var userData = req.body;
        var compatibleFriend = {};
        var differenceArray = [];

        // Take friend's score array then get difference against user score array ---
        // --- and add these differences. Push it to the 'differenceArray'.
        for (var i = 0; i < friendsList.length; i++) {
            var comparingFriend = friendsList[i];
            var totalDifference = 0;
            for (var j = 0; j < comparingFriend.scores.length; j++) {
                var difference = Math.abs(comparingFriend.scores[j] - userData.scores[j]);
                totalDifference += difference;
            }
            differenceArray.push(totalDifference);
        }

        // Find minimum from the array get index of that element ---
        // --- and set as index of compatible friend get name, image url of the friend.
        var minDifference = differenceArray.minArray();
        var bestFriendIndex = differenceArray.indexOf(minDifference);
        compatibleFriend.name = friendsList[bestFriendIndex].name;
        compatibleFriend.image = friendsList[bestFriendIndex].photo;

        res.json(compatibleFriend);
    });
};