'use strict';

// 상수들
const maxTime = 30; // 초단위
const maxCarrots = 40;
const maxBugs = 20;

// gournd 클릭
const ground = document.querySelector('.ground');
const popup = document.querySelector('.popup');
const popupMessage = document.querySelector('.popup__message');

const bugSound = new Audio('sound/bug_pull.mp3');
const carrotSound = new Audio('sound/carrot_pull.mp3');
const backgroundSound = new Audio('sound/bg.mp3');
const alertSound = new Audio('sound/alert.wav');
const winSound = new Audio('sound/game_win.mp3');

backgroundSound.autoplay = true;

ground.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName !== 'IMG') return;

  if (target.classList.contains('bug')) {
    bugSound.play();
    stopGame('YOU LOST😂😂');
    return;
  } else if (target.classList.contains('carrot')) {
    carrotSound.play();
    target.style.display = 'none';
    count.innerText = count.innerText - 1;
    if (count.innerText == 0) {
      winSound.play();
      stopGame('YOU WON 🎉🎉');
    }
  }
});

function showPopup(text) {
  popupMessage.innerText = text;
  popup.classList.remove('invisible');
}

function hidePopup() {
  popup.classList.add('invisible');
}

class CarrotSet {
  constructor(src, count) {
    this.count = count;
    this.carrots = new Array(count);
    for (let i = 0; i < count; i++) {
      let carrot = new Image();
      carrot.style.display = 'none';
      carrot.src = src;
      carrot.classList.add('carrot');
      ground.appendChild(carrot);
      this.carrots[i] = carrot;
    }
  }

  setCarrots() {
    let carrot;
    for (let i = 0; i < this.count; i++) {
      carrot = this.carrots[i];
      carrot.style.display = 'inline';
      carrot.style.transform = `translate(${getRandomGroundWidth()}px, ${getRandomGroundHeight()}px)`;
    }
  }
}

class BugSet {
  constructor(src, count) {
    this.count = count;
    this.bugs = new Array(count);
    for (let i = 0; i < count; i++) {
      let bug = new Image();
      bug.style.display = 'none';
      bug.src = src;
      bug.classList.add('bug');
      ground.appendChild(bug);
      this.bugs[i] = bug;
    }
  }

  setBugs() {
    let bug;
    for (let i = 0; i < this.count; i++) {
      bug = this.bugs[i];
      bug.style.display = 'inline';
      bug.style.transform = `translate(${getRandomGroundWidth()}px, ${getRandomGroundHeight()}px)`;
    }
  }
}

const carrots = new CarrotSet('img/carrot.png', maxCarrots);
const bugs = new BugSet('img/bug.png', maxBugs);

function getRandomGroundWidth() {
  return Math.random() * ground.clientWidth;
}

function getRandomGroundHeight() {
  return Math.random() * ground.clientHeight;
}

const button = document.querySelector('.btn');
const count = document.querySelector('.count');
const startImg = document.querySelector('.start');
const stopImg = document.querySelector('.stop');
let invisible = document.querySelector('.invisible');

button.addEventListener('click', (event) => {
  if (invisible.classList.contains('start')) {
    stopGame('Replay❓❓');
  } else if (invisible.classList.contains('stop')) {
    startGame();
  }
});

const timerText = document.querySelector('.timer');
let remainTime = maxTime;
let timer;

function startTimer() {
  timer = setInterval(() => {
    remainTime -= 1;
    timerText.innerText = `00:${remainTime}`;

    if (remainTime <= 7) alertSound.play();

    if (remainTime === 0) {
      stopGame('Time Over 🕐');
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function startGame() {
  backgroundSound.load();
  remainTime = maxTime;
  timerText.innerText = `00:${remainTime}`;
  invisible.classList.remove('invisible');
  startImg.classList.add('invisible');
  invisible = startImg;
  hidePopup();
  carrots.setCarrots();
  bugs.setBugs();
  count.innerText = carrots.count;
  startTimer();
}

function stopGame(text) {
  stopTimer();
  invisible.classList.remove('invisible');
  stopImg.classList.add('invisible');
  invisible = stopImg;
  showPopup(text);
}

const restartBtn = document.querySelector('.popup__btn');
restartBtn.addEventListener('click', () => {
  startGame();
});
