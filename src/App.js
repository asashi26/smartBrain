import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation.js';
import FaceRecognition from './components/face-recognition/Face-recognition.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/image-link-form/Image-link-form.js';
import Rank from './components/rank/Rank.js';
import Particles from 'react-particles-js';
import './App.css';
import  Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '1c54491670014f97952c5252837adaa9'
 });
 

const particlesOptions = {
  particles: {
    number: {
        value: 180,
      density: {
        enable: true,  
        value_area: 800,
      }
    }
  }
}

class App extends Component {
constructor() {
  super();
  this.state = {
    input: '',
    image: '',
    box: {},
  }
}

calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * width,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

onInputChange = (event) => {
  this.setState({input: event.target.value});

}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  console.log('click')
  app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch( err => console.log(err, "something went wrong"));
}


  render() {
    return (
      <div className="App">
      <Particles className='particles' 
              params={particlesOptions}
            />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
