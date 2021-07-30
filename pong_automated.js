

//Definições do pong
    const velocidadeRaquete = 10
    var posicaoRaquete = 300//Posição em Y

    var bola = [350, 350, 30]//X, Y, Diâmetro
    var velocidadeBolaX = 10
    var velocidadeBolaY = 0

    var score = 0

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

    //Some com a bola da tela
    function stop(){
        velocidadeBolaX = 0
        bola = [350, 350, 0]
    }

    function colisaoTopo(){
        if(bola[1] - (bola[2]/2) <= 25){ //Se Y centro da bola menos raio for menor ou igual do que Y da borda inferior do topo
            velocidadeBolaY = -velocidadeBolaY
            return true
        }
        return false 
    }
    
    function colisaoFundo(){
        if(bola[1] + (bola[2]/2) >= 725){ //Se Y do centro da bola mais raio for maior ou igual do que Y da borda superior do fundo
            velocidadeBolaY = -velocidadeBolaY
            return true
        } 
        return false
    }
    
    function colisaoDireita(){
        if(bola[0] + (bola[2]/2) >= 880){ //Se X do centro da bola mais raio for maior ou igual do que X da borda esquerda da parede
            velocidadeBolaX = -velocidadeBolaX //Rebate a bola
            velocidadeBolaY = (Math.floor(Math.random() * 10) - 5) //Angulo aleatório
            return true 
        }
        return false
    }
    
    function colisaoRaquete(){
        if(bola[0] - (bola[2]/2) <= 20){//Se X do centro da bola for menor ou igual do que X da borda direita da raquete
            if(bola[1]  > posicaoRaquete && bola[1] < posicaoRaquete + 120){//Se Y do centro da bola estiver entre Y do topo e Y do fundo da raquete
            velocidadeBolaX = -velocidadeBolaX //Rebate a bola
            velocidadeBolaY = (Math.floor(Math.random() * 10) - 5) //Ângulo aleatório 
            score++//Conta mais um ponto
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
        //Segue a bola no eixo Y
        posicaoRaquete = bola[1] - 60

        //Pra raquete não sair da tela
        if(posicaoRaquete < 2){
            posicaoRaquete = 2
        }else if(posicaoRaquete > height - 122){
            posicaoRaquete = height - 122
        }
        
        //Bola
        bola[0] += velocidadeBolaX //Eixo X
        bola[1] += velocidadeBolaY //Eixo Y


        //-----------------------Colisões----------------------------------


        //Ifs não sao necessários mas nao tem como colidir com topo e fundo/raquete e parede ao mesmo tempo, entao é mais eficiente 
        //só fazer uma verificação se a outra for falsa
        if (colisaoTopo()){}

        else if (colisaoFundo()){}

        if (colisaoDireita()){}

        else if(colisaoRaquete()){}  
    }
