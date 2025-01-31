// Create Object for Game
const ticTacToe = (function () {
    // Create Gamefield and function for resetting
    const xLength = 3;
    const yLength = 3;
    let field = []
    let player1;
    let player2;
    const getPlayers = () => [player1, player2];

    function createPlayers(namePlayer1, namePlayer2) {
        player1 = player(namePlayer1);
        player2 = player(namePlayer2, "X");
    }

    function resetPlayers() {
        player1 = undefined;
        player2 = undefined;
    }

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

    let activePlayer

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === getPlayers()[0] ? getPlayers()[1] : getPlayers()[0];
    };
    
    function getActivePlayer() {
        return activePlayer
    }

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
                return [[i,0],[i,1],[i,2]] 
            }
            if ((field[0][i] === field[1][i] && field[0][i] === field[2][i]) && (field[2][i] != undefined)) {
                console.log("Game Over! A Player has won");
                return [[0,i],[1,i],[2,i]]
            }
        }
        if ((field[0][0] === field[1][1] && field[0][0] === field[2][2]) && (field[2][2] != undefined)) {
            console.log("Game Over! A Player has won");
            return [[0,0],[1,1],[2,2]]
        }    
        if ((field[2][0] === field[1][1] && field[2][0] === field[0][2]) && (field[0][2] != undefined)) {
            console.log("Game Over! A Player has won");
            return [[2,0],[1,1],[0,2]]
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
    return { getPlayers, createPlayers, resetPlayers, getActivePlayer, createField, getGameState, placeMarker, checkWinner, checkTie, switchPlayerTurn }
})();

// Spieler Objekt benötigt
function player(name, marker = "O") {
    // Spieler hat name & einen Score & einen Marker
    const playerName = name;
    let score = 0;
    const playerMarker = marker === "O" ? "O" : "X";

    const getName = () => playerName;    

    function getMarker() {
        return playerMarker
    }

    function updateScore() {
        score++;
        console.log(`Score of player ${this.playerName} is now ${score}`);
    }

    function getScore() {
        return score;
    }
    
    // Score muss zurücksetzbar sein
    function resetScore() {
        score = 0;
    }
    return { getName, getMarker, updateScore, getScore, resetScore }
}

function createPlayerDivs() {
    const playersDiv = document.querySelector(".playersDiv");
    if (playersDiv) {
        playersDiv.setAttribute("style", "display: flex");
    } else {
        const formElement = document.getElementById("form");
        const playersDiv = document.createElement("div");
        playersDiv.classList.add("playersDiv");
        for (currentPlayer of ticTacToe.getPlayers()){
            const player1Div = document.createElement("div");
            player1Div.classList.add("column");
            const playerName = currentPlayer.getName();
            const playerScore = currentPlayer.getScore();
            const playerMarker = currentPlayer.getMarker();
            const playerDivName = document.createElement("div");
            playerDivName.innerText = `Name: ${playerName}`;
            playerDivName.classList.add("entry");
            player1Div.setAttribute("id", `player${playerMarker}`)
            const playerDivScore = document.createElement("div");
            playerDivScore.innerHTML = `Current Score: <span class="score">${playerScore}</span>`;
            playerDivScore.classList.add("entry");
            const playerDivMarker = document.createElement("div");
            playerDivMarker.innerText = `Player Marker: ${playerMarker}`;
            playerDivMarker.classList.add("entry");
            player1Div.appendChild(playerDivName);
            player1Div.appendChild(playerDivScore);
            player1Div.appendChild(playerDivMarker);
            playersDiv.appendChild(player1Div);
        }
        formElement.appendChild(playersDiv);    
    }
}

function setActiveFrame() {
    const activePlayer = ticTacToe.getActivePlayer();
    const activeMarker = activePlayer.getMarker();
    document.getElementById(`player${activeMarker}`).classList.add("activePlayer");
    document.getElementById(`player${activeMarker === "X" ? "O" : "X"}`).classList.remove("activePlayer");
}

function setScore() {
    const activePlayer = ticTacToe.getActivePlayer();
    const activeMarker = activePlayer.getMarker();
    document.getElementById(`player${activeMarker}`).querySelector(".score").innerText = ticTacToe.getActivePlayer().getScore();
}

function logoutBtn() {
    const btn = document.getElementById("btnForm");
    // Implement Logic for changing Players in TicTacToe
    btn.removeEventListener("click", login);
    btn.addEventListener("click", logout);
    btn.innerText="Logout";
    // add to document
}

