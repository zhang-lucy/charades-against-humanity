'use strict';


function newPlayer(playerId, playerName, teamId) {
    return { 
        "id": playerId, 
        "name": playerName, 
        "teamId": teamId,
        "score": 0
    };
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
        200: function (req, res, game, callback) {
            var playerName = req.query.name;

            // TODO: Change so it's not just team 1
            var playerId = game.team1.players.length;
            var players = game.team1.players
            players.push(newPlayer(playerId, playerName, game.team1.id));
            game.team1.players = players;
        }
    }
};
