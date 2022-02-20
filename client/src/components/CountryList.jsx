import React from 'react';

const Countrylist = ({countries, continent, handleCheckbox}) => {
    return (
        <div >
            <p>{continent}</p>
            <div className='countryList'>

            {
                countries.map( c => (
                    <div key={c.name}>
                        <label className="countryName" htmlFor={c.name}>{c.name}</label>
                        <input type="checkbox" onChange={(e)=>handleCheckbox(e)} name={c.name}></input>
                    </div>
                ))

            }

            </div>
            
        </div>
    );
}

export default Countrylist;
