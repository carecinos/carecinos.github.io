var colors = [];
var pickedColor;
var gameSize = 6;
var clickedColor;

var body = document.querySelector("body");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var resultDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var buttons = document.querySelectorAll("button");

init();

function init(){

	//event listeners for each square
	setupSquares();
	//event listener for hovering over & off buttons
	setupButtons();
	//reset all squares
	reset();
	

}

function setupButtons(){
	for (var i = 0; i < buttons.length; i++){
		buttons[i].addEventListener("mouseover", function(){
				this.classList.add("hoverOn");
		});

		buttons[i].addEventListener("mouseout", function(){
				this.classList.remove("hoverOn");
		});
	}

	//event listener for easy button
	easyButton.addEventListener("click", function(){
		if(!easyButton.classList.contains("selected")){
			easyButton.classList.add("selected");
			hardButton.classList.remove("selected");
			gameSize = 3;
			reset();
		}
	});

	//event listener for hard button
	hardButton.addEventListener("click", function(){
		if(!hardButton.classList.contains("selected")){
			hardButton.classList.add("selected");
			easyButton.classList.remove("selected");
			gameSize = 6;
			reset();
		}
	});

	//event listener for reset button
	resetButton.addEventListener("click", function(){
		reset();
	});
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){

			clickedColor = this.style.backgroundColor;
			//compare the clicked color to the picked color
			compareColor(this);
		});
	}
}

function compareColor(squareColor){
	if(clickedColor === pickedColor){
				resultDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				resetButton.textContent = "Play Again?";
			}else{
				resultDisplay.textContent = "Try Again!";
				squareColor.style.background = "#232323";		
			}
}


//change the color of all squares & h1 to picked color
function changeColors(color){
	for (var i = 0; i < gameSize; i++){
		squares[i].style.background = color;
	}
	//change h1 color
	h1.style.backgroundColor = color;
}

//pick a random color from the array
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//generate array of random colors
function generateRandomColors(size){
	//make an array
	var colorsArr = [];
	//add size random colors to array
	for (var i = 0; i < size; i++){
		//get random color and push to array
		colorsArr[i] = randomColor();
	}
	//return array
	return colorsArr;
}

//generate random color
function randomColor(){
	//pick a red from 0-255
	var red = Math.floor(Math.random() * 256);
	//pick a green from 0-255
	var green = Math.floor(Math.random() * 256);
	//pick a blue from 0-255
	var blue = Math.floor(Math.random() * 256);

	//build string representing the random color
	var colorString = "rgb(" 
				+ red +", " 
				+ green + ", " 
				+ blue + ")";

	//rerturn string representing the random color
	return colorString;

}

function reset(){
	//generate all new colors
	colors = generateRandomColors(gameSize);
	//pick new color from array
	pickedColor = pickColor();
	//change color display
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for(var i = 0; i < gameSize; i++){
	squares[i].style.backgroundColor = colors[i];
	}

	//if on easy mode, hide the other squares
	if(squares.length > gameSize){
		for(var i = squares.length - gameSize; i < squares.length; i++){
			squares[i].style.backgroundColor = "#232323";
		}
	}
	//reset h1 background
	h1.style.backgroundColor = "steelblue";

	//reset button text
	resetButton.textContent = "New Colors";

	//reset message
	resultDisplay.textContent = "";
}