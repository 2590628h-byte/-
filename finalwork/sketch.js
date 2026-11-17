
// 最終課題を制作しよう

let x, y;
let vy;
const g = 1;
let playerSize = 1;

let size;
let groundY;
let obstacles = [];
let score = 0;

// 画像を読み込む
// 新しい画像を追加するときは、ここに1行追加する
let images = [];

function preload(){
  images = [
    loadImage("/bazu1.jpg"),
    loadImage("/bazu2.jpg")
  ];
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  image('bazu1.jpg')
  x = width / 2;
  y = height * 0.8 - height * 0.1 / 2;
  vy = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);

  size = height * 0.1 * playerSize;

  // 地面
  groundY = height * 0.8;
  fill(64, 192, 64);
  noStroke();
  rect(0, groundY, width, height - groundY);


  // 障害物がないとき画像をランダムに登場させる
  if (obstacles.length === 0) {
    obstacles.push({
      x: width,
      y: groundY - size * 2,
      img: random(images)
    });
  }

  // 画像を移動・表示する
  imageMode(CENTER);

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= 4;

    let w = size * 0.8;
    let h = w * obstacles[i].img.height / obstacles[i].img.width;

    image(obstacles[i].img, obstacles[i].x, obstacles[i].y, w, h);

    // キャラクターに当たったら1点追加
    if (
      dist(obstacles[i].x, obstacles[i].y, x, y - size * 0.05)
      < size * 0.55 + w * 0.3
    ) {
      score++;
      obstacles.splice(i, 1);
      continue;
    }

    // 画面の左端を超えたら削除
    if (obstacles[i].x + w / 2 < 0) {
      obstacles.splice(i, 1);
    }
  }

  // 点数表示
  fill(0);
  noStroke();
  textSize(30);
  textAlign(RIGHT);
  text("SCORE: " + score, width - 30, 50);

  // 重力
  vy += g;
  y += vy;

  // 地面に着いたら止まる
  if (y + size * 0.55 >= groundY) {
    y = groundY - size * 0.55;
    vy = 0;
  }

  // 天井にぶつかったら止まる
  if (y - size * 0.6 <= 0) {
    y = size * 0.6;
    vy = 0;
  }

  // キャラクターの体
  stroke(0);
  strokeWeight(size * 0.07);
  strokeCap(ROUND);
  noFill();

  line(x, y - size * 0.05, x, y + size * 0.25);
  line(x, y + size * 0.02, x - size * 0.3, y + size * 0.2);
  line(x, y + size * 0.02, x + size * 0.3, y + size * 0.2);
  line(x, y + size * 0.25, x - size * 0.2, y + size * 0.5);
  line(x, y + size * 0.25, x + size * 0.2, y + size * 0.5);

  // 頭
  fill(255);
  stroke(0);
  ellipse(x, y - size * 0.32, size * 0.55);

  // 目
  noStroke();
  fill(0);
  ellipse(x - size * 0.1, y - size * 0.34, size * 0.055, size * 0.09);
  ellipse(x + size * 0.1, y - size * 0.34, size * 0.055, size * 0.09);
}

// スペースキーでジャンプ
function keyPressed() {
  if (key === ' ' && y + size * 0.55 >= groundY) {
    vy = -15;
  }
}


