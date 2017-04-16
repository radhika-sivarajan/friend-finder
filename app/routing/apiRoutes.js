var friedsList = require("../data/friends");

Array.prototype.minArray = function () {
	return Math.min.apply(Math, this);
};

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friedsList);
    });

    app.post("/api/friends", function(req, res) {
        var compatibleFriend = {
            name: "",
            image: ""
        };
        var userData = req.body;
        var differenceArray = [];

        for (var i = 0; i < friedsList.length; i++) {
            var comparingFriend = friedsList[i];
            var totalDifference = 0;

            for (var j = 0; j < comparingFriend.scores.length; j++) {
            	var difference = Math.abs(comparingFriend.scores[j] - userData.scores[j]);
            	totalDifference += difference;
            }
            differenceArray.push(totalDifference);
        }
        // console.log(differenceArray); // Array of difference sum for each friend

        var minDifference = differenceArray.minArray();
        var bestFriendIndex = differenceArray.indexOf(minDifference);

        compatibleFriend.name = friedsList[bestFriendIndex].name;
        compatibleFriend.image = friedsList[bestFriendIndex].photo;

        res.json(compatibleFriend);
    });
};