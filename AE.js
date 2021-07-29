/** Jayro Boy de Vasconcellos Neto - 9762880
 *  Isadora Carolina Siebert -  11345580
 * 
 *  Algoritmo evolutivo com o intuito de aprender a jogar pong
 */


// AE
var jogadores = [] //Registro da população
var placar = [] //Classificação da população

// PONG
var alive  = true //para saber quando sair do loop

const velocidadeRaquete = 10 
var posicaoRaquete = 300

var bola = [350, 350, 30]//X, Y, Diâmetro
var velocidadeBolaX = 10
var velocidadeBolaY = Math.floor(Math.random() * 10) - 5

const maxDistHorizontal = 829
const maxDistVertical = 820

var score = 0
var height = 750


//Funçoes
function sigmoid(t) {
    return 1/(1 + Math.pow(Math.E, -t));
}


function decidirDirecao(player){
    if(velocidadeBolaX != 0){
        var distHorizontal = (Math.abs(bola[0] - 34)/maxDistHorizontal)  //Posição em X do centro da bola - posição da borda direita da raquete
        var distVertical = (Math.abs(bola[1] - (posicaoRaquete + 60))/maxDistVertical)   //Posição em Y do centro da bola - linha central da raquete
        var decisor = ((distHorizontal/maxDistHorizontal * player[0]) + (distVertical/maxDistVertical * player[1]))
        decisor = sigmoid(decisor)
        //console.log(decisor)
        if(decisor < .5){
            return 1//para baixo
        }else {
            return -1//para cima
        }
    }else{
        return 0
    }
}


function colisaoTopo(){
    if(bola[1] - (bola[2]/2) < 25){
        return true
    }
    return false 
}

function colisaoFundo(){
    if(bola[1] + (bola[2]/2) > 724){
        return true
    } 
    return false
}

function colisaoDireita(){
    if(bola[0] + (bola[2]/2) > 875){
        return true 
    }
    return false
}

function colisaoRaquete(){
    if(bola[0] - (bola[2]/2) < 20){ //Se a bola estiver na coluna da raquete
        if(bola[1]  > posicaoRaquete && bola[1] < posicaoRaquete + 120){ //Se a bola estiver nas linhas da raquete
            score++//Ganha um ponto
            return true //Diz que colidiu
        }else{//Se estiver na coluna da raquete mas não na linha dela
            alive = false//morre
            return alive //Diz que não colidiu com a raquete
        }
    }
    return false //Não colidiu com a raquete mas não morreu
}


