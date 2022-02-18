import React from 'react';

const Countrylist = ({countries, continent, handleCheckbox}) => {
    return (
        <div>
            <p>{continent}</p>
            {
                countries.map( c => (
                    <>
                    <label htmlFor={c.name}>{c.name}</label>
                    <input type="checkbox" onChange={(e)=>handleCheckbox(e)} name={c.name}></input>
                </>
                ))

            }
            
        </div>
    );
}

export default Countrylist;
