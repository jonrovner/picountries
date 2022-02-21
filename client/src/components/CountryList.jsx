import React from 'react';

const Countrylist = ({countries, continent, handleCheckbox}) => {
    return (
        <div className='countryGroup' >
            <h3>{continent}</h3>
            <div className='countryList'>

            {
                countries.map( c => (
                    <div className='countryCheckbox' key={c.name}>
                        <label className="countryName" htmlFor={c.name}>
                        <input id={c.name} type="checkbox" onChange={(e)=>handleCheckbox(e)} name={c.name}></input>
                            
                        {c.name}</label>
                    </div>
                ))

            }

            </div>
            
        </div>
    );
}

export default Countrylist;
