//Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Score
var GameScore = 0;
var Level = 0;

//Background
var background = false;
var backgroundImages = new Image();
backgroundImages.onload = function () {
background = true;
};
backgroundImages.src = "./images/espacio2.jpg";

//Elon
var elonDraw = false;
var elonImages = new Image();
elonImages.onload = function () {
  elonDraw = true;
};
elonImages.src = "./images/elon musk.png";

// //Tesla
// var teslaDraw = false;
// var teslaImages = new Image();
// teslaImages.onload = function () {
//   teslaDraw = true;
// };
// teslaImages.src = "./images/tesla logo.jpg";

//constroles elon
var elon = {
  speed: 400,
  x: 240,
  y: 380,
  width: 60,
  height: 120,
};
var tesla = {};
var spacex = {};
// var bitcoin = {};
var teslaCaught = 0;

//keyboard controls
var keysDown = {};

//keys pressed
window.addEventListener(
  "keydown",
  function (e) {
    keysDown[e.key] = e.key;
  },
  false
);
window.addEventListener(
  "keyup",
  function (e) {
    delete keysDown[e.key];
  },
  false
);

//Elon's location
var reset = function () {
  tesla.x = 32 + Math.random() * (canvas.width - 70);
  tesla.y = 32 + Math.random() * (canvas.width - 70);
};

//controles
var update = function (modifier) {
  if (keysDown["ArrowUp"]) {
    elon.y -= elon.speed * modifier;
    if (elon.y < 0) {
      elon.y = 0;
    }
  }
  if (keysDown["ArrowDown"]) {
    elon.y += elon.speed * modifier;
    if (elon.y > 380) {
      elon.y = 380;
    }
  }
  if (keysDown["ArrowLeft"]) {
    elon.x -= elon.speed * modifier;
    if (elon.x <= 0) {
      elon.x = 0;
    }
  }
  if (keysDown["ArrowRight"]) {
    elon.x += elon.speed * modifier;
    if (elon.x >= 600) {
      elon.x = canvas.width - elon.x;
    }
  }
};

//elon and tesla logo
if (
  elon.x <= tesla.x + 32 &&
  tesla.x <= elon.x + 50 &&
  elon.y <= tesla.y + 50 &&
  tesla.y <= elon.y + 120
);

//Make spacex
var spacex = new Image();
spacex.src = "./images/spacex.png";

function Space (x, y, images, isLoaded, width, height) {
  this.x = x;
  this.y = y;
  this.images = images;
  this.isLoaded = false;
  this.width = width;
  this.height = height;
  this.angle = 0;
}

Space.prototype.draw = function () {
  ctx.save();
  ctx.drawImage(this.images, this.x, this.y, this.width, this.height);
  ctx.restore();
};

//Tesla 
var tesla = new Image();
tesla.src = "./images/teslacar.png";

function Tesla(x, y, images, isLoaded, width, height) {
  this.x = x;
  this.y = y;
  this.images = images;
  this.isLoaded = false;
  this.width = 50;
  this.height = 50;
  this.angle = 0;
}

Tesla.prototype.draw = function () {
  ctx.save();
  ctx.drawImage(this.images, this.x, this.y, this.width, this.height);
  ctx.restore();
};


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// //Bitcoin
// var tesla = new Image();
// bitcoin.src = "./images/Bitcoin.png";

// function Bitcoin(x, y, images, isLoaded, width, height) {
//   this.x = x;
//   this.y = y;
//   this.images = images;
//   this.isLoaded = false;
//   this.width = 50;
//   this.height = 50;
//   this.angle = 0;
// }

// Bitcoin.prototype.draw = function () {
//   ctx.save();
//   ctx.drawImage(this.images, this.x, this.y, this.width, this.height);
//   ctx.restore();
// };


// function getRandom(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

