'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const pigLatin = (word)  => {

    // Make the word lowercase before anything
    word = word.toLowerCase();

    //initalize the vowelLocation variable to be used later in the code
    let vowelLocation = 0;

    // An array of vowels to look for in below for loop
    const vowelList = ['a','e','i','o','u'];

    // if statement to compare the first letter in word at (index 0) with the vowelList array. 
    if(vowelList.includes(word[0])) {
      return word + "yay";
    }
    
    // else it must start with a consonant so we need to find the first vowel
    else {
      
      // loop throught the letters in word
      for(let i=0; i < word.length; i++) {
        
        //sets a variable which represents the current letter in word
        let currentCharacter = word[i]
        
        // if statement which checks for a vowel using the
        //vowelList array and compares it to the current character
        if (vowelList.includes(currentCharacter)) {
          vowelLocation = i;
          break;
        }
      }

      //return the piglatin version of the word by slicing from vowelLocation,
      //then concatenating the letters up to the vowel from index 0 and adding "ay"
      return word.slice(vowelLocation) + word.slice(0, vowelLocation) + "ay"

    }
}

const getPrompt = () => {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
