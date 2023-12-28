function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j =0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const retrieveBoard = () => board;

  const placeCharacter = (column, player) => {
    const openCells = board.filter((row) =>
    row[column].getValue() === 0).map(row => row[column]);
    if (!openCells.length) return;
    const openRow = openCells.length;
    board[openRow][column].placeItem(player);
  }
}

function Cell() {
  let value = 0;
  const placeItem = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    placeItem,
    getValue
  };
}