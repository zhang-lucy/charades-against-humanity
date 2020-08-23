'use strict';
var dataProvider = require('../data/new_player.js');
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

        var status = 200;
        var provider = dataProvider['put']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
