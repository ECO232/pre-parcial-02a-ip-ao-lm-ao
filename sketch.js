let randomPoints1 = [];
let randomPoints2 = [];
let numFlashPoints = 5;
let numNormalPoints = 10;
let spacing;
let timer = 30;
let score = 0;
let timerInterval;
let isTimeUp = false;
let imgFlash;
let imgNormal;
let aim;

function updateTimerDisplay() {
  const timerDisplay = document.getElementById("timerDisplay");
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  timerDisplay.innerText = `Timer: ${minutes}:${seconds < 10 ? '0' : ''}${seconds} seconds - Score: ${score}`;
}

function preload() {
  imgFlash = loadImage('ducks/patoFlash.png');
  imgNormal = loadImage('ducks/patoNormal.png');
  aim = loadImage('ducks/aim.png');
}

function setup() {
  createCanvas(700, 600);
  spacing = width / (numNormalPoints + 1);

  for (let i = 0; i < numFlashPoints; i++) {
    randomPoints1.push({
      position: createVector(random(0, width), random(0, height)),
      img: imgFlash,
      isFlash: true
    });
  }

  for (let i = 0; i < numNormalPoints; i++) {
    randomPoints2.push({
      position: createVector(random(0, width), random(0, height)),
      img: imgNormal,
      isFlash: false
    });
  }

  timerInterval = setInterval(decrementTimer, 1000);
}

function draw() {
  background(220);

  if (isTimeUp) {
    noLoop();
    clearInterval(timerInterval);
    textSize(32);
    fill(0);
    text("¡Time's up!" , width / 2.8, height / 2.2);
    text("Final Score: "+ score,  width / 3, height / 1.8)
    return;
  }

  updateTimerDisplay();

  for (let i = 0; i < numFlashPoints; i++) {
    randomPoints1[i].position.x += 13;
    if (randomPoints1[i].position.x > width) {
      randomPoints1[i].position.x = -60; // Mueve el objeto fuera de la pantalla
      randomPoints1[i].position.y = random(0, height); // Ubicación aleatoria en el eje Y
    }
  }

  for (let i = 0; i < numNormalPoints; i++) {
    randomPoints2[i].position.x += 6;
    if (randomPoints2[i].position.x > width) {
      randomPoints2[i].position.x = -60; // Mueve el objeto fuera de la pantalla
      randomPoints2[i].position.y = random(0, height); // Ubicación aleatoria en el eje Y
    }
  }

  for (let i = 0; i < numFlashPoints; i++) {
    image(imgFlash, randomPoints1[i].position.x, randomPoints1[i].position.y, 60, 60);
    if (mouseIsPressed) {
      const d = dist(mouseX, mouseY, randomPoints1[i].position.x + 30, randomPoints1[i].position.y + 30);
      if (d < 30) {
        score += 1;
        randomPoints1[i].position.x = -60;
        randomPoints1[i].position.y = random(0, height);
      }
    }
  }

  for (let i = 0; i < numNormalPoints; i++) {
    image(imgNormal, randomPoints2[i].position.x, randomPoints2[i].position.y, 60, 60);
    if (mouseIsPressed) {
      const d = dist(mouseX, mouseY, randomPoints2[i].position.x + 30, randomPoints2[i].position.y + 30);
      if (d < 30) {
        score += 1;
        randomPoints2[i].position.x = -60;
        randomPoints2[i].position.y = random(0, height);
      }
    }
  }

  image(aim, mouseX - 15, mouseY - 15, 30, 30);
}

function decrementTimer() {
  timer--;
  if (timer <= 0) {
    isTimeUp = true;
  }
}
