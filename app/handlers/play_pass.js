'use strict';
var dataProvider = require('../data/play_pass.js');

function getGame(gameId) {
    if (global.games) {
        for (var game of global.games) {
            if (game.id == gameId) {
                return game;
            }
        }
    }
    return null;
}

function checkPlayerId(team, playerId) {
    for(var actor of team.actors) {
        if (playerId.toString() == actor) {
            return true;
        }
    }
    return false;
}

/**
 * Operations on /play_pass
 */
module.exports = {
    /**
     * summary: Gives current player the option to play or pass
     * description: 
     * parameters: id, playerId, play
     * produces: application/json, text/json
     * responses: 200
     */
    put: function game_play_pass(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var gameId = req.query.id;
        var playerId = req.query.playerId;
        var status = 200;
        var message;

        var game = getGame(gameId);
        if (game != null) {
            const playerIdValid = checkPlayerId(game.team1, playerId); // TODO unhardcode
            if (playerIdValid) {
                var provider = dataProvider['put']['200'];
                provider(req, res, game, function (err, data) {
                    if (err) {
                        next(err);
                        return;
                    }
                    res.status(status).send(data && data.responses);
                });
            } else {
                status = 400;
                message = "Error: Player ID is not a valid actor."
            }
        } else {
            status = 400;
            message = "Error: Enter a valid game ID";
        }
        res.status(status).send(message);
    }
};
