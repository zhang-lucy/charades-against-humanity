'use strict';
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
     * operationId: game_play_pass
     */
    put: {
        200: function (req, res, game, callback) {
            const playerId = req.query.playerId;
            //TODO: team
            const actors = game.team1.actors;
            if (actors.includes(playerId)) {
                actors.remove(actors.indexOf(playerId));
            } else {
                actors.push(playerId);
            }
            game.team1.actors = actors;
        }
    }
};
