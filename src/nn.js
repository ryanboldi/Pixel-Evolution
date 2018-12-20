function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}


class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        if (input_nodes instanceof NeuralNetwork) {
            let a = input_nodes;
            this.input_nodes = a.input_nodes;
            this.hidden_nodes = a.hidden_nodes;
            this.output_nodes = a.output_nodes;

            this.weights_ih = a.weights_ih.copy();
            this.weights_ho = a.weights_ho.copy();

            this.bias_h = a.bias_h.copy();//column vector of biases for first layer
            this.bias_o = a.bias_o.copy();
        } else {
            this.input_nodes = input_nodes;
            this.hidden_nodes = hidden_nodes;
            this.output_nodes = output_nodes;

            this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
            this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
            this.weights_ih.randomize();
            this.weights_ho.randomize();

            this.bias_h = new Matrix(this.hidden_nodes, 1);//column vector of biases for first layer
            this.bias_o = new Matrix(this.output_nodes, 1);
            this.bias_h.randomize();
            this.bias_o.randomize();
        }
    }

    feedforward(input_array) {
        let inputs = Matrix.fromArray(input_array);

        //INPUTS ----> HIDDEN
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);//no need to multiply as node is always 1, so x1 is the same as just adding the number
        hidden.map(sigmoid);//applies the sigmoid function to the column vector that stores the hidden node values

        //HIDDEN ----> OUTPUT
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        return output.toArray();
    }

    copy() {
        return new NeuralNetwork(this);
    }

    mutate(mr) {
        let nn = new NeuralNetwork(this);
        nn.weights_ho.mutate(mr);
        nn.weights_ih.mutate(mr);

        return nn;
    }


}