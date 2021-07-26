function setup() {
    createCanvas(500, 500);
    background(0);
    rede = new RedeNeural(2, 3, 1);
    data = {
        inputs: [
            [4, 1],
            [1, 2],
            [0, 1],
            [2, 0]
        ],
        outputs: [
            [0],
            [1],
            [2],
            [0]
        ]
    }
}

var treino = true;

function desenhar() {
    if (treino) {
        for (var i = 0; i < 10000; i++) {
            var index = floor(random(4));
            rede.treino(data.inputs[index], data.outputs[index]);
        }
        if (rede.predict([0, 0])[0] < 0.04 && rede.predict([1, 0])[0] > 0.98) {
            treino = false;
            console.log("FIM");
        }
    }
}