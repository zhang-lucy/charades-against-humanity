//  ---------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
// 
//  The MIT License (MIT)
// 
//  Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to deal
//  in the Software without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//  copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
// 
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
// 
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.
//  ---------------------------------------------------------------------------------
'use strict';
var dataProvider = require('../data/game.js');

function validGameId(id) {
    for (var game of global.games) {
        if (game.id == id) {
            return true;
        }
    }
    return false;
}

/**
 * Operations on /game
 */
module.exports = {
    /**
     * summary: Retrieves the current state of the memory game game.
     * parameters: (none)
     * produces: application/json, text/json
     * responses: 200, 400
     */
    get: function game_get(req, res, next) {
        var status;
        var message;
        
        // If there's a game with the specified ID in progress, retrieve its current state
        if (validGameId(req.query.id)){
            status = 200;
            res.status(status);
            var provider = dataProvider['get']['200'];
            var game = provider(req, res, function (err) {
                if (err) {
                    next(err);
                    return;
                }
            });
            res.json(game);
        }
        else { // No game with specified ID in progress: set bad request error
            status = 400;
            message = "Please enter a valid game id or start a new game (POST '/new?id={game id}&team1={team 1 id}&team2={team 2 id}')."
            res.status(status).send(message);
        }
    }
};