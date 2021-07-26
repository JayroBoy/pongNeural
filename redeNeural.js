// Funções Sigmoide
function sig(num) {
    return 1 / (1 + Math.exp(-num));
}

function dsig(num) {
    return num * (1 - num); 
}

class RedeNeural {
    constructor(input, hidden, output) {
        this.input = input; // entrada
        this.hidden = hidden; // camada oculta
        this.output = output; // saída

        // Bias input -> hidden
        this.bias_ih = new Matriz(this.hidden, 1);
        this.bias_ih.randomize();

        // Bias hidden -> output
        this.bias_ho = new Matriz(this.output, 1);
        this.bias_ho.randomize();

        // Peso input -> hidden
        this.peso_ih = new Matriz(this.hidden, this.input);
        this.peso_ih.randomize()

        // Peso hidden -> output
        this.peso_ho = new Matriz(this.output, this.hidden)
        this.peso_ho.randomize()

        // Taxa de aprendizado
        this.aprendizado = 0.1; 
    }

    treino(array, alvo) {
        // Transformando array em matriz
        let input = Matriz.arrayMatriz(array);

        // Calculando camada oculta
        let hidden = Matriz.mul(this.peso_ih, input);
        hidden = Matriz.add(hidden, this.bias_ih);
        hidden.map(sig)

        // Calculando a saída
        let output = Matriz.mul(this.peso_ho, hidden);
        output = Matriz.add(output, this.bias_ho);
        output.map(sig);

        // Calculando resultado esperado
        let esperado = Matriz.arrayMatriz(alvo);

        // Calculando erro da saída
        let output_erro = Matriz.sub(esperado, output);
        let d_output = Matriz.map(output,dsig);
        let hidden_transp = Matriz.transp(hidden);

        // Calculando gradiente
        let gradiente = Matriz.hadamard(d_output, output_erro);
        gradiente = Matriz.escalar(gradiente, this.aprendizado);
        
        // Calculando bias do hidden -> output
        this.bias_ho = Matriz.add(this.bias_ho, gradiente);

        // Calculando peso do hidden -> output
        let peso_ho_deltas = Matriz.mul(gradiente, hidden_transp);
        this.peso_ho = Matriz.add(this.peso_ho,peso_ho_deltas);
        let peso_ho_transp = Matriz.transp(this.peso_ho);

        // Calculando erro da camada oculta
        let hidden_erro = Matriz.mul(peso_ho_transp,output_erro);
        let d_hidden = Matriz.map(hidden, dsig);
        let input_transp = Matriz.transp(input);

        // Calculando gradiente na camada oculta
        let gradiente_hidden = Matriz.hadamard(d_hidden, hidden_erro);
        gradiente_hidden = Matriz.escalar(gradiente_hidden, this.aprendizado);

        // Calculando bias do input -> hidden
        this.bias_ih = Matriz.add(this.bias_ih, gradiente_hidden);

        // Calculando peso input -> hidden
        let peso_ih_deltas = Matriz.mul(gradiente_hidden, input_transp);
        this.peso_ih = Matriz.add(this.peso_ih, peso_ih_deltas);
    }

    predict(array){
        // Transformando o array da entrada em matriz 
        let input = Matriz.arrayMatriz(array);

        // Calculando camada oculta
        let hidden = Matriz.mul(this.peso_ih, input);
        hidden = Matriz.add(hidden, this.bias_ih);
        hidden.map(sig)

        // Calculando saída
        let output = Matriz.mul(this.peso_ho, hidden);
        output = Matriz.add(output, this.bias_ho);
        output.map(sig);
        output = Matriz.matrizArray(output);

        return output;
    }
}
