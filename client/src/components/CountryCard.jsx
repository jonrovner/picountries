import React from 'react';
import './countryCard.css'

const CountryCard = (props) => {
    
       
    return (
        <div className='countryCard'>
            <img src={props.flag} alt={props.name+" flag"} />
            <h3>{props.name}</h3>
            <h6>{props.continent}</h6>
        </div>
    );
}

export default CountryCard;
