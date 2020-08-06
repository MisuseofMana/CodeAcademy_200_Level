'use strict'

//Gets current Date
let myDate = new Date().toISOString().slice(0,10);;
document.getElementById('theTime').innerText = myDate;



// Convert number to string
const ourNumber = 7;
const theString = ourNumber.toString();
console.log("The type of theString is", (typeof theString));



// Convert string to number
const theOtherString = "4.5";
const theOtherNumber = parseInt(theOtherString, 10);
console.log("The other string type is", (typeof theOtherNumber));



// Different data types
const booleanVariable = true;
const nullVariable = null;
let undefinedVariable;
const numberVariable = 0;
const nanVariable = NaN;
const stringVariable = "A String";

let type1 = typeof booleanVariable;
let type2 = typeof nullVariable;
let type3 = typeof undefinedVariable;

document.getElementById('dataType1').innerText = type1;
document.getElementById('dataType2').innerText = type2;
document.getElementById('dataType3').innerText = type3;



// Add two numbers
const firstNumber = 5;
const secondNumber = 9;
console.log(firstNumber + secondNumber);



// Only true if two values are true
const trueVariable = true;
const alsoTrueVariable = true;
const falseVariable = false;
const alsoFalseVariable = false;
if(trueVariable && alsoTrueVariable) {
    document.getElementById('bothTrue').innerText = "Yes, for sure!";
}



// Only true if one is true
if(trueVariable && !falseVariable) {
    document.getElementById('anyTrue').innerText = "Yep, indeed!";
}



//Only true if both are false
if(!falseVariable && !alsoFalseVariable) {
    document.getElementById('bothFalse').innerText = "They're both false!";
}
