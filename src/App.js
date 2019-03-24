import React, { Component } from 'react';
import PlanetInfo from './components/PlanetInfo';
import NewPlanet from './components/NewPlanet';
import { swApi } from './actions/SwApi';
import Logo from './images/star-wars-quiz-logo.jpg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      planet: null,
      error: false
    }
  }

  componentDidMount() {
    return this.randomizePlanet();
  }

  randomizePlanet = () =>{
    this.setState({planet: null});
    const planetCount = 61;
    let planetId = Math.ceil(Math.random() * planetCount);
    return this.fetchPlanet(planetId);
  }    

  fetchPlanet = (planetId) => {
    return swApi(planetId)
    .then(data => this.setState({planet: data}))
    .catch(err => {
      console.log("Erro no fetch", err);
      this.setState({ error: true });
    });
  }

  render() {
    const {planet, error} = this.state;
    
    if(error) {
      return (
        <div className="App">
          <h1 className="Error">Oops... Something went wrong X(</h1>
        </div>
      )
    }

    if(!planet) {
      return (
        <div className="App">
          <div className="Loading">
          <img src={Logo} alt="loading-img" />
          <h1>Loading...</h1>
          <i class="spin fas fa-spinner"></i>
          </div>
        </div>
      ) 
    } 
    
    return (
      <div className="App">
        <PlanetInfo planet={planet}/>
        <NewPlanet randomizePlanet={this.randomizePlanet}/>
      </div>
    );
    
  }
}

export default App;
