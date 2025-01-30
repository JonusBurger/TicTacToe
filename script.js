// Create Object for Game
const ticTacToe = (function () {
    // Create Gamefield and function for resetting
    const xLength = 3;
    const yLength = 3;
    let field = []
    let player1 = player("Till");
    let player2 = player("Bob");
    const players = [player1, player2];


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

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    // Create function for placing a marker
    function placeMarker(x, y, activePlayer){
        // Create function to check if placing is valid
        if ((x < 0 || x >= xLength) || (y < 0 || y >= yLength)) {
            console.log("Not allowed! please enter valide field")
        } else if (field[x][y] != undefined) {
            console.log("Marker already there!")   
        } else {
        field[x][y] = activePlayer.getMarker();
        console.log("Token placed!");
        }
    }

    // Create function to check if a game is won
    function checkWinner() {
        for (let i = 0; i < xLength; i++){
            if ((field[i][0] === field[i][1] && field[i][0] === field[i][2]) && (field[i][2] != undefined)) {
                console.log("Game Over! A Player has won");
                return field[i][0]
            }
            if ((field[0][i] === field[1][i] && field[0][i] === field[2][i]) && (field[2][i] != undefined)) {
                console.log("Game Over! A Player has won");
                return field[0][i]
            }
        }
        if ((field[0][0] === field[1][1] && field[0][0] === field[2][2]) && (field[2][2] != undefined)) {
            console.log("Game Over! A Player has won");
            return field[0][0]
        }    
        if ((field[2][0] === field[1][1] && field[2][0] === field[0][2]) && (field[0][2] != undefined)) {
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
    return { players, activePlayer, createField, getGameState, placeMarker, checkWinner, checkTie, switchPlayerTurn }
})();

// Spieler Objekt benötigt
function player(name, marker = "O") {
    // Spieler hat name & einen Score & einen Marker
    const playerName = name;
    let score = 0;
    const playerMarker = marker === "O" ? "O" : "X";

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

// Object um Spieler zu erhalten
function fetchPlayer() {
    const player1Form = document.getElementById("player1");
    const player2Form = document.getElementById("player2");
    if (player2Form.value === "" || player1Form.value ==="") {
        alert("Both Players need a name!");
    }
    ticTacToe.players[0] = player(player1Form.value);
    ticTacToe.players[1] = player(player2Form.value, "X");
}

// Function um das Spielfeld zu rendern
(function () {
    // Login Player
    const btnForm = document.getElementById("btnForm");
    btnForm.addEventListener("onclick", fetchPlayer, false);
    // document abgreifen
    const mainDiv = document.getElementById("mainDiv");
    // abfragen ob es element in html schon gibt
    function buildGameField() {
        const gameFieldDiv = document.createElement("div");
        gameFieldDiv.classList.add("gameFieldDiv");
        const xLength = 3;
        const yLength = 3;
    
        for (let i = 0; i < xLength; i++){
            const gameFieldRow = document.createElement("div");
            gameFieldRow.classList.add("row");
            gameFieldRow.classList.add(`number${i}`);
            for (let j = 0; j < yLength; j++){
                const gameFieldCell = document.createElement("div");
                gameFieldCell.textContent = "";
                gameFieldCell.classList.add("cell");
                gameFieldCell.classList.add(`number${j}`);
                gameFieldCell.x = i;
                gameFieldCell.y = j;
                gameFieldRow.appendChild(gameFieldCell);
            }
            gameFieldDiv.appendChild(gameFieldRow);
        console.log("Field was created!");
        }
        const btnRestart = document.createElement("button");
        mainDiv.appendChild(gameFieldDiv);
        btnRestart.setAttribute("id", "btnRestart");
        btnRestart.innerText = "Restart";
        btnRestart.classList.add("btn");
        btnRestart.addEventListener("click", function() {
            const nodeList = gameFieldDiv.querySelectorAll(`.cell`);
            for (node of nodeList) {
                node.innerText = "";
            }
        });
        mainDiv.appendChild(btnRestart);
    }
    // falls nein - bauen des elements
    if (mainDiv.querySelector("#gameFieldDiv") === null) {
        buildGameField();
    }
})()

function playGame() {
    // fetch player data
    // create virtuell field
    ticTacToe.createField();

    //setup event Listener
    const cellList = document.querySelectorAll(".cell");
    for (cell of cellList) {
        cell.addEventListener("click", function(e) {
            if (e.currentTarget.innerText === "") {
                e.currentTarget.innerText = ticTacToe.activePlayer.getMarker();
                ticTacToe.placeMarker(e.currentTarget.x, e.currentTarget.y, ticTacToe.activePlayer);
                ticTacToe.switchPlayerTurn();
                if (ticTacToe.checkWinner()){
                    ticTacToe.activePlayer.updateScore();
                }
                if (ticTacToe.checkTie()) {
                    console.log("YAU!");
                }
            }
        })
    }
}




