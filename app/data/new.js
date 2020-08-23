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
const CARDS_PATH = "cards.txt";

// Knuth shuffle courtesy of https://www.kirupa.com/html5/shuffling_array_js.htm
Array.prototype.shuffle = function () {
    var input = this;
    for (var i = input.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];
        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
};

function getCards() {
    // TODO: Replace hardcoded names
    // const titles = ["Barack Obama", "Three midgets shitting in a bucket", "Sexual peeing"];
    // const cards = [];
    // for(var i = 0; i < titles.length; i++) {
    //     cards.push({"id": i, "name": titles[i]});
    // }
    // return cards;
}

function getTeam(name, id) {
    return {
        "id": id,
        "name": name,
        "wonCards": [],
        "lostCards": [],
        "score": 0,
        "players": [],
    }
}

/**
 * Operations on /new
 */
module.exports = {
    /**
     * summary: Sets up a new game game with the specified ID
     * 
     * parameters: id
     * produces: application/json, text/json
     * responses: 200
     * operationId: game_new
     */
    post: {
        200: function (req, res, callback) {
            var cards = getCards();
            cards.shuffle();
            const id = req.query.id;

            const team1Name = req.query.team1Name;
            const team2Name = req.query.team2Name;
            const team1 = getTeam(team1Name, 1);
            const team2 = getTeam(team2Name, 2);

            // Create corresponding card objects
            var game = {
                "id": id,
                "deck": cards,
                "team1": team1,
                "team2": team2,
                "currentTurn": team1.id
            }

            // For sample purposes only; use cloud storage for scaling up
            if (global.games) {
                global.games.push(game);
            } else {
                global.games = [game];
            }
        }
    }
};