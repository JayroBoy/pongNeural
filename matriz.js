class Matriz {
    constructor(linhas, colunas) {
        this.linhas = linhas;
        this.colunas = colunas;
        this.data = [];

        for (let i = 0; i < linhas; i++) {
            let array = []
            for (let j = 0; j < colunas; j++) {
                array.push(0)
            }
            this.data.push(array);
        }
    }

    static arrayMatriz(array) {
        let matriz = new Matriz(array.length, 1);
        matriz.map((elm, i, j) => {
            return array[i];
        })
        return matriz;
    }

    static matrizArray(m) {
        let array = []
        m.map((elm, i, j) => {
            array.push(elm);
        })
        return array;
    }

    random() {
        this.map((elm, i, j) => {
            return Math.random() * 2 - 1;
        });
    }

    static map(A, func) {
        let matriz = new Matriz(A.linhas, A.colunas);
        matriz.data = A.data.map((array, i) => {
            return array.map((num, j) => {
                return func(num, i, j);
            })
        })
        return matriz;
    }

    map(func) {
        this.data = this.data.map((array, i) => {
            return array.map((num, j) => {
                return func(num, i, j);
            })
        })
        return this;
    }

    static transp(A){
        var matriz = new Matriz(A.colunas, A.linhas);
        matriz.map((num,i,j) => {
            return A.data[j][i];
        });
        return matriz;
    }

    // Matriz x Escalar
    static escalar(A, escalar) {
        var matriz = new Matriz(A.linhas, A.colunas);

        matriz.map((num, i, j) => {
            return A.data[i][j] * escalar;
        });

        return matriz;
    }
    
    // Matriz x Matriz
    static mulMatriz(A, B) {
        var matriz = new Matriz(A.linhas, A.colunas);

        matriz.map((num, i, j) => {
            return A.data[i][j] * B.data[i][j]
        });

        return matriz;
    }

    
    static add(A, B) {
        var matriz = new Matriz(A.linhas, A.colunas);

        matriz.map((num, i, j) => {
            return A.data[i][j] + B.data[i][j]
        });

        return matriz;
    }

    static sub(A, B) {
        var matriz = new Matriz(A.linhas, A.colunas);

        matriz.map((num, i, j) => {
            return A.data[i][j] - B.data[i][j]
        });

        return matriz;
    }

    static mul(A, B) {
        var matriz = new Matriz(A.linhas, B.colunas);

        matriz.map((num, i, j) => {
            let soma = 0
            for (let k = 0; k < A.colunas; k++) {
                let x = A.data[i][k];
                let y = B.data[k][j];
                soma += x * y;
            }
            return soma;
        })

        return matriz;
    }

    print() {
        console.table(this.data);
    }
}