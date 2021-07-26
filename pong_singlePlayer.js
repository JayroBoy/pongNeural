var raquete = [340, 15] // Posição em Y, Velocidade 
var bola = [350, 350, 30, 4, 4]//Posição em X, Posição em Y, Diâmetro, Velocidade em X, Velocidade em Y
var points = [0, 420]
var tSize = 100
var vidas = 3

function reset(death){
  if (death){
    vidas = 3
    points = [0, 420]
    tSize = 100
    bola = [350, 350, 30, 4, 4]
    raquete = [340, 15] 
  }else{
    vidas--
    bola[0] = 350
  }
}

function checkGameOver(){
  if(vidas === 0){
    bola[3] = 0
    bola[4] = 0
    points[0] = "Game over. Press R to retry"
    points[1] = 350
    tSize = 20
    if(keyIsDown(82)){
      reset(true)
    }
  }else{
    reset(false)
  }
}

function setup() {
  createCanvas(900, 750);
}

function draw() {
  
  //------------------------Desenhando-----------------------------------
  
  background("#77aaff");

  fill("#FFFFFF");
  
  //Pontuação
  textSize(tSize);
  text(points[0],points[1] , 200);
  
  //Bordas
  rect(25, 2, 850, 20) //Borda Superior
  rect(878, 25, 20, 700) //Borda Direita
  rect(25, 727, 850, 20) //Borda inferior
  
  //Raquete
  fill("yellow")
  rect(2, raquete[0], 17, 120)
  
  //Bola
  fill("purple")
  circle(bola[0], bola[1], bola[2])
  
  
  //vidas
  for(i = 0; i < vidas; i++){
    circle(390 + (i*40), 50, 30)
  }
  
  
  //-------------------------Movendo---------------------------------
  
  //Raquete - Ir para cima
  if(keyIsDown(UP_ARROW) && raquete[0] > 25){
    raquete[0] -= raquete[1]
  }
  
  //Raquete - Ir para baixo
  if(keyIsDown(DOWN_ARROW) && raquete[0] + 120 <= 725){
    raquete[0] +=  raquete[1]
    if(raquete[0] + 120 > 725){
      raquete[0] = 605
    }
  }
  
  //Bola
  bola[0] += bola[3] //Eixo X
  bola[1] += bola[4] //Eixo Y
  
  
  //-----------------------Colisões----------------------------------
  
  //Bola com o topo
  if(bola[1] - (bola[2]/2) < 23){
    bola[4] = -bola[4]
  } 
  
  //Bola com o fundo
  if(bola[1] + (bola[2]/2) > 725){
    bola[4] = -bola[4]
  } 
  
  //Bola com a borda direita
  if(bola[0] + (bola[2]/2) > 877){
    bola[3] = -bola[3]
  }
  
  //bola com a raquete
  if(bola[0] - (bola[2]/2) < 20){
    if(bola[1]  > raquete[0] && bola[1] < raquete[0] + 120){
      bola[3] = -bola[3]
      points[0]++
    }else{
      checkGameOver()
    }
  }
  
}