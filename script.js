// Create Object for Game
function ticTacToe () {
    // Create Gamefield and function for resetting
    const xLength = 3;
    const yLength = 3;
    let field = []

    function createField() {
        for (let i = 0; i < xLength; i++){
            let row =  [];
            for (let j = 0; j < yLength; j++){
                row[j] = undefined;
            }
            field[i] = row;
        }
        console.log("Field was created!");
    }

    // Create function for accessing gamestate
    function getGameState() {
        console.log(field[0]);
        console.log(field[1]);
        console.log(field[2]);
    }

    // Create function for placing a marker
    function placeMarker(token){
        // Create function to check if placing is valid
        const x = parseInt(prompt("Enter x_pos:"));
        const y = parseInt(prompt("Enter y_pos:"));
        if ((x < 0 || x >= xLength) || (y < 0 || y >= yLength) || field[x][y] != undefined) {
            console.log("Not allowed! please enter valide field")
        } else {
        field[x][y] = token;
        console.log("Token placed!");
        }
    }

    // Create function to check if a game is won
    function checkWinner() {
        for (let i = 0; i < xLength; i++){
            if (field[i][0] === field[i][1] == field[i][2] && field[i][2] != undefined) {
                console.log("Game Over! A Player has won");
                return field[i][0]
            }
            if (field[0][i] === field[1][i] == field[2][i] && field[2][i] != undefined) {
                console.log("Game Over! A Player has won");
                return field[0][i]
            }
        }
        if (field[0][0] === field[1][1] == field[2][2] && field[2][2] != undefined) {
            console.log("Game Over! A Player has won");
            return field[0][0]
        }    
        if (field[2][0] === field[1][1] == field[0][2] && field[0][2] != undefined) {
            console.log("Game Over! A Player has won");
            return field[2][0]
        }    
        console.log("check succsessful, nobody won yet")
        return false
    }

    // Check for tie
    function checkTie() {
        for (let i = 0; i < xLength; i++){
            for (let j = 0; j < yLength; j++){
                if (field[i][j] === undefined) {
                    return false
                }
            }
        }
        console.log("Tie!");
        return true 
    }
    return { createField, getGameState, placeMarker, checkWinner, checkTie }
}

// Spieler Objekt benötigt
function player(name, marker = "o") {
    // Spieler hat name & einen Score & einen Marker
    const playerName = name;
    let score = 0;
    const playerMarker = marker === "o" ? "o" : "x";

    function getMarker() {
        return playerMarker
    }

    function updateScore() {
        score++;
        console.log(`Score of player ${this.playerName} is now ${score}`)
    }

    function getScore() {
        return score;
    }
    
    // Score muss zurücksetzbar sein
    function resetScore() {
        score = 0;
    }
    return { playerName, getMarker, updateScore, getScore, resetScore }
}

function playGame() {
    let namePlayer1 = prompt("Enter Name of Player 1:");
    let namePlayer2 = prompt("Enter Name of Player 2:");

    const player1 = player(namePlayer1);
    const player2 = player(namePlayer2, "x");

    const game = ticTacToe();

    game.createField();

    while (!game.checkTie()) {
        console.log(game.getGameState());
        game.placeMarker(player1.getMarker());
        if (game.checkWinner()) {
            break;
        }
        game.placeMarker(player2.getMarker());
        if (game.checkWinner()) {
            break;
        }
    }


}




