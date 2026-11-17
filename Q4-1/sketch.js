// 配列の平均・最大・最小を求め、棒グラフを描く
function setup(){
  createCanvas(400, 400);
  background(240);

  // 配列をランダムに初期化する
  const scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(60, 100);
  }
  console.log(scores);

  // 合計を計算する
  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);

  // 平均・最大・最小を求める
  let average, largest, smallest;

  // 平均値
  average = sum / scores.length;

  // 最大値
  largest = 0;
  for(let i = 0; i < scores.length; i++){
    if(largest < scores[i]){
      largest = scores[i];
    }
  }

  // 最小値
  smallest = 100;
  for(let i = 0; i < scores.length; i++){
    if(smallest > scores[i]){
      smallest = scores[i];
    }
  }

  console.log("平均値：" + average);
  console.log("最大値：" + largest);
  console.log("最小値：" + smallest);

  // 背景に横線を10本引く
  const n = 10;
  for(let i = 0; i < n; i++){
    line(0, height * i / n, width, height * i / n);
  }

  noStroke();

  // 棒グラフを描く
  for(let i = 0; i < scores.length; i++){
    const dx = width / scores.length;
    const h = height * scores[i] / 100;

    // 最大値・最小値の色を変える
    if(scores[i] == largest){
      fill(255, 0, 0);
    }
    else if(scores[i] == smallest){
      fill(0, 0, 255);
    }
    else{
      fill(0);
    }

    rect(i * dx + 2, height - h, dx - 4, h);
  }

  // 平均点の線を引く
  stroke(0, 255, 0);
  line(0, height - height * average / 100,
       width, height - height * average / 100);
}