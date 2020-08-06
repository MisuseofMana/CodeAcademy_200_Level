'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let turns = 0;
let hint;

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess) {

  if(turns == 10){
    console.log(`You ran out of turns! The solution was ${solution}.`);
    return `You ran out of turns! The solution was ${solution}.`;
  }

 let solutionArray = solution.split('');
 let guessArray = guess.split('');

 let correctLetterLocations = 0;
 let correctLetters = 0;

 solutionArray.forEach((element, index) => {
  //  console.log(`Match ${guessArray} to ${solutionArray}`);
   if (solutionArray[index] === guessArray[index]) {
     correctLetterLocations++;
     solutionArray[index] = null;
   }
 });

 //compare each item in solutions Array with each item in guess Array
 solutionArray.forEach((element, index) => {
   let targetIndex = solutionArray.indexOf(guessArray[index]);
  //  console.log(`Look for ${guessArray[index]} in ${solutionArray}`);
    if(targetIndex > -1){
      correctLetters++;
      solutionArray[targetIndex] = null; 
  }
 });

return `${correctLetterLocations} - ${correctLetters}
Guess Again!`;

}

function mastermind(guess) {
  if(guess.length == 4){
    //if guess matches solution
    if(guess == solution){
      console.log (`You guessed it!`); 
      return `You guessed it!`;
    }

    //if guess doesn't match solution
    else { 
      hint = generateHint(guess);
      board.push(`You guessed ${guess}`);
      board.push(hint);
    }
  }
  //if guess is input as anything other than 4 letters long
  else {
    console.log(`Your guess must be 4 letters long.`);
  }
}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
