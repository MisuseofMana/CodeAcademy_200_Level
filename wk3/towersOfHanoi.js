'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

//declares the winning tower state
const solution = [...stacks.a];

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// moves pieces when isLegal() returns true to towersOfHanoi()
function movePiece(startStack, endStack) {
  //removes top item from startStack with .pop()
  let moveFrom = stacks[startStack].pop();

  //adds moveFrom to endstack with .push()
  stacks[endStack].push(moveFrom);

  //checks for win
  if(checkForWin()) {
    console.log(`You won on tower ${endStack}!`);
  }
}

//Checks for legal moves
//returns true or false to towersOfHanoi
function isLegal(startStack, endStack) {

  //variables for clarity
  let fromStack = stacks[startStack];
  let toStack = stacks[endStack];
  
  //allows move if tower is empty
  if (toStack.length === 0){
    return true;
  }
  //allows move if to tower top item is less than from tower top item
  else if (toStack[toStack.length - 1] > fromStack[fromStack.length - 1]) {
    return true;
  }
  //disallows inverse of above
  else if( toStack[toStack.length - 1] < fromStack[fromStack.length - 1] ) {
    return false;
  } 
  //catch other unseen errors
  else {
    return false;
  }
}

function checkForWin() {
  let win = false;
  //look at each tower in the stacks
  for(let tower in stacks) {
    for (let i = 0; i < solution.length; i++){

      //skip comparing tower 'a' because a win cant exist on tower a.
      // run a loop as long as the ammount of rings that exist
      if (tower != 'a' && (stacks[tower].length === solution.length)){
          //sets win condition on a tower holding all values
          //and only the first needs to be matching
          //due to the rules of the game limiting
          // the numbers only able to be placed on
          //larger numbers
          if (stacks[tower][i] === solution[i]) {
            win = true;
          }
        }
      }
  }
  return win;
}

function towersOfHanoi(startStack, endStack) {
  //if return true with input from getPrompt
  //then run movePiece with passed stacks
  if(isLegal(startStack, endStack)) {
      movePiece(startStack, endStack);
  }
  else {
    console.log(`Error: You can't move a larger piece onto a smaller piece.`);
    console.log(`Try again.`);
  }
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}
















// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
