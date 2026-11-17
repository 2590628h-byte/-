let x, y;
let vx, vy;
const g = 1;
let playerSize = 1;
let bigStartTime = 0;

let size;
let groundY;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height * 0.8 - height * 0.1 / 2;
  vx = 0;
  vy = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);

  size = height * 0.1 * playerSize;

  // 地面を描く
  groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // キャラクターの左右移動
  if (keyIsDown(LEFT_ARROW)) {
    vx -= 0.5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    vx += 0.5;
  }

  // 重力
  vy += g;

  // 速くなりすぎないように制限
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  // 位置を更新
  x += vx;
  y += vy;

  // 地面に着いたら止まる
  if (y + size / 2 >= groundY) {
    y = groundY - size / 2;
    vy = 0;
  }

  // 天井にぶつかったら止まる
  if (y - size / 2 <= 0) {
    y = size / 2;
    vy = 0;
  }

  // キノコの位置
  const mushroomX = width * 0.4;
  const mushroomY = height * 0.8;

  // キノコの軸
  fill(255);
  rect(mushroomX - 10, mushroomY - 30, 20, 30);

  // キノコの傘
  fill(220, 0, 0);
  arc(mushroomX, mushroomY - 30, 60, 50, PI, TWO_PI);

  // キノコの模様
  fill(255);
  ellipse(mushroomX - 15, mushroomY - 40, 10, 10);
  ellipse(mushroomX + 10, mushroomY - 45, 10, 10);

  // キノコに当たったら大きくなる
if (
  x + size / 2 > mushroomX - 30 &&
  x - size / 2 < mushroomX + 30 &&
  y + size / 2 > mushroomY - 55 &&
  y - size / 2 < mushroomY
) {
  if (playerSize === 1) {
    playerSize = 1.5;
    bigStartTime = millis();
  }
} 

 // 5秒経ったら元の大きさに戻る
if (playerSize === 1.5 && millis() - bigStartTime >= 5000) {
  playerSize = 1;
}

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);

  // 画面の左右端で跳ね返る
if (x - size / 2 < 0 || x + size / 2 > width) {
  vx = -vx;
  x = constrain(x, size / 2, width - size / 2);
}
}

// スペースキーを押したときにジャンプ
function keyPressed() {
  if (key === ' ' && y + size / 2 >= groundY) {
    vy = -15;
  }
}  