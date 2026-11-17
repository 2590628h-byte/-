// 小手調べ
function setup(){
  createCanvas(1000, 1000);
  for(let i = 0; i < 20; i++){
    let size=(i+1)*10;
    noFill();
    if(i<5){
      stroke(0,0,225);
    }else if(i<7){
      stroke(255,0,0);
    }else{
      stroke(0,255,0)
    } 
    ellipse(50,50,size,size);
    // BLANK[1] 条件分岐を使って、前半は赤、後半は青で円を描こう
  }
}
