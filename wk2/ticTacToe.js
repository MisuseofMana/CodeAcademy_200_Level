'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

//sets initial player state
let playerTurn = 'X';

//win conditions for X and O
let winX = "XXX";
let winO = "OOO";

//prints the board to the console
function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

//checks to see if the board is a winning board horizontally
function horizontalWin(firstRow, secondRow, thirdRow) {
  if(firstRow == winX || firstRow == winO) {
    return true;
  }
  if(secondRow == winX || secondRow == winO){
    return true;
  }
  if(thirdRow == winX || thirdRow == winO){
    return true;
  }
}

//checks to see if the board is a winning board vertically
function verticalWin(firstCol, secondCol, thirdCol) {
  if(firstCol == winX || firstCol == winO) {
    return true;
  }
  if(secondCol == winX || secondCol == winO){
    return true;
  }
  if(thirdCol == winX || thirdCol == winO){
    return true;
  }
}

//checks to see if the board is a winning board diagonally
function diagonalWin(firstDiag, secondDiag) {
  if(firstDiag == winX || firstDiag == winO) {
    return true;
  }
  if(secondDiag == winX || secondDiag == winO){
    return true;
  }
}

// reads the board values and stores them in variables, also runs through the functions to see if there is a winner
function checkForWin() {
    let colOne = board[0][0] + board[1][0] + board[2][0];
    let colTwo = board[1][0] + board[1][1] + board[1][2];
    let colThree = board[2][0] + board[2][1] + board[2][2];

    let rowOne = board[0][0] + board[0][1] + [0][2];
    let rowTwo = board[1][0] + board[1][1] + [1][2];
    let rowThree = board[2][0] + board[2][1] + [2][2];

    let diagonalOne = board[0][0] + board[1][1] + board[2][2];
    let diagonalTwo = board[0][2] + board[1][1] + board[2][0];
    
    if(horizontalWin(rowOne, rowTwo, rowThree)) {
      console.log(`${playerTurn} won horizontally!`);
    }
    else if (verticalWin(colOne, colTwo, colThree)) {
      console.log(`${playerTurn} won vertically!`);
    }
    else if (diagonalWin(diagonalOne, diagonalTwo)) {
      console.log(`${playerTurn} won diagonally!`);
    }    
}


//function controls gameplay
function ticTacToe(row, column) {
  
  if(playerTurn === 'X') {
    if(board[row][column] === ' '){
      board[row][column] = playerTurn;
      checkForWin();
      playerTurn = 'O';
    }
    else {
      console.log(`There is already an ${playerTurn} there. Try again.`)
    }
  } else {
    if(board[row][column] === ' '){
      board[row][column] = playerTurn;
      checkForWin();
      playerTurn = 'X'
    }
    else {
      console.log(`There is already an ${playerTurn} there. Try again.`)
    }
  }
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
