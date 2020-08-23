'use strict';
var dataProvider = require('../data/new_player.js');

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

function checkName() {
    // TODO: Make sure the name does not appear in the player list already
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
     */
    put: function game_new_player(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */

        var gameId = req.query.id;
        var valid = true;
        var message, status;

        var game = getGame(gameId);
        if (game != null) {
            status = 200;
            var provider = dataProvider['put']['200'];
            provider(req, res, game, function (err, data) {
                if (err) {
                    next(err);
                    return;
                }
                res.status(status).send(data && data.responses);
            });
        } else {
            valid = false;
            status = 400;
            message = "Error: Enter a valid game ID";
        }

        res.status(status).send(message);
    }
};