function setActiveGamefield(e) {
        if (e.currentTarget.innerText === "") {
            e.currentTarget.innerText = ticTacToe.getActivePlayer().getMarker();
            ticTacToe.placeMarker(e.currentTarget.x, e.currentTarget.y, ticTacToe.getActivePlayer());
            if (ticTacToe.checkWinner()){
                ticTacToe.getActivePlayer().updateScore();
                setScore();
                closeGame()
            }
            if (ticTacToe.checkTie()) {
                console.log("YAU!");
                closeGame()
            }
            ticTacToe.switchPlayerTurn();
            setActiveFrame();
        }
}

function loginBtn() {
    const btn = document.getElementById("btnForm");
    // Implement Logic for changing Players in TicTacToe
    if (ticTacToe.getPlayers[0] != undefined) {
        btn.removeEventListener("click", logout);
    }
    btn.addEventListener("click", login);
    btn.innerText="Login";    
}

function restartBtn() {
    const mainDiv = document.getElementById("mainDiv");
    const btnRestart = document.createElement("button");
    btnRestart.setAttribute("id", "btnRestart");
    btnRestart.innerText = "Restart";
    btnRestart.classList.add("btn");
    mainDiv.appendChild(btnRestart);
}

function logout(e) {
    e.preventDefault();
    loginBtn();
    ticTacToe.resetPlayers();
    changeLoginState();
    closeGame();
    const restartBtn = document.getElementById("btnRestart");
    restartBtn.removeEventListener("click", restart);
}

// Start the game
function login(e) {
    e.preventDefault();
    if (fetchPlayer()) {
        changeLoginState();
        logoutBtn();
        playGame();
        const restartBtn = document.getElementById("btnRestart");
        restartBtn.addEventListener("click", restart);
    };
}

function restart() {
    const gameFieldDiv = document.querySelector(".gameFieldDiv");
    const cellList = gameFieldDiv.querySelectorAll(`.cell`);
    for (cell of cellList) {
        cell.innerText = "";
        ticTacToe.createField();
    }
    playGame();    
}

function changeLoginState() {
    if (document.querySelector(".formElement").getAttribute("style") === null || 
    !document.querySelector(".formElement").getAttribute("style").includes("none")) {
        const formRowList = document.querySelectorAll(".formElement");
        for (row of formRowList) {
            row.setAttribute("style", "display: none");
        }
        createPlayerDivs();    
    } else {
        const formRowList = document.querySelectorAll(".formElement");
        for (row of formRowList) {
            row.setAttribute("style", "display: flex");
        }
        const playersDiv = document.querySelector(".playersDiv");
        playersDiv.setAttribute("style", "display: none");        
    }
}

// Object um Spieler zu erhalten
function fetchPlayer() {
    const player1Form = document.getElementById("player1");
    const player2Form = document.getElementById("player2");
    if (player2Form.value === "" || player1Form.value ==="") {
        alert("Both Players need a name!");
        return false
    }
    ticTacToe.createPlayers(player1Form.value, player2Form.value);
    ticTacToe.switchPlayerTurn();
    player1Form.value ="";
    player2Form.value ="";
    return true
}

// Function um das Spielfeld zu rendern
(function () {
    // Login Player
    loginBtn();
    // document abgreifen
    const mainDiv = document.getElementById("mainDiv");
    // Spielfeld aufbauen
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
        mainDiv.appendChild(gameFieldDiv);
        restartBtn();
    }
    // falls nein - bauen des elements
    if (mainDiv.querySelector("#gameFieldDiv") === null) {
        buildGameField();
    }
})()

function closeGame() {
    const cellList = document.querySelectorAll(".cell")
    for (cell of cellList) {
        cell.classList.remove("activeCell");
        cell.removeEventListener("click", setActiveGamefield);
        cell.innerText = "";
    }
}

function playGame() {
    // fetch player data
    // create virtuell field
    ticTacToe.createField();
    setActiveFrame();
    //setup event Listener
    const cellList = document.querySelectorAll(".cell");
    for (cell of cellList) {
        cell.classList.add("activeCell");
        cell.addEventListener("click", setActiveGamefield)
    }
}


// To-Dos
// Update Score
// Display active Player
// Lock TicTacToe Screen after Win
// Display Winner / Tie
// clean up UI


