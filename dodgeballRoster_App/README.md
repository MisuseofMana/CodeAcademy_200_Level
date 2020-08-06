# Dodgeball ACA Week 6 Checkpoint
A Dodgeball team application for ACA 200 week 6.

## Code Plan
1. Use Class and Class constructors to setup dodgeBallPlayer.
    1. Should have attributes in the constructor for canThrowBall, canDodgeBall, hasPaid, isHealthy, and yearsExperience.
1. Use .push() to push these new dodgeBallPlayer objects into a new array
    1. Display them in the DOM as available players to pick using 
    document.innerHTML() and .append() inside a .forEach() loop.
1. Add buttons to each dodgeBallPlayer so they can be placed on the Blue or Red Team with the Teammate, should create an onclick to assign to the team button clicked.
    1. Each instance pushed to a team should now have a mascot and a teamColor property.
1. When placed in a new team the player should change place in the DOM to be put in the correct team.
1. Create 3 tests.
    1. Do the players have the correct stats when placed on a team?
    1. Do the players get assigned to the correct team when a team button is clicked?
    1. Do the players get a mascot and team color when assigned to a team?

## Assignment Outline
We are in need of a sorting and organizing app for our community dodge ball league. 
There are already 6 players signed up and we hope to get more! We need to select from our currently sign-up people to make them dodge ball players and from there we need to be able to select them to be on different teams.

### Code Requirements
1. [X] Code player, blueTeamate, and redTeammate classes.
1. [X] Use the class keyword to create a template of a dodgeBallPlayer that requires canThrowBall, canDodgeBall, hasPaid, isHealthy, yearsExperience. (Can be custom attributes, do not need to be what is declared here.)
1. [X] Push these new dodge ball Player objects into a new array and then display them in the DOM as available players to pick.
1. [X] Add a button to each new player that will allow each one to be selected for either Blue Team or Read Team and now has mascot and teamColor
1. [X] Use the this keyword to assign each player to a team with an onclick. Either Blue Team or Red Team.
1. [X] Display the two teams in a new list in the DOM with appropriate titles.
1. [X] Create 3 tests for your application.

# Tests
1. Does the app properly fetch people from the RandomUser API?
    1. It should use fetch() to get the information from the API.
    1. It should return a JSON Object containing data representing a person.
    1. The data should be made accessible with the .json interpreter method.
1. Does the app generate and display new "people" in the HTML DOM when "Populate Roster" is clicked?
1. Does the person displayed have a button to "Accept Player".
    1. When "Accept Player" is clicked the DOM representation of the player should move to the "Pending Players" div.
    1. When "Accept Player" is clicked the data for that player should be passed into the "listOfPlayers" array.
    1. When "Accept Player" is clicked the new DOM representation of the player should have new buttons "Join Red Team" and "Join Blue Team".
1. Once a player has been added to a Team, the player in the DOM representation should take on that teams color.
1. The Reset App Button should delete all items in the DOM categories. 
