const tf = require('@tensorflow/tfjs-node');

async function predictClassification(model, image){
    const tensor = tf.node
        .decodeImage(image)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        console.log(score);
        console.log(confidenceScore);

        const label = confidenceScore > 50 ? 'Cancer' : 'Non-cancer';

        let suggestion;
        if(label === 'Cancer'){
            suggestion = "Segera periksa ke dokter!"
        }else{
            suggestion = "Penyakit kanker tidak terdeteksi."
        }

        return {
            label,
            suggestion
        }

}

module.exports = predictClassification;