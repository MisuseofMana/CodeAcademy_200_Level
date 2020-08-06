'use strict';

let assert = require('assert');

//object that holds the jobTypes that exist
//used to compare crew member to the ship
let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

//Ship class
class Ship {
  constructor(name, type, ability){
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
  }

  //mission statement function that allow ship to run if a
  //crew member that can operate the ship in in the ships crew
  missionStatement() {
    //if no crew is on the ship the mission is impossible
    if(this.crew.length == 0){
      return "Can't perform a mission yet.";
    }
    //if crew exists 
    else if (this.crew.length > 0) {
      //loop through crew members
      for ( let astronauts in this.crew ){
        //if the job name key from jobTypes holds the ship type value 
        if( jobTypes[this.crew[astronauts].job] === this.type ) {
          //return the ability
          return this.ability;
        }
        //otherwise
        else {
          //the crew can't operate the ship
          return "Crew can't operate this ship.";
        }
      }
    }
  }
};

//CrewMember class
class CrewMember {
  constructor(name, job, specialSkill){
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null;
  }
  //enterShip function which adds a crew member into a provided ship
  //assigns the crew member to a ship
  enterShip(shipName) {
    this.ship = shipName;
    shipName.crew.push(this);
  }
};

//tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
