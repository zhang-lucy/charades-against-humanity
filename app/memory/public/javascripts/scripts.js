// TODO: Add all the scripts to run the game

const BASE_URL = "http://localhost:8000";
const NEW_GAME = "/new";
const JOIN_GAME = "/game";
const CARDS_PATH = "../../../cards.txt";
const PLACEHOLDERDECK = [{"title": "Barack Obama", "id": "0"}, {"title": "Three midgets shitting in a bucket", "id": "1"}, {"title": "Sexual peeing", "id": "2"}];


function getAllCards(path) {
    $.get(CARDS_PATH, function(data) {
        console.log(data);
     }, 'text');
}

function newGameOk(gameId, team1, team2) {
    // TODO: Check if game ID exists already
    const lengthsOk = gameId.length > 0 && team1.length > 0 && team2.length > 0;
    const uniqueTeams = team1 != team2;
    return lengthsOk && uniqueTeams;
}

function newGame() {
    // TODO: un hardcode
    const gameId = $("#newGameId").val();
    const team1 = "team red";
    const team2 = "team blue";
    const deck = PLACEHOLDERDECK;

    if(newGameOk(gameId, team1, team2)){
        var url = BASE_URL+NEW_GAME+"?id="+gameId+"&team1Name="+team1+"&team2Name="+team2;
        $.ajax({
            type: "POST",
            url: url,
            success: function(data) {
                var game = {};

                game["id"] = gameId;
                game["team1Name"] = team1;
                game["team2Name"] = team2;
                game["deck"] = deck;

                // draw the game board
                drawGame(game);
            },
            error: function(data) {
                drawInvalidGameId(data);
            }
          });
    }
}

function joinGame() {
    // TODO: un hardcode
    const gameId = $("#newGameId").val();

    if(newGameOk(gameId, team1, team2)){
        var url = BASE_URL+JOIN_GAME+"?id="+gameId;
        $.ajax({
            type: "GET",
            url: url,
            success: function(data) {
                // $("#game-board").html(data.toString);

                console.log(data)

                // draw the game board
                drawGame(data);
            },
            error: function(data) {
                drawInvalidGameId(data);
            }
        });
    }
}

function showPlayers() {

}

function drawGame(game) {
    const teams = getTeams(game);
    const deck = getDeck(game.deck);
    $("#top-panel").html(teams);
    $("#game-board").html(deck);
}

function drawInvalidGameId(game) {
    $("#top-panel").html("<div class=error-message>Invalid Game ID"+data.toString+"</div>");
    $("#game-board").html("");
}

function getTeams(game) {
    // TODO
    var output = "";
    output += "<div class=\"team\">Team 1: " + game.team1Name + "</div>\
    <div class=\"team\">Team 2: " + game.team2Name + "</div>";
    return output;
}

function drawGameState(game) {

}

function getDeck(deck) {
    var output = "";
    // TODO: Change so that deck size shrinks as there are fewer cards
    if (deck.length > 0) {
        const nextCardId = deck[deck.length-1].id
        const nextCardTitle = deck[deck.length-1].title

        output += "<div class=\"flipContainer\">\
        <div class=\"card card-deck not-flipped\" id=\"" + nextCardId + "\" onClick=\"flipCard(this)\">\
            <div class=\"front\" style=\"display: inline-block;\">Cards Against Humanity</div>\
            <div class=\"back\" style=\"display: none;\">" + nextCardTitle + "</span></div>\
        </div></div>";
    }
    return output;
}

function flipCard(card) {
    if ($(card).hasClass("not-flipped")) {
        $(card).removeClass("not-flipped");
        $(card).addClass("flipped");
        $(card).children('.front').css("display", "none");
        $(card).children('.back').css("display", "inline-block");
    }
    else {
        $(card).removeClass("flipped");
        $(card).addClass("not-flipped");
        $(card).children('.front').css("display", "inline-block");
        $(card).children('.back').css("display", "none");
    } 
}
