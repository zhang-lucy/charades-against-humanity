'use strict';

function getGame(gameId) {
    if (global.games) {
        for(var game of global.games) {
            if (game.id == gameId) {
                return game;
            }
        }
    }
    return null;
}

/**
 * Operations on /new_player
 */
module.exports = {
    /**
     * summary: Creates a new player object and assigns it to an existing game
     * description: 
     * parameters: name
     * produces: application/json, text/json
     * responses: 200
     * operationId: game_new_player
     */
    put: {
        200: function (req, res, callback) {

            var gameId = req.query.id;
            var playerName = req.query.name;
            var valid = true;
            var message, status;

            // TODO: Change so it's not just team 1
            var game = getGame(gameId);
            if (game != null) {
                var playerId = game.team1.players.length;
                var players = game.team1.players
                players.push({"id": playerId, "name":playerName, "teamId":game.team1.id});
                game.team1.players = players;
                message = "Player added. Ready to play!";
            } else {
                valid = false;
                message = "Error: Enter a valid game ID";
            }

            if (valid) {
                status = 200;
            } else {
                status = 400;
            }

            res.status(status).send(message);

        }
    }
};
