const gameContainer = document.getElementById("game");
let count = 0;
let selected = [];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
//  count variable makes sure we cant click more than 2 cards at a time
// the two selected cards are stored into an array
function handleCardClick(event) {
  console.log(event.target);
  // if same card is clicked twice nothing should happen
  if (count == 1 && selected[0] === event.target) {
    return;
  }
  // counter increments when a card is clicked
  count++;

  //  if a third card is clicked, return
  if (count > 2) return;

  event.target.style.backgroundColor = event.target.className;
  selected.push(event.target);

  console.log(count, selected[count - 1].className);
  if (count == 2) {
    if (selected[0].className === selected[1].className) {
      console.log("match");
      selected[0].removeEventListener("click", handleCardClick);
      selected[1].removeEventListener("click", handleCardClick);
      selected.length = 0;
      count = 0;
    } else {
      setTimeout(function () {
        event.target.style.backgroundColor = "transparent";
        selected[0].style.backgroundColor = "transparent";
        selected.length = 0;
        count = 0;
      }, 1000);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
