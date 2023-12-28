// function Gameboard() {
//   const rows = 3;
//   const columns = 3;
//   const board = [];

//   for (let i = 0; i < rows; i++) {
//     board[i] = [];
//     for (let j =0; j < columns; j++) {
//       board[i].push(Cell());
//     }
//   }

//   const retrieveBoard = () => board;

//   const placeCharacter = (column, player) => {
//     const openCells = board.filter((row) =>
//     row[column].getValue() === 0).map(row => row[column]);
//     if (!openCells.length) return;
//     const openRow = openCells.length;
//     board[openRow][column].placeItem(player);
//   };

//   const printBoard = () => {
//     const getBoardCellValues = board.map((row) => row.map((cell) =>
//     cell.getValue()))
//     console.log(getBoardCellValues);
//   };
//   return { retrieveBoard, placeCharacter, printBoard };
// }

// function Cell() {
//   let value = 0;
//   const placeItem = (player) => {
//     value = player;
//   };

//   const getValue = () => value;

//   return {
//     placeItem,
//     getValue
//   };
// }

const gameBoard = (() => {
  const board = [];
  let winner = null;
  let turns = 0;

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

// Player move
const playerTurn = (() => {
  const box = document.querySelectorAll('.box');
  box.forEach(box => {
    box.addEventListener('click', event => {

      // X Player1 move conditions
      if (player1.turn == true && event.target.textContent == ''
      && gameBoard.winner == null) {
        board[event.target.id] = player1.marker;
        box.textContent = player1.marker;
        player1.turn = false;
        player2.turn = true;

      // O Player 2 move conditions
      } else if (player2.turn == true && event.target.textContent == ''
      && gameBoard.winner == null) {
        board[event.target.id] = player2.marker;
        box.textContent = player2.marker; 
        player1.turn = true;
        player2.turn = false;
      } else {
        return;
      };
    });
  });
  return { box }
})();

const checkWinner = () => {
  turns++;

  let playX = board.reduce((total, current, i) =>
  (current === player1.marker) ? total.concat(i) : total, []);
  let playO = board.reduce((total, current, i) => 
  (current === player2.marker) ? total.concat(i) : total, []);

  })
}

})();