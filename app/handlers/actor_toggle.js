'use strict';
var dataProvider = require('../data/actor_toggle.js');

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
    for(var player of team.players) {
        if (player.id == playerId) {
            return true;
        }
    }
    return false;
}

/**
 * Operations on /actor_toggle
 */
module.exports = {
    /**
     * summary: Changes player&#39;s actor status on/off
     * description: 
     * parameters: id, playerId
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

        if (game == null) {
            status = 400;
            message = "Error: Enter a valid game ID";
        } else if (!checkPlayerId(game.team1, playerId)){
            status = 400;
            message = "Error: Enter a valid player ID";
        } else {
            status = 200;
            var provider = dataProvider['put']['200'];
            provider(req, res, game, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
        } 
        res.status(status).send(message);        
    }
};
