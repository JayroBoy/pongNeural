/** Jayro Boy de Vasconcellos Neto - 9762880
 *  Isadora Carolina Siebert -  11345580
 * 
 *  Algoritmo evolutivo com o intuito de aprender a jogar pong
 */



var jogadores = [] //Registro da população
var placar = [] //Classificação da população
var curGen = 1
/*  jogadores = [
        [0,1],
        [2,3],
        [4,5],
        [6,7],
        [8,9],
        [4,1],
        [7,2],
        [4,3],
        [4,4],
        [1,3],
    ]
*/ 

function decidirDirecao(jogador, posicaoRaquete, velocidadeRaquete, bola){
    posicaoRaquete += velocidadeRaquete * 
    (((bola[0] - 34) * jogador[0]) +
    ((bola[1] - (posicaoRaquete + 60 ) < 0 ? 0 : bola[1] - (posicaoRaquete + 60 )) * jogador[1]))/
    (jogador[0] + jogador[1])
}

function colisaoTopo(bola, velocidadeBolaY){
    if(bola[1] - (bola[2]/2) < 25){
        return true
    }
    return false 
}

function colisaoFundo(bola, velocidadeBolaY){
    if(bola[1] + (bola[2]/2) > 724){
        return true
    } 
    return false
}

function colisaoDireita(bola, velocidadeBolaX, velocidadeBolaY){
    if(bola[0] + (bola[2]/2) > 875){
        return true 
    }
    return false
}

function colisaoRaquete(bola, posicaoRaquete, score, alive){
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
        var alive  = true //para saber quando sair do loop

        const velocidadeRaquete = 10 
        var posicaoRaquete = 300
    
        var bola = [350, 350, 30]//X, Y, Diâmetro
        var velocidadeBolaX = 10
        var velocidadeBolaY = Math.floor(Math.random() * 10) - 5
    
        var score = 0
        var height = 750

        while(alive){
            decidirDirecao(jogador, posicaoRaquete, velocidadeRaquete, bola)
            if(posicaoRaquete < 2){
                posicaoRaquete = 2
            }else if(posicaoRaquete > height - 122){
                posicaoRaquete = height - 122
            }
            
            bola[0] += velocidadeBolaX 
            bola[1] += velocidadeBolaY 
    
            if(colisaoTopo(bola)){
                velocidadeBolaY = -velocidadeBolaY
            }
            else if(colisaoFundo(bola)){
                velocidadeBolaY = -velocidadeBolaY
            }
            else if(colisaoDireita(bola)){
                velocidadeBolaX = -velocidadeBolaX
                velocidadeBolaY = (Math.floor(Math.random() * 10) - 5)
                if(velocidadeBolaY > 0){
                    velocidadeBolaY += 5
                }else if(velocidadeBolaY < 0){
                    velocidadeBolaY -= 5
                }
            }
            else if(colisaoRaquete(bola, posicaoRaquete, score, alive)){
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
        placar = placarBagun.sort((a,b) => {return b[0] - a[0]})
        console.log(" Generation score: ")
        console.log(placar)
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
            console.log("Generation: " + i)
            testarPop()
            atualizarPop(chance_mutacao)
            console.log(jogadores)
            console.log("  Best individual: " + jogadores[0])
        }
    
        return jogadores[0]
    } 

    console.log(rodarEvolutivo(30, 3))

