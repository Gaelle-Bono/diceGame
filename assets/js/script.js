/* eslint-disable linebreak-style */
let ROUND = 0;
let hasWon = false;

function rollDice() {
  return (Math.floor(Math.random() * 6) + 1);
}

function whoIsPlaying() {
  return (parseInt(document.querySelector('.show').id, 10));
}

function changePlayer() {
  const showedCircle = document.querySelector('.show');
  showedCircle.classList.remove('show');

  const hiddenCircle = document.querySelector('.hidden');
  hiddenCircle.classList.remove('hidden');

  showedCircle.classList.add('hidden');
  hiddenCircle.classList.add('show');
}

function removeDice(diceNumberClassName) {
  document.getElementById('dice').classList.remove(diceNumberClassName);
}

function setCurrentScore() {
  const indexActualPlayer = whoIsPlaying();
  // display current score
  document.querySelector(`.current-score${indexActualPlayer}`).innerHTML = ROUND;
}

function resetCurrentScores() {
  document.querySelector('.current-score1').innerHTML = 0;
  document.querySelector('.current-score2').innerHTML = 0;
}

function resetGlobalScores() {
  document.querySelector('.global-score1').innerHTML = 0;
  document.querySelector('.global-score2').innerHTML = 0;
}

function resetPlayers() {
  document.getElementById('1').classList.replace('hidden', 'show');
  document.getElementById('2').classList.replace('show', 'hidden');
}

function onRollDice() {
  // roll the dice
  const diceNumber = rollDice();

  const diceIcon = document.getElementById('dice');
  const className = diceIcon.classList.item(1);
  if (className) {
    // display the new face on the mat
    diceIcon.classList.replace(className, `bi-dice-${diceNumber}`);
  } else {
    // display the dice face on the mat
    diceIcon.classList.add(`bi-dice-${diceNumber}`);
  }

  // if the dice number is 1, the player loose his round and loose his turn
  if (diceNumber === 1) {
    setTimeout(() => {
      removeDice('bi-dice-1');
    }, 1000);
    ROUND = 0;
    resetCurrentScores();
    setTimeout(() => {
      changePlayer();
    }, 200);
  // dice number is not 1 : we credit the current score with the dice's number
  } else {
    ROUND += diceNumber;
    setCurrentScore();
  }
}

function removeButtonColor(event) {
  const myElement = event.target;
  if (myElement.style.backgroundColor !== 'rgb(255,255,255)') {
    if (myElement.tagName === 'BUTTON') {
      myElement.style.backgroundColor = 'rgb(255,255,255)';
      myElement.children[0].style.backgroundColor = 'rgb(255,255,255)';
      // it can be the icon of the button
    } else {
      myElement.style.backgroundColor = 'rgb(255,255,255)';
      myElement.parentNode.style.backgroundColor = 'rgb(255,255,255)';
    }
  }
}

function addButtonColor(event) {
  const myElement = event.target;
  if (myElement.style.backgroundColor !== 'rgb(235, 211, 211)') {
    if (myElement.tagName === 'BUTTON') {
      myElement.style.backgroundColor = 'rgb(235, 211, 211)';
      myElement.children[0].style.backgroundColor = 'rgb(235, 211, 211)';
      // it can be the icon of the button
    } else {
      myElement.style.backgroundColor = 'rgb(235, 211, 211)';
      myElement.parentNode.style.backgroundColor = 'rgb(235, 211, 211)';
    }
  }
}

function onHold() {
  const className = document.getElementById('dice').classList.item(1);
  // check dice on the mat
  if (className && (className !== 'bi-dice-1')) {
    const indexActualPlayer = whoIsPlaying();
    // display global score

    const globalScoreSpan = document.querySelector(`.global-score${indexActualPlayer}`);
    globalScoreSpan.innerHTML = parseInt(globalScoreSpan.innerHTML, 10) + parseInt(ROUND, 10);

    if (globalScoreSpan.innerHTML >= 100) {
      setTimeout(() => {
        hasWon = true;
        const rollDiceButton = document.querySelector('.roll-dice');
        rollDiceButton.removeEventListener('click', onRollDice);
        rollDiceButton.style.cursor = 'none';
        rollDiceButton.addEventListener('mouseover', removeButtonColor);

        const holdButton = document.querySelector('.hold');
        holdButton.removeEventListener('click', onHold);
        holdButton.style.cursor = 'none';
        holdButton.addEventListener('mouseover', removeButtonColor);

        // eslint-disable-next-line no-alert
        alert(`Well done! You've won the game, Player${indexActualPlayer}. Click on 'NEW GAME' to play again.`);
      }, 200);
      return;
    }
    ROUND = 0;
    // remove the bi-dice-number class
    removeDice(className);
    resetCurrentScores();
    changePlayer();
  }
}

function onNewGame() {
  const rollDiceButton = document.querySelector('.roll-dice');
  const holdButton = document.querySelector('.hold');

  ROUND = 0;
  const className = document.getElementById('dice').classList.item(1);
  // check dice on the mat
  if (className) {
    removeDice(className);
  }
  resetCurrentScores();
  resetGlobalScores();
  resetPlayers();

  if (hasWon) {
    rollDiceButton.style.cursor = 'pointer';
    rollDiceButton.addEventListener('click', onRollDice);
    rollDiceButton.removeEventListener('mouseover', removeButtonColor);
    rollDiceButton.addEventListener('mouseover', addButtonColor);
    rollDiceButton.addEventListener('mouseout', removeButtonColor);

    holdButton.style.cursor = 'pointer';
    holdButton.addEventListener('click', onHold);
    holdButton.removeEventListener('mouseover', removeButtonColor);
    holdButton.addEventListener('mouseover', addButtonColor);
    holdButton.addEventListener('mouseout', removeButtonColor);

    hasWon = false;
  }
}

document.querySelector('.roll-dice').addEventListener('click', onRollDice);
document.querySelector('.hold').addEventListener('click', onHold);
document.querySelector('.new-game').addEventListener('click', onNewGame);
