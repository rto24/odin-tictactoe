const gameBoard = (() => {
  let board = [];
  let turns = 0;
  let winningCombo = [];

  const playerGroup = (name, marker, turn) => {
    return { name, marker, turn };
  };
// Players
  const player1 = playerGroup('player 1', 'X', true);
  const player2 = playerGroup('player 2', 'O', false);

//Win Combinations
const winCombo = [
  [0,1,2],
  [0,3,6],
  [3,4,5],
  [6,7,8],
  [1,4,7],
  [2,4,6],
  [2,5,8],
  [0,4,8]
];

let winner = null;

// Player move
const playerTurn = (() => {
  const box = document.querySelectorAll('.box');
  box.forEach(box => {
    box.addEventListener('click', e => {

      // X Player1 move conditions
      if (player1.turn == true && e.target.textContent == ''
      && gameBoard.winner == null) {
        board[e.target.id] = player1.marker;
        box.textContent = player1.marker;
        player1.turn = false;
        player2.turn = true;

      // O Player 2 move conditions
      } else if (player2.turn == true && e.target.textContent == ''
      && gameBoard.winner == null) {
        board[e.target.id] = player2.marker;
        box.textContent = player2.marker; 
        player1.turn = true;
        player2.turn = false;
      } else {
        return;
      };
      checkWinner();
    });
  });
  return { box }
})();

checkWinner = () => {
  turns++;
  // Adds player1 and player2 moves into separate arrays
  let playX = board.reduce((total, current, i) =>
  (current === player1.marker) ? total.concat(i) : total, []);
  let playO = board.reduce((total, current, i) => 
  (current === player2.marker) ? total.concat(i) : total, []);

  // Loop through winCombo
  for (let [index, value] of winCombo.entries()) {
    // Evaluates a match with player moves and winning combo
    if (value.every(elem => playX.indexOf(elem) > -1)) {
      gameBoard.winner = 'player1';
      gameBoard.winningCombo = value;

    } else if (value.every(elem => playO.indexOf(elem) > -1)) {
      gameBoard.winner = 'player2';
      gameBoard.winningCombo = value;

    } else if (gameBoard.winner == null && turns == 9) {
      gameBoard.winner = 'tie';
      gameBoard.winningCombo = value;
    }
  };
  displayWinner();
  restartGameDisplay();
  };

  // Resets game to default
  clearGame = () => {
    gameBoard.winner = null;
    player1.turn = true;
    player2.turn = false; 
    turns = 0;
    board = [];
  };
 
  return { playerTurn, clearGame, board, checkWinner, winningCombo, clearGame };
})();

const display = (() => {
  // DOM
  const box = document.querySelectorAll('.box');
  const winText = document.querySelector('.winner');
  const restartCtn = document.querySelector('.restart');
  const restartBtn = document.createElement('button');
  restartBtn.classList.add('restart-btn');
  const pOneScore = document.querySelector('#p1-score');
  const pTwoScore = document.querySelector('#p2-score');
  // console.log(pOneScore, pTwoScore)

  // Display winner
  displayWinner = () => {
  if (gameBoard.winner === 'player1') {
    winText.textContent = 'Player 1 Wins!';
    console.log(winText.textContent)
  } else if (gameBoard.winner === 'player2') {
    winText.textContent = 'Player 2 Wins!';
  } else if (gameBoard.winner === 'tie') {
    winText.textContent = `It's a tie!`;
  } else {
    return;
  }
  };

  // Display restart button after win or tie
  restartGameDisplay = () => {
    if (winText.textContent !== '') {
      restartCtn.appendChild(restartBtn);
      restartBtn.textContent = 'Play Again';
    } else {
      return;
    }
  };

  // Restarts the game
  replayGame = () => {
    gameBoard.clearGame();
    winText.textContent = '';
    box.forEach(box => {
      box.textContent = '';
    })
    restartCtn.removeChild(restartBtn);
  };

  // Event listner
  restartBtn.addEventListener('click', replayGame);  

  return { displayWinner, restartGameDisplay, replayGame };
})();

