// Smart Brain is a face recognition app.
// in this app we will practice both front end and back-end.
// we will use the PostgreSQL  database

import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FacesRecognition from './components/FacesRecognition/FacesRecognition'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
const app = new Clarifai.App({ // using the Clarifi service to implement the face detection model
  apiKey: '481b0991bfe94ee89122683eb3160c88'
});

const particleOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '', // this is a state for detecting the input in the searchbox
      imageURL:'',
      box:[],
      route:'signin', //keeps track where we are on the page
      isSignedin: false,
      user: {
        id: '',
        name:'',
        email:'',
        password:'',
        entries: 0,
        joined: ''
      }
    }
  }


  onInputChange = (event) => { //the function is listening to the changes of the user input
    this.setState({input:event.target.value});
  }
  boxDraw = (data) => {
    const DimArr=[];
    const FaceBox = data.outputs[0].data.regions;
    //region_info.bounding_box
    const image = document.getElementById("inputImage");
    // the data represented by the response is in percentage of the image.
    //if we grapped the image id so we will have exact place.
    const width = Number(image.width);
    const height = Number(image.height);
    for(let i=0;i<FaceBox.length;i++){
      let tmpBox = FaceBox[i].region_info.bounding_box;
      let Dim =  {
      leftCol:tmpBox.left_col * width,
      topRow: tmpBox.top_row * height,
      rightCol: width - (tmpBox.right_col * width),
      bottomRow: height - (tmpBox.bottom_row * height)
    }
    DimArr.push(Dim);
  }
    this.setState({box:DimArr});
  }
  userInfoChange = (data) => {
    this.setState({user: data});
  }
  onRouteChange = (route) => {
    if (route ==='signin'){
      this.setState({isSignedin:false});
      this.setState({ input: '', // this is a state for detecting the input in the searchbox
                      imageURL:'',
                      box:[],
                      route:'signin', //keeps track where we are on the page
                      isSignedin: false,
                      user: {
                        id: '',
                        name:'',
                        email:'',
                        password:'',
                        entries: 0,
                        joined: ''}
                      })
                    }
    
    else if (route === 'home'){
      this.setState({isSignedin:true})
    }
      this.setState({route:route});

  }
  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then((response) => {
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then( count => {
          this.setState (prevState => {
            let user = Object.assign({}, prevState.user);
            user.entries = count[0];
            return {user};
          })
        })
        this.boxDraw(response);
      }
    }
    )
    .catch(err => console.log(err));
  }
  render(){
  return ( 
    <div className="App">
    <Navigation isSignedin={this.state.isSignedin} onRouteChange={this.onRouteChange}/> 
    <Particles params={particleOptions} className="abspos"/>
    {
      this.state.route === 'home' ?
      <div>
          <Logo />
          <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
          <ImageLinkForm 
            onButtonSubmit={this.onButtonSubmit} 
            onInputChange={this.onInputChange} /> {/* sending the input function as a prop to the Image Link Form*/}
          <FacesRecognition box={this.state.box} imageURL={this.state.imageURL}/>
        </div>
        : 
        (this.state.route === 'signin'?

          <Signin userInfoChange={this.userInfoChange} isSignedin={this.state.isSignedin} onRouteChange = {this.onRouteChange} />
          :
          <Register userInfoChange={this.userInfoChange} onRouteChange = {this.onRouteChange} />
        )
            
        
    }
    </div>
  );
  }
}

export default App;
