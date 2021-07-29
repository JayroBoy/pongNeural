

//Definições do pong
    const velocidadeRaquete = 20
    var posicaoRaquete = 300

    var bola = [350, 350, 30]//X, Y, Diâmetro
    var velocidadeBolaX = 20
    var velocidadeBolaY = Math.floor(Math.random() * 10) - 5

    var score = 0

    var medDec = 0
    var countDec = 0

    const maxDistHorizontal = 829
    const maxDistVertical = 820
//Funções do Pong
    /** Restaura os valores iniciais do pong */
    function reset(){
        posicaoRaquete = 300

        bola[0] = bola[1] = 350
        velocidadeBolaX = 15
        velocidadeBolaY = ((Math.floor(Math.random() * 20) - 10))

        score = 0

        medDec = 0
        countDec = 0
    }

    //Para a bola no meio
    function stop(){
        velocidadeBolaX = 0
        bola = [350, 350, 0]
    }

    function colisaoTopo(){
        if(bola[1] - (bola[2]/2) < 25){
            velocidadeBolaY = -velocidadeBolaY
            return true
        }
        return false 
    }

    function colisaoFundo(){
        if(bola[1] + (bola[2]/2) > 724){
            velocidadeBolaY = -velocidadeBolaY
            return true
        } 
        return false
    }

    function colisaoDireita(){
        if(bola[0] + (bola[2]/2) > 875){
            velocidadeBolaX = -velocidadeBolaX
            velocidadeBolaY = (Math.floor(Math.random() * 10) - 5)
            if(velocidadeBolaY > 0){
                velocidadeBolaY += 5
            }else if(velocidadeBolaY < 0){
                velocidadeBolaY -= 5
            } 
            return true 
        }
        return false
    }
    
    function colisaoRaquete(){
        if(bola[0] - (bola[2]/2) < 20){
            if(bola[1]  > posicaoRaquete && bola[1] < posicaoRaquete + 120){
            velocidadeBolaX = -velocidadeBolaX
            velocidadeBolaY = (Math.floor(Math.random() * 10) - 5) 
            if(velocidadeBolaY > 0){
                velocidadeBolaY += 5
            }else if(velocidadeBolaY < 0) {
                velocidadeBolaY -= 5
            }  
            score++
        }else{
            stop()
            }
        }
    }
  

//Função setup que começa tudo
    function setup() {
        createCanvas(900, 750);
    }

    function draw() {

        player = [.5, .5]

        //------------------------Desenhando-----------------------------------

        background("#77aaff");

        fill("#FFFFFF");

        //Pontuação
        textSize(100);
        text(score, 420, 200);


        //Bordas
        rect(25, 2, 850, 20) //Borda Superior
        rect(878, 25, 20, 700) //Borda Direita
        rect(25, 727, 850, 20) //Borda inferior

        //Raquete
        fill("yellow")
        rect(2, posicaoRaquete, 17, 120)

        //Bola
        fill("purple")
        ellipse(bola[0], bola[1], bola[2], bola[2])


        //-------------------------Movendo---------------------------------
        
        posicaoRaquete = bola[1] - 60

        if(posicaoRaquete < 2){
            posicaoRaquete = 0
        }else if(posicaoRaquete > height - 122){
            posicaoRaquete = height - 122
        }
        
        //Bola
        bola[0] += velocidadeBolaX //Eixo X
        bola[1] += velocidadeBolaY //Eixo Y


        //-----------------------Colisões----------------------------------

        if (colisaoTopo()){}

        else if (colisaoFundo()){}

        else if (colisaoDireita()){}

        else if(colisaoRaquete()){}  
    }

