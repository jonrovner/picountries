import React, {useEffect}  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountryByCode } from '../actions';
import { useParams } from 'react-router';
import Activity from './Activity';

const Countrydetail = () => {

    const dispatch = useDispatch()
    const {idPais} = useParams()
    
    useEffect(()=>{
       dispatch(getCountryByCode(idPais))
    }, [dispatch, idPais])

    const country = useSelector(state => state.countryDetail)
    
    console.log("country detail: ", country)

    return (
        
        <div className='countryDetails'>
            <img src={country.flag} alt={country.name} style={{width: "100px"}}/>
            <h3>
            {country && country.name}

            </h3>
            <h5>{country.region}</h5>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <p>population: {country.population}</p>
            <p>continent: {country.continent}</p>
            <p>code: {country.code}</p>

            <div>
                {
                    country.activities &&
                    country.activities.length > 0 && 
                    country.activities
                    .map( a => <Activity key={a.name} activity={a} /> )
                }
            </div>


        </div>
    );
}

export default Countrydetail;
