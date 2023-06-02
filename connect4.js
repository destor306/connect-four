/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i=0;i<HEIGHT;i++){
    board.push([...Array(WIDTH)]);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  var top = document.createElement("tr"); // make table row element
  top.setAttribute("id", "column-top"); // setting id="column-top"
  top.addEventListener("click", handleClick); // adding event listener, click => handle click

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td"); // creating table cell
    headCell.setAttribute("id", x); // each cell gets id
    top.append(headCell); // attach to top 
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); // creating row
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");  // creating cell
      cell.setAttribute("id", `${y}-${x}`); // cell id ="y-x", 
      row.append(cell); // appending cell in a row 
    }
    htmlBoard.append(row); // appending row in a htmlBoard
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let i=HEIGHT -1;i>=0 ;i--){
    if(!board[i][x]) 
      return i;
  }
  return null;

}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const div = document.createElement('div');
  div.setAttribute('class', `piece p${currPlayer}`);
  const td = document.getElementById(`${y}-${x}`);
  td.append(div);
  
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
 

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  //console.log(x,y );
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] =currPlayer;

  placeInTable(y, x);
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2:1;
  

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // [0,0] , [0,1], [0,2], [0,3]
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // [0,0] , [1,0], [2,0], [3,0]
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // [0,0], [1,1],[2,2],[3,3]
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //(0,3) [0,3], [1,2], [2,1],[3,0]

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
