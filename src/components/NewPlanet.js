import React from 'react';

const NewPlanet = (props) => (
    <div className="Button">
        <button onClick={props.randomizePlanet}>
            Next!
        </button>
    </div>
);

export default NewPlanet;
