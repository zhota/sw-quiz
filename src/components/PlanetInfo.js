import React from 'react';

const PlanetInfo = (props) => (
    <div>
        <div className="Planet-name">
            <h1>{props.planet.name}</h1>
        </div>
        <div className="Planet-info">
            <h2>Climate: {props.planet.climate}</h2>
            <h2>Terrain: {props.planet.terrain}</h2>
            <div className="Movies">
            {props.planet.films && props.planet.films.length > 0 ? <h2>Featured in {props.planet.films.length} film(s)</h2> : <h2>Featured in no film</h2>} 
            </div>
        </div>
    </div>
)

export default PlanetInfo;