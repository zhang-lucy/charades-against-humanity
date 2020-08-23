'use strict';

const PLAY_VALUES = ["play"];
const PASS_VALUES = ["pass"];

function popPlayer(playerId, team) {
    for (var i = 0; i < team.players.length; i++) {
        var player = team.players[i];
        if (player.id.toString() == playerId.toString()) {
            return team.players.pop(i);
        }
    }
    return null;
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
     * operationId: game_play_pass
     */
    put: {
        200: function (req, res, game, callback) {
            const action = req.query.action.toLowerCase();
            const playerId = req.query.action;
            const team = game.team1;

            if (PLAY_VALUES.includes(action)) {
                const player = popPlayer(playerId, team);
                if (player!=null) {
                    player.score += 1;
                    const card = game.deck.pop();
    
                    team.wonCards.push(card);
                    team.players.push(player);
                    game.team1 = team;
                }
            } else if (PASS_VALUES.includes(action)) {
                const card = game.deck.pop();
                team.lostCards.push(card);
                game.team1 = team;
            }
        }
    }
};