var mySpace = [
  new Space(
    getRandom( 50, canvas.width - 50),
    Math.random() * canvas.height - 410,
    spacex,
    false,
    40,
    40

  ),
  new Tesla(
    getRandom( 50, canvas.width - 50),
    Math.random() * canvas.height - 410,
    tesla,
    false,
    40,
    40
  ),
  // new Bitcoin(
  //   getRandom( 50, canvas.width - 50),
  //   Math.random() * canvas.height - 410,
  //   bitcoin,
    // false,
  //   40,
  //   40
  // ),
  
  // new Space(
  //   getRandom(0, 800),
  //   Math.random() * canvas.height - 410,
  //   spacex,
  //   false,
  //   40,
  //   40
  // ),
  // new Space(
  //   getRandom(0, 800),
  //   Math.random() * canvas.height - 410,
  //   spacex,
  //   false,
  //   40,
  //   40
  // ),
  // new Space(
  //   getRandom(0, 800),
  //   Math.random() * canvas.height - 410,
  //   spacex,
  //   false,
  //   40,
  //   40
  // ),
];

// function makeSpace() {
//   console.log("MAKING SPACE X");
//   mySpace.push(
//     new Space(
//       getRandom(0, 800),
//       Math.random() * canvas.height - 410,
//       spacex,
//       false,
//       40,
//       40
//     )
//   );
// }

// spacex falling
function drawSpace() {
  mySpace.forEach(function (oneSpace) {
    oneSpace.y += 1;
    console.log (oneSpace.y)
    oneSpace.draw();
    if (isTouching(elon, oneSpace)){ 
      oneSpace.y = 0
      oneSpace.x =  getRandom( 50, canvas.width - 50)
   
  } 
if (oneSpace.y === canvas.height){
  oneSpace.y = 0 
  oneSpace.x =  getRandom( 50, canvas.width - 50)
  }
  }
  )}

  const isTouching = (spriteOne, spriteTwo) => {
    const spriteOneLeftBound = spriteOne.x;
    const spriteOneRightBound = spriteOne.x + spriteOne.width;
    const spriteOneLowBound = spriteOne.y;
    const spriteOneHighBound = spriteOne.y + spriteOne.height;
  
    const spriteTwoLeftBound = spriteTwo.x;
    const spriteTwoRightBound = spriteTwo.x + spriteTwo.width;
    const spriteTwoLowBound = spriteTwo.y;
    const spriteTwoHighBound = spriteTwo.y + spriteTwo.height;
  
    if (
      spriteOneLeftBound < spriteTwoRightBound &&
      spriteOneRightBound > spriteTwoLeftBound &&
      // REMEMBER Y IS FLIPPED IN CANVAS
      spriteOneLowBound < spriteTwoHighBound &&
      spriteOneHighBound > spriteTwoLowBound
    ) {
      return true;
    }
    return false;
  };

//Draw canvas
var draw = function () {
  if (background) {
    ctx.drawImage(backgroundImages, 0, 0);
  }
  if (elonDraw) {
    ctx.drawImage(elonImages, elon.x, elon.y, elon.width, elon.height);
  }
  // if (teslaDraw) {
  //   ctx.drawImage(teslaImages, tesla.x, tesla.y, 50, 50);
  // }
};

//Game over
// if (finished == true) {
//   ctx.fillText("Time's Up", 250, 250);
//   ctx.fillText("Click title to keep playing", 150, 200);
// }
// if (lose === true) {
//   ctx.fillText("You're Done", 180, 150);
// }

//Game to finished
// lose = true;
// teslaDraw = false;
// elonDraw = false;
// stopDraw();

// function stopDraw() {
//   setTimeout(main, 20000);
// }

// var count = 30;
// var finished = false;
// var counter = function () {
//   count = count - 1;
//   if (count <= 0) {
//     clearInterval(counter);
//     finished = true;
//     count = 0;
//     teslaDraw = false;
//     elonDraw = false;
//   }
// };

var delay = 2000;
setTimeout(function () {
  delay = 2000;
}, 2000);

function timeout() {
  setTimeout(function () {
    timeout();
    // makeSpace();
  }, delay);
}
timeout();

//timer interval seconds
// setInterval(counter, 1000);
//game loop
var main = function () {
  update(0.03);
  draw();
  drawSpace();
  requestAnimationFrame(main);
};

reset();
main();
  