//Funções do AE
    //Essa função faz um determinado jogador passar pelo pong.
    function testar(jogador){
        
        alive  = true //para saber quando sair do loop
 
        posicaoRaquete = 300

        bola = [350, 350, 30]//X, Y, Diâmetro
        velocidadeBolaX = 10
        velocidadeBolaY = Math.floor(Math.random() * 10) - 5

        score = 0
        height = 750
        let i = 0

        while(alive){
            if(decidirDirecao(jogador) === 1){
                posicaoRaquete += velocidadeRaquete
            }else{
                posicaoRaquete += -velocidadeRaquete
            }

            if(posicaoRaquete < 2){
                posicaoRaquete = 2
            }else if(posicaoRaquete > height - 122){
                posicaoRaquete = height - 122
            }
            
            bola[0] += velocidadeBolaX 
            bola[1] += velocidadeBolaY 
    
            if(colisaoTopo()){
                velocidadeBolaY = -velocidadeBolaY
            }
            else if(colisaoFundo()){
                velocidadeBolaY = -velocidadeBolaY
            }
            else if(colisaoDireita()){
                velocidadeBolaX = -velocidadeBolaX
                velocidadeBolaY = (Math.floor(Math.random() * 10) - 5)
                if(velocidadeBolaY > 0){
                    velocidadeBolaY += 5
                }else if(velocidadeBolaY < 0){
                    velocidadeBolaY -= 5
                }
            }
            else if(colisaoRaquete()){
                velocidadeBolaX = -velocidadeBolaX //Rebate a bola
                velocidadeBolaY = (Math.floor(Math.random() * 10) - 5) //Com um angulo aleatório 
                if(velocidadeBolaY > 0){
                    velocidadeBolaY += 5
                }else if(velocidadeBolaY < 0) {
                    velocidadeBolaY -= 5
                }
            }
        }
        return score
    }
    
    //Essa função "cruza" dois jogadores
    function filho(a, b){
        var resultado = []
        resultado.push((a[0] + b[0]) / 2)
        resultado.push((a[1] + b[1]) / 2)
        return resultado
    }
    
    /** Essa função gera uma população de 10 jogadores */
    function gerarPop(){
        for(let i  = 0; i <  10; i++){
            let jogador = []
            for(let j = 0 ; j < 2; j++){
                jogador.push(Math.random()) // numero entre 0 e 1(não inclusivo)
            }
            jogadores.push(jogador)
        }
    }
    
    /** Essa função testa cada um do indivíduos e os classifica por pontuação */
    function testarPop(){
        let placarBagun = []
        for(let i  = 0; i  < 10; i++){
            placarBagun.push([testar(jogadores[i]), jogadores[i]])
        }
        //placarBagun[3][0] = 12 //Para conferir se a ordenação funciona
        placar = placarBagun.sort((a,b) => {return b[0] - a[0]})
    }
    
    /* Aleatoriamente altera cada gene uma vez, em indivíduos aleatórios, 
    com (100 - porcentagem) % de chance de não fazer nada.
    Não foi utilizada.*/ 
    function mutacao_caotica(porcentagem){
        if(Math.floor(Math.random() * 100)  <= porcentagem){
            jogadores[Math.floor(Math.random() * 10) - 1][0] = Math.random() * 10
            jogadores[Math.floor(Math.random() * 10) - 1][1] = Math.random() * 10 
        }
    }
    
    
    /** Percorre a população, cada individuo tem porcentagem% de chance de ter os seus
     *  genes alterados em (porcentagem*4)%, pra mais ou pra menos
     */
    function mutacao_conservadora(porcentagem){
        for(let i = 0; i < 10; i++){
            if(Math.floor(Math.random() * 100)  <= porcentagem){
                jogadores[i][0] += jogadores[i][0] * (porcentagem/25) * (Math.random() < 0.5 ? -1 : 1) 
                jogadores[i][1] += jogadores[i][1] * (porcentagem/25) * (Math.random() < 0.5 ? -1 : 1)
                                //Valor modificado   //Quantidade       //Soma ou subtração
            }
        }
    }
    
    //Descarta os 60% piores, cruza os 40% melhores. 
    /** O parametro porcentagem está relacionado tanto à chance de mutacao individual quanto à 
     * quantidade em que o valor que sofre mutação é alterado */ 
    function atualizarPop(porcentagem){
        jogadores[0] = placar[0][1]
        jogadores[1] = placar[1][1]
        jogadores[2] = placar[2][1]
        jogadores[4] = filho(jogadores[0], jogadores[1])
        jogadores[5] = filho(jogadores[0], jogadores[2])
        jogadores[6] = filho(jogadores[0], jogadores[3])
        jogadores[7] = filho(jogadores[1], jogadores[2])
        jogadores[8] = filho(jogadores[1], jogadores[3])
        jogadores[9] = filho(jogadores[2], jogadores[3])
        mutacao_conservadora(porcentagem)
    }
      
    /** Funcao que, quando chamada, gera uma população, testa ela e a atualiza, removendo
     * os 60% piores. Ela faz isso GERAÇÃO vezes, e a chance individual de mutação é de
     * VARIABILIDADE por cento
     */
    function rodarEvolutivo(geracoes, variabilidade){
        var chance_mutacao = variabilidade
        gerarPop()
    
        for(let i = 0; i < geracoes; i++){
            console.log("Generation: " + (i + 1))
            testarPop()
            atualizarPop(chance_mutacao)
            console.log("  Best individual: [" +  jogadores[0][0].toFixed(3) + ", " + jogadores[0][1].toFixed(3) + "]")
            console.log("  Scored: " + placar[0][0])
        }
        return jogadores[0]
    } 

    console.log(rodarEvolutivo(30, 3))

