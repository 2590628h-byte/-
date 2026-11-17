
let x, y;
let vy;
const g = 1;
let playerSize = 1;

let size;
let groundY;
let obstacles = [];
let score = 0;

// 画像を保存する配列
let images = [];

// まだ登場していない画像を保存する配列
let remainingImages = [];

// ゲーム終了を判定する変数
let gameOver = false;

// 画像を読み込む
async function setup() {
  createCanvas(windowWidth, windowHeight);

  images = [
    await loadImage("./bazu1.jpg"),
    await loadImage("./bazu2.jpg"),
    await loadImage("./bazu3.jpg"),
    await loadImage("./bazu4.jpg"),
    await loadImage("./bazu5.jpg"),
    await loadImage("./bazu6.jpg"),
    await loadImage("./bazu7.avif"),
    await loadImage("./bazu8.jpg"),
    await loadImage("./bazu9.jpg"),
    await loadImage("./bazu10.webp")
  ];

  // 画像をコピーする
  remainingImages = [...images];

  // キャラクターの初期位置
  x = width / 2;
  y = height * 0.8 - height * 0.1 / 2;
  vy = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(160, 192, 255);

  size = height * 0.1 * playerSize;

  // 地面
  groundY = height * 0.8;
  fill(64, 192, 64);
  noStroke();
  rect(0, groundY, width, height - groundY);

  // ゲーム中の処理
  if (!gameOver) {

    // 障害物がないとき、残りの画像からランダムに1枚登場させる
    if (remainingImages.length > 0 && obstacles.length === 0) {

      let randomIndex = floor(random(remainingImages.length));

      obstacles.push({
        x: width,
        y: groundY - size * 3.5 ,
        img: remainingImages[randomIndex]
      });

      // 登場した画像を残りの配列から削除する
      remainingImages.splice(randomIndex, 1);
    }

    // 画像を移動・表示する
    imageMode(CENTER);

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].x -= 4;

      let w = size * 3.5;
      let h = w * obstacles[i].img.height / obstacles[i].img.width;

      image(
        obstacles[i].img,
        obstacles[i].x,
        obstacles[i].y,
        w,
        h
      );

      // キャラクターに当たったら1点追加
      if (
        dist(
          obstacles[i].x,
          obstacles[i].y,
          x,
          y - size * 0.05
        ) < size * 0.55 + w * 0.3
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

    // ゲーム中のスコア表示（右上）
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


    // キャラクターを描く
    drawPlayer();

    // すべての画像が登場し、画面から消えたらゲーム終了
    if (remainingImages.length === 0 && obstacles.length === 0) {
      gameOver = true;
    }

  } else {

    // 成功率を計算する
    let percentage = score / images.length * 100;

    // 成功率だけを表示する
    fill(0);
    noStroke();
    textAlign(CENTER);

    textSize(30);
    text("2026年のあなたのミーハー度は" , width / 2, height / 2 -30);

    textSize(70);
    text(percentage + "%",width/2, height / 2 +60 )
  }
}

// キャラクターを描く関数
function drawPlayer() {
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
  if (!gameOver && key === ' ' && y + size * 0.55 >= groundY) {
    vy = -15;
  }
}

 