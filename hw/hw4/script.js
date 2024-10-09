const playerFigures = document.querySelectorAll('.player figure');
const computerThrowImg = document.getElementById('computerThrow');
const resultDisplay = document.getElementById('result');
const scoreDisplay = {
    wins: document.getElementById('wins'),
    losses: document.getElementById('losses'),
    ties: document.getElementById('ties')
};
const resetButton = document.getElementById('reset');

let playerChoice = null;
let computerChoice = null;
let wins = 0;
let losses = 0;
let ties = 0;

const choices = ['rock', 'paper', 'scissors'];

playerFigures.forEach(figure => {
    figure.addEventListener('click', function() {
        playerFigures.forEach(f => f.classList.remove('selected')); 
        this.classList.add('selected'); 
        playerChoice = this.dataset.choice;

        computerTurn();
    });
});

function computerTurn() {
    let shuffleIndex = 0;
    const shuffleInterval = setInterval(() => {
        computerThrowImg.src = `${choices[shuffleIndex]}.png`;
        shuffleIndex = (shuffleIndex + 1) % 3;
    }, 500);

    setTimeout(() => {
        clearInterval(shuffleInterval);
        computerChoice = choices[Math.floor(Math.random() * 3)];
        computerThrowImg.src = `${computerChoice}.png`;
        determineWinner();
    }, 3000);
}

function determineWinner() {
    if (playerChoice === computerChoice) {
        resultDisplay.textContent = 'It\'s a Tie!';
        ties++;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultDisplay.textContent = 'You Win!';
        wins++;
    } else {
        resultDisplay.textContent = 'Computer Wins!';
        losses++;
    }
    updateScore();
}

function updateScore() {
    scoreDisplay.wins.textContent = wins;
    scoreDisplay.losses.textContent = losses;
    scoreDisplay.ties.textContent = ties;
}

resetButton.addEventListener('click', function() {
    wins = 0;
    losses = 0;
    ties = 0;
    playerChoice = null;
    computerChoice = null;
    resultDisplay.textContent = 'Choose your move to start the game!';
    computerThrowImg.src = 'question-mark.png';
    updateScore();
    playerFigures.forEach(f => f.classList.remove('selected'));
});
