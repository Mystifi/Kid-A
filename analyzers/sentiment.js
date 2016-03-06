var sentiment = require('sentiment');

module.exports = {
	parser: function(room, message) {
		// Don't even bother with messages that are just emoticons.
		if (toId(message).length < 2) return false;

		var smt = sentiment(message);

		if (!smt.words.length) return false;

		if (!Data.data[room].sentiment) Data.data[room].sentiment = {score: smt.score, n: 1};

		Data.data[room].sentiment.score = (Data.data[room].sentiment.score + smt.score) / ++Data.data[room].sentiment.n;

		Handler.writeData();
	},

	display: room => 'Average sentiment: ' + (Data.data[room].sentiment ? Data.data[room].sentiment.score * 1000 : 0),
}