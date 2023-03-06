const cardArray = [
  { name: "fries", img: "./img/fries.png" },
  { name: "cheeseburger", img: "./img/cheeseburger.png" },
  { name: "hotdog", img: "./img/hotdog.png" },
  { name: "ice-cream", img: "./img/ice-cream.png" },
  { name: "milkshake", img: "./img/milkshake.png" },
  { name: "pizza", img: "./img/pizza.png" },
  { name: "fries", img: "./img/fries.png" },
  { name: "cheeseburger", img: "./img/cheeseburger.png" },
  { name: "hotdog", img: "./img/hotdog.png" },
  { name: "ice-cream", img: "./img/ice-cream.png" },
  { name: "milkshake", img: "./img/milkshake.png" },
  { name: "pizza", img: "./img/pizza.png" },
];

shuffle(cardArray);

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
let cardChosen = [];
let cardsChosenIds = [];
let cardWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("data-id", i);
    card.setAttribute("src", "img/blank.png");
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
}

function checkMatch() {
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];

  if (optionOneId === optionTwoId) {
    cards[optionOneId].setAttribute("src", "img/blank.png");
    cards[optionTwoId].setAttribute("src", "img/blank.png");
    alert("You have clicked the same image!");
  } else if (cardChosen[0] === cardChosen[1]) {
    alert("You found a match");
    cards[optionOneId].setAttribute("src", "img/white.png");
    cards[optionTwoId].setAttribute("src", "img/white.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardWon.push(cardChosen);
  } else {
    cards[optionOneId].setAttribute("src", "img/blank.png");
    cards[optionTwoId].setAttribute("src", "img/blank.png");
    alert("Sorry, try again");
  }

  resultDisplay.textContent = cardWon.length;
  cardChosen = [];
  cardsChosenIds = [];

  if (cardWon.length === cardArray.length / 2) {
    resultDisplay.innerHTML = "Congratulations, you found them all!";
  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  // getting the cardId
  cardChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// function to flip the card
function flipCard() {
  const cardId = this.getAttribute("data-id");
  // getting the cardId
  cardChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

// code for restarting the game
function restartGame() {
  // clear the board
  gridDisplay.innerHTML = "";
  // reset all arrays and variables
  cardChosen = [];
  cardsChosenIds = [];
  cardWon.length = 0;
  resultDisplay.textContent = 0;
  // shuffle the card array
  shuffle(cardArray);
  // create the board with shuffled cards
  createBoard();
}

// add event listener to restart button
const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", restartGame);
