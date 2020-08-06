// variables to hold data as it changes places in the dom.
let arrOfPeople = [];
const listOfPlayers = []
const blueTeam = []
const redTeam = []

// Player Class
class Player {
  constructor(name, cell, age, nation, yearsExperience) {
    this.name = name;
    this.cell = cell;
    this.age = age;
    this.nation = nation;
    this.yearsExperience = yearsExperience;
  }
}

// DodgeBallPLayer Class
class DodgeBallPlayer extends Player {
  constructor(name, cell, age, nation, yearsExperience, mascot, teamColor) {
    super(name, cell, age, nation, yearsExperience)
    this.mascot = mascot;
    this.teamColor = teamColor;
  }
}

// getPlayers function
// fetches a random user from the randomuser API
// handles errors with !res.ok and .catch()
const getPlayers = () => {
  fetch('https://randomuser.me/api/?results=4&nat=us,dk,fr,au')
  .then(res => {
    if(!res.ok) {
      throw Error(res.statusText)
    } return res.json()
  })
  .then(posts => arrOfPeople = posts.results)
  .then(function(){
      listPeopleChoices()
  })
  .catch(err => console.log(`Error: ${err}`));   
}

//clears the HTML inside the ul element with id of 'people'
const removePlayers = () => {
  const listElement = document.getElementById('people')
  listElement.innerHTML = '';
}

//resets all lists in the DOM
const newGame = () => {
  const allLists = ['people', 'players', 'red', 'blue'];
  allLists.forEach( item => {
    let thisFocus = document.getElementById(item);
    thisFocus.innerHTML = "";
  })
}

// called after every fetch of the getPlayers API
const listPeopleChoices = () => {
  //variable assigned to the HTML DOM element with an id of 'people'
  const listElement = document.getElementById('people')
  //.map() run on arrOfPeople
  arrOfPeople.map(person => {
   
    //holder variables for person data
    let fullName = person.name.first + ' ' + person.name.last;
    let dob = person.dob.age;
    let cell = person.cell;
    let nat = person.nat;
    let exp = person.id.value.slice(0, 1);
  
    //creates li opening tag
    const li = document.createElement("li")
    //creates button as a div
    const button = document.createElement("div")
    //add class to button
    button.classList.add('customButton')
    //creates image in DOM
    const domImage = document.createElement("img")
    //adds source to above image
    domImage.src = person.picture.medium

    //sets button text
    button.innerHTML = "Accept Player"

    //sets button unique id
    let buttonId = 'accept' + fullName;
    button.id = buttonId;


    button.addEventListener('click', function () {
      makePlayer(fullName, cell, dob, nat, exp, buttonId)
    })

    li.appendChild(button) //add button
    li.appendChild(domImage) //add domImage

    li.classList.add('animated', 'fadeIn') //add class to li
    const sect = document.createElement('section') //create section element 
    sect.classList.add('wordWrap') //add class wordWrap to section
    li.appendChild(sect); //add sect to li in HTML DOM

    //create name and add to DOM
    const para = document.createElement('p') //create element p
    sect.appendChild(para); //add para to sect
    para.append(fullName) //append persons full name to para
    para.classList.add('bold'); //add class bold to para

    // create cell number and add to DOM
    const para2 = document.createElement('p') //repeat process as above
    sect.appendChild(para2)
    para2.append('Cell #: ' + person.cell)
       
    // create age and add to DOM
    const para3 = document.createElement('p')
    sect.appendChild(para3)
    para3.append('Age: ' + dob)
 
    // create Dodgeball EXP and add to DOM
    const para4 = document.createElement('p')
    sect.appendChild(para4)
    para4.append(`Dodgeball XP: ${exp}`)
    
    // create Nation and add to DOM
    const para5 = document.createElement('p')
    sect.appendChild(para5)
    para5.append('Nation: ' + nat)

    //close li
    listElement.append(li);
  });
}

// makePlayer function
// makes a new Player from passed data, received from the listPeople function 
const makePlayer = (name, cell, age, nation, yearsExperience, buttonName) => {

  // creates newPlayer using the Player class
  let newPlayer = new Player(name, cell, age, nation, yearsExperience);

  //clickedPerson holds the parent node of the id of the Button Clicked in the list of people
  let clickedPerson = document.getElementById(buttonName).parentNode;
  //clickedButton holds the dom element with the id value of buttonName
  let clickedButton = document.getElementById(buttonName);

  //remove the clickedButton from the DOM
  clickedButton.remove()

  //add the newPlayer made from the PlayerClass into the listOfPlayers array
  listOfPlayers.push(newPlayer);

  //get the index of that new player
  let playerIndex = listOfPlayers.indexOf(newPlayer);

  //get the id of the players list in the DOM
  let domPlayers = document.getElementById('players');

  //add clicked person value to the domPlayers node in the DOM
  domPlayers.append(clickedPerson);

  //create new red button
  const redButton = document.createElement("div")
  redButton.classList.add('customButton');
  redButton.classList.add('redButton');

  //create new blue button
  const blueButton = document.createElement("div")
  blueButton.classList.add('customButton');
  blueButton.classList.add('blueButton');

  //add buttons to the DOM
  clickedPerson.prepend(blueButton)
  clickedPerson.prepend(redButton)

  //set texts of buttons
  redButton.innerHTML = "Join Red Team"
  blueButton.innerHTML = "Join Blue Team"

  //add event listeners to the new red and blue buttons
  //pushes the player into the new list
  redButton.addEventListener('click', function () {
    let redPlayer = new DodgeBallPlayer(name, cell, age, nation, yearsExperience, 'Crimson Wolves', 'Red')
    addToTeam(redPlayer);
    redTeam.push(redPlayer)
  })
  blueButton.addEventListener('click', function () {
    let bluePlayer = new DodgeBallPlayer(name, cell, age, nation, yearsExperience, 'Royal Barracuda', 'Blue')
    addToTeam(bluePlayer);
    blueTeam.push(bluePlayer);
  })

  // addToTeam function, moves the player from the pending list to the player list
  function addToTeam(player) {
    redButton.remove();
    blueButton.remove();

    listOfPlayers.splice(playerIndex, 1);
    console.log(player);
    let red = document.getElementById('red');
    let blue = document.getElementById('blue')

    if (player.teamColor === 'Red') {
      clickedPerson.classList.add('redBg')
      red.append(clickedPerson)
    }
    else if (player.teamColor === 'Blue') {
      clickedPerson.classList.add('blueBg')
      blue.append(clickedPerson)
    }
  }
}