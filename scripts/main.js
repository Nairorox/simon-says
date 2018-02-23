const startButton = document.querySelector("#start");
const currentRoundEl = document.querySelector("#round");
const everyQuarter = document.querySelectorAll(".quarter");
let gameSequence = [];
let userSequence = [];
let round = 1;
let yourTurn = false;
let lost = false;
let started = false;
let userTour = 0;
let currentRound = 1;
let playSequenceInterval;
function randomSide(){
	yourTurn = false;
	if(!lost){
		gameSequence.push(Math.floor(Math.random()*4+1));
		playSequence();
	}
	userTour = 0;
}

function pickColor(){
	if(started && !lost && yourTurn){
		userSequence.push(this.getAttribute("data-index"));
		if(gameSequence[userTour] != userSequence[userTour]){
			return gameOver();
		}
		userTour++;
		if(userTour == gameSequence.length){
			userSequence = [];
			randomSide();
			currentRound++;
			currentRoundEl.innerHTML = currentRound;
		}
	}
}

function startGame(){
	if(!started || lost ){
		currentRoundEl.innerHTML = 1;
		started = true;
		lost = false;
		randomSide();
	}
	else{
		gameOver();
	}
	
}

function gameOver(){
	lost = true;
	gameSequence = [];
	userSequence = [];
	currentRound = 0;
	currentRoundEl.innerHTML = 0;
	let gameOverSound = new Audio("sounds/wrong.mp3");
	gameOverSound.volume = 0.2;
	gameOverSound.play();
	clearInterval(playSequenceInterval);
}

function playSequence(){
	let counter = 0;
	playSequenceInterval = setInterval(function(){
		for(let i = 1; i <= everyQuarter.length; i++){
			if(everyQuarter[i-1].getAttribute("data-index") == gameSequence[counter]){
				let quarterColor = window.getComputedStyle(everyQuarter[i-1]).getPropertyValue("background-color")
				new Audio(everyQuarter[i-1].getAttribute("audiosrc")).play();
				everyQuarter[i-1].style.backgroundColor = everyQuarter[i-1].getAttribute("data-color");
				setTimeout(function(){
					everyQuarter[i-1].style.backgroundColor = quarterColor; 
					if(counter == gameSequence.length){
						clearInterval(playSequenceInterval); 
						yourTurn = true;
					}
				}, 900);
			}
		}
		counter++; 
	}, 1000);
}

startButton.addEventListener("click", startGame);

everyQuarter.forEach(quarter =>{
	quarter.addEventListener("click", pickColor);
});
