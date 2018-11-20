import * as tf from '@tensorflow/tfjs';
import React, { Component } from 'react';
import './classifier.css';

class Classifier extends Component {
  state = {
    image: '',
    imageLoaded: false,
    label: -1,
  };

  imageUpload = (e) => {
    const file = e.target.files[0];
    this.getBase64(file).then(async base64 => {
      this.setState({image: base64, imageLoaded: true});
      const label = await this.getLabel();
      this.setState({label: label});
    });
  }

  getBase64 = (file) => {
    return new Promise((resolve,reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    })
  }

  getLabel = async () => {
    const model = await tf.loadModel('/model.json');
    const image = document.getElementById('input_image');
    const imageTensor = tf.fromPixels(image, 1).reshape([1, 32, 32, 1]);
    const prediction = model.predict(imageTensor);
    const classIdx = tf.argMax(prediction, 1).asScalar().get();
    console.log(classIdx);
    return classIdx;
  }

  render() {
    return (
      <div className="Classifier">
        {
          this.state.imageLoaded ? (
            <img src={this.state.image} id='input_image' alt='character'/>
          ) : (
            <div>
              <input type='file'
                onChange={this.imageUpload} />
              <p>Please upload a 32x32 grayscale image just like the training or test samples.</p>
            </div>
          )
        }
        {
          this.state.label !== -1 && 
          <img id='output_image' src={`/devanagari_chars/${this.state.label}.png`} alt={`${this.state.label}`} />
        }
      </div>
    );
  }
}

export default Classifier;