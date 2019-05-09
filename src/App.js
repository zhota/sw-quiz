
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
      error: false,
      endGame: false,
      blackList: []
    }
  }

  componentDidMount() {
    return this.randomizePlanet();
  }

  randomizePlanet = () =>{
    this.setState({planet: null});
    const planetCount = 61;
    let planetId = Math.ceil(Math.random() * planetCount);
    return this.fetchPlanet(planetId, planetCount);
  }    

  fetchPlanet = (planetId, planetCount) => {
    if(this.state.blackList.includes(planetId)){
      return this.randomizePlanet();
    }
    if(this.state.blackList.length === planetCount - 1){
      return this.gameOver();
    }
    const blackList = this.state.blackList;
    this.setState({
      blackList: blackList.concat(planetId)
    }, () => {
      console.log(this.state.blackList);
    });
    return swApi(planetId)
      .then(data => {
        if(!this.isValidPlanet(data)) {
          return this.randomizePlanet();
        } 
        this.setState({planet: data})
      })
      .catch(err => {
      console.log("Erro no fetch", err);
      this.setState({ error: true });
    });
  }

  isValidPlanet = data => {
    console.log(data);
    if(data.population === 'unknown' || data.name === 'unknown' || data.climate === 'unknown' || data.terrain === 'unknown'){
      return false;
    }
    return true;
  }

  gameOver = () => {
    console.log("Encerrando...");
    return this.setState({endGame: true});
  }

  render() {
    const {planet, error, endGame} = this.state;
    
    if(error) {
      return (
        <div className="App">
          <h1 className="Error">Oops... Something went wrong X(</h1>
        </div>
      )
    }

    if(endGame) {
      return(
        <div className="App">
          <div className="Game-over">
            <h1 className="Game-over--title">GAME OVER!</h1>
            <span>Click on RESET to start again!</span>
            <button 
              className="Reset" onClick={() => window.location.reload()}>
                RESET
              </button>
          </div>
        </div>
      )
    }

    if(!planet) {
      return (
        <div className="App">
          <div className="Loading">
          <img src={Logo} alt="loading-img" />
          <h1>Loading...</h1>
          <i className="spin fas fa-spinner"></i>
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
