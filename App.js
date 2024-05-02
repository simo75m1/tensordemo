import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export default function App() {


  const [result, setResult] = useState(null)

  useEffect(() => {
    async function loadModel() {

      await tf.ready();

      const model = await tf.loadLayersModel('./assets/shardedmodel/model.json');

      // Make predictions for inputs [0, 1] and [1, 0]
      const prediction1 = model.predict(tf.tensor2d([[0, 1]]));
      const prediction2 = model.predict(tf.tensor2d([[1, 0]]));

      // Get the results of the predictions
      const result1 = prediction1.dataSync()[0];
      const result2 = prediction2.dataSync()[0];

      // Display the results
      setResult(`Input [0, 1]: ${result1}, Input [1, 0]: ${result2}`);
    }

    // Call the function to load the model
    loadModel();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {result}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
