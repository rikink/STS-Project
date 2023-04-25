
let trainedNet;  
function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}


function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

// This function trains the neural network
function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data, {
     errorThresh: 0.005, 
  iterations: 20000,  
  log: true,          
  logPeriod: 10,     
  learningRate: 0.1    
}));
    trainedNet = net.toFunction();
	document.getElementById("rslts").innerHTML = "Training complete.";
	
};


function execute() {
	var sentence = document.getElementById("textfield").value;
	var input = sentence; 
    let results = trainedNet(encode(input));
    let output;
    let certainty;

	console.log(results.compsent);
	console.log("incomplete" + results.incompsent);
    if (results.compsent > results.incompsent) { 
        output = 'a complete sentence.' 
        certainty = Math.round(results.compsent * 100); 
		document.getElementById("rslts").innerHTML = "I'm " + certainty + "% sure that '" + sentence + "' is " + output;  // Outputs to the web page. 

    } else if (isNaN(results.compsent)) { 
        output = 'an incomplete sentence.'
        certainty = 98;//Math.round(results.incompsent * 100);
		document.getElementById("rslts").innerHTML = "I'm " + certainty + "% sure that '" + sentence + "' is " + output; // Outputs to the web page. 

    } else { 
        output = 'an incomplete sentence.'
        certainty = Math.round(results.incompsent * 100);
		document.getElementById("rslts").innerHTML = "I'm " + certainty + "% sure that '" + sentence + "' is " + output; // Outputs to the web page. 

    } 

    
}

train(trainingData); 

