/** Jayro Boy de Vasconcellos Neto - 9762880
 *  Isadora Carolina Siebert -  11345580
 * 
 *  Algoritmo evolutivo com o intuito de aprender a jogar pong
 */



var jogadores = [] //Registro da população
var placar = [] //Classificação da população

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
        let player = []
        for(let j = 0 ; j < 2; j++){
            player.push(((Math.random() * 10))) // numero entre 0 e 10
        }
        jogadores.push(player)
    }
}

/** Essa função testa cada um do indivíduos e os classifica por pontuação */
function testarPop(){
    for(let i  = 0; i  < 10; i++){
        placar.push([testar(jogadores[i]), i])
        placar.ordenar()
    }
}

/* Aleatoriamente altera cada gene uma vez, em indivíduos aleatórios, 
com (100 - porcentagem) % de chance de não fazer nada*/ 
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
        testarPop()
        atualizarPop(chance_mutacao)
    }

    return jogadores[0]
} 
