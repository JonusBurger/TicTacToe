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
    console.log(field);
}
// Create function for placing a marker
function placeMarker(x, y, token){
    // Create function to check if placing is valid
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
}
return { createField, getGameState, placeMarker, checkWinner}
}

