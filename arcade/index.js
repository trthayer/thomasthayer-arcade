let state = {
    players: ['x', 'o'],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    currentPlayerTurn: 0,
    active: true,
  };

const boardback = document.querySelector(".boardback");
const board = document.querySelector(".board");
const playerTurnElem = document.querySelector("#playerTurn");
const resetGame = document.querySelector(".resetGame")

let count = 0;

const resetState = () => {
    state.board.innerHTML = 
` <table class="board">
<section class="container">
    <tr>
        <td class="00"></td>                    
        <td class="01"></td>                    
        <td class="02"></td>                    
    </tr>
    <tr>
        <td class="10"></td>
        <td class="11"></td>
        <td class="12"></td>
    </tr>
    <tr>
        <td class="20"></td>
        <td class="21"></td>
        <td class="22"></td>
    </tr>
</section>
<p class="player-turn"></p>
</table>`;
state.getCurrentPlayer = () => state.players[state.currentPlayer];
state.players = ['',''];
state.currentPlayer = 0;
}

const changeTurn = () => {
    state.currentPlayer = Math.abs(state.currentPlayer - 1);
}

const resetBoard = () => {
    board.innerHTML= ""
}

const renderPlayer = () => {
    let text;
    if (!state.players[0] || !state.players[1]) {
        text = 
        `<input name="player1" placeholder="Enter Player 1"/>
        <input name="player2" placeholder="Enter Player 2"/>
        <button class="startGame">Start Game</button>
        <button class="resetGame">Reset Game</button>`; 
    } else {
        text = 
        `It is ${state.getCurrentPlayer()}'s turn.;
        <button class="resetGame">Reset Game</button>`
    }   

    playerTurnElem.innerHTML = text;
}



const render = () => {
    renderPlayer();
};

const takeTurn = (index) => {
    changeTurn();
    render();
}

playerTurnElem.addEventListener("click", (event) => {
    if (event.target.className === "startGame") {
        const player1Input = document.querySelector("input[name=player1]");
        const player1Value = player1Input.value;
        state.players[0] = player1Value;

        const player2Input = document.querySelector("input[name=player2]");
        const player2Value = player2Input.value;
        state.players[1] = player2Value;

        render();
    }
});

function playGame(event) {
    event.stopPropagation();
    if (event.target.innerHTML === "") {
        event.target.style.fontSize = "12vh";
        event.target.style.fontFamily = "cursive";
        event.target.innerHTML = count % 2 === 1 ? "X" : "O";
        event.target.style.background = count % 2 === 0 ? "tomato" : "darkOliveGreen";
        const id = event.target.id
        const row = id[0]
        const column = id[1]
        console.log(id)
        if (event.target.innerHTML === "X") {
            state.board[row][column]="X"
        }
        if (event.target.innerHTML === "O") {
            state.board[row][column]="O"
        }
        findWinner()
        takeTurn()
        
        count++;
    }   else {
        document.querySelector("h1").innerHTML = "Draw"
    }                                                                                
}

function findWinner () {
    horizontalWins()
    diagWins1()
    diagWins2()
    for (i=0; i<3; i++) {
        verticalWins(i) 
    } 
}

function horizontalWins () {
    for (let i=0; i < state.board.length; i++) {
        const combo = state.board[i].join("")
        //console.log("horizontal check", combo)
        if (combo === "XXX" || combo === "OOO") {
            document.querySelector("h1").innerHTML = "WINNER!"
            resetGame.addEventListener("click", resetState())
        }
        //console.log("You Win!")
        state.active = false
    }
}

function verticalWins (i) {
    const verticalArray = [];
    let v1 = state.board[0][i];
    verticalArray.push(v1);
    let v2 = state.board[1][i];
    verticalArray.push(v2);
    let v3 = state.board[2][i];
    verticalArray.push(v3);

    const comboV1 = verticalArray.join("")
    //console.log("vertical check", comboV1)
    if (comboV1 === "XXX" || comboV1 === "OOO") {
        document.querySelector("h1").innerHTML = "WINNER!"
        resetGame.addEventListener("click", resetState())
    }
    //console.log("You Win!")
    state.active = false
}

function diagWins1 () {
    const diagArray = [];
    let d1 = state.board[0][0];
    diagArray.push(d1);
    let d2 = state.board[1][1];
    diagArray.push(d2);
    let d3 = state.board[2][2];
    diagArray.push(d3);

    const comboD1 = diagArray.join("")
    //console.log("diagonal check", comboD1)
    if (comboD1 === "XXX" || comboD1 === "OOO") {
        document.querySelector("h1").innerHTML = "WINNER!"
        resetGame.addEventListener("click", resetState())
    }
    //console.log("You Win!")
    state.active = false
}

function diagWins2 () {
    const diagArray = [];
    let d1 = state.board[0][2];
    diagArray.push(d1);
    let d2 = state.board[1][1];
    diagArray.push(d2);
    let d3 = state.board[2][0];
    diagArray.push(d3);

    const comboD1 = diagArray.join("")
    //console.log("diagonal check", comboD1)
    if (comboD1 === "XXX" || comboD1 === "OOO") {
        document.querySelector("h1").innerHTML = "WINNER!"
        resetGame.addEventListener("click", resetState())
    }
    //console.log("You Win!")
    state.active = false
}

board.addEventListener("click", playGame);
board.addEventListener("click", resetGame)

resetState();
