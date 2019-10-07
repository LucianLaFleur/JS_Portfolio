

let player = {
  health: 50,
  power: 20
}

let opponent = {
  health: 50,
  power: 20
}

const attack = () => {
  let attackButton = document.getElementById('attack-button');
  let gameMessage = document.getElementById('game-message');
  let playerAtkPwr = document.getElementById('player-attack-power');
  let playerAttack = determineAttack(player.power);
    opponent.health -= playerAttack;
    playerAtkPwr.innerText= `You hit for ${playerAttack}`;
    
    //document.getElementById("opponent-health").style.border = "hidden"
    printToScreen();

    if (isGameOver(opponent.health)){
      gameMessage.innerText = "You won the fight!";
      attackButton.hidden = "true";
      return;
    }

 // document.getElementById("player-health").style.border = "2px solid red";
  attackButton.disabled = "true";
  gameMessage.innerText = "Opponent rears up to attack";

  setTimeout(() => {
    let opponentAttack = determineAttack(opponent.power);
    let enemyAtkPwr = document.getElementById('enemy-attack-power');
    enemyAtkPwr.innerText= `Enemy struck for ${opponentAttack}`
    player.health -= opponentAttack;
    attackButton.disabled = false;
    //document.getElementById("player-health").style.border = "hidden";
  }, 500);
  if (isGameOver(player.health)){
    gameMessage.innerText = "Oh no! The enemy won the fight!";
    attackButton.hidden = "true";
    //restartButton.hidden = false;
    return;
  }
}

const determineAttack = (power) => {
  return Math.floor(Math.random() * power) + 1
}

const isGameOver = (health) => {
  return health <= 0;
  //returns a bool of true or false
}




const printToScreen = () => {
  document.getElementById('opponent-health').innerText = 
  opponent.health;


  document.getElementById('player-health').innerText = 
  player.health;
}

printToScreen();

// dice roller aspect

let cumulativeTotal = 0

function rollDice() {
  var die1 = document.getElementById("die1");
  var die2 = document.getElementById("die2");
  var status = document.getElementById("status");
  var d1 = Math.floor(Math.random() * 6) + 1;
  var d2 = Math.floor(Math.random() * 6) + 1;
  var diceTotal = d1 + d2;
  die1.innerHTML = d1;
  die2.innerHTML = d2;
  status.innerHTML = "You rolled "+ diceTotal + "!";
  if(d1 == d2) {
    status.innerHTML += " Doubles! Congrats, you get a bonus ten points!";
    diceTotal += 10;
  }
  cumulativeTotal += diceTotal;
  ct.innerHTML = `Your total is ${cumulativeTotal} points`;
}

// show the hidden block element
function toggleCombatMessage() {
  var x = document.getElementById("game-message");
  if (x.style.display == "none" || x.style.display == "") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function toggleDiceTotal() {
  var x = document.getElementById("ct");
  console.log(x.style.display)
  if (x.style.display == "none" || x.style.display == "") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}