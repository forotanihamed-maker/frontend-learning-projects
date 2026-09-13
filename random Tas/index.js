var randomNumber1 = Math.random() * 6;
var randomNumber2 = Math.random() * 6;
randomNumber1 = Math.round(randomNumber1);
if (randomNumber1 === 0) {
  randomNumber1 = 1;
}
randomNumber2 = Math.round(randomNumber2);
if (randomNumber2 === 0) {
  randomNumber2 = 1;
}
switch (randomNumber1) {
  case 1:
    document.querySelector(".img1").setAttribute("src", "./images/dice1.png");
    break;
  case 2:
    document.querySelector(".img1").setAttribute("src", "./images/dice2.png");
    break;
  case 3:
    document.querySelector(".img1").setAttribute("src", "./images/dice3.png");
    break;
  case 4:
    document.querySelector(".img1").setAttribute("src", "./images/dice4.png");
    break;
  case 5:
    document.querySelector(".img1").setAttribute("src", "./images/dice5.png");
    break;
  case 6:
    document.querySelector(".img1").setAttribute("src", "./images/dice6.png");
    break;
}
switch (randomNumber2) {
  case 1:
    document.querySelector(".img2").setAttribute("src", "./images/dice1.png");
    break;
  case 2:
    document.querySelector(".img2").setAttribute("src", "./images/dice2.png");
    break;
  case 3:
    document.querySelector(".img2").setAttribute("src", "./images/dice3.png");
    break;
  case 4:
    document.querySelector(".img2").setAttribute("src", "./images/dice4.png");
    break;
  case 5:
    document.querySelector(".img2").setAttribute("src", "./images/dice5.png");
    break;
  case 6:
    document.querySelector(".img2").setAttribute("src", "./images/dice6.png");
    break;
}
var resultText = document.querySelector("h1");
if (randomNumber1 === randomNumber2) {
  resultText.innerHTML = "Draw";
} else {
  if (randomNumber1 > randomNumber2) {
    resultText.innerHTML = "Playe1 win";
  } else {
    resultText.innerHTML = "Playe2 win";
  }
}
