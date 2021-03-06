import React, {useEffect}  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountryByCode, clearDetails } from '../actions';
import { useParams } from 'react-router';
import Activity from './Activity';
import './countryDetail.css'

const Countrydetail = () => {

    const dispatch = useDispatch()
    const {idPais} = useParams()
    
    useEffect(() => {
       dispatch(getCountryByCode(idPais))
       return () => {
           dispatch(clearDetails())
       }
    }, [dispatch, idPais])

    const country = useSelector(state => state.countryDetail)
    
   //console.log("country detail: ", country)

    return (
        
        <div className='countryDetails'>
            <div className='detailTitle'>
                <h1>
                {country && country.name}
                </h1>
                <h3>{country.region}</h3>

             </div>
            <div className='detailBody'>
                <div className='info'>
                
                    <p>Capital: <span>{country.capital}</span></p>
                    <p>Area: <span>{Number(country.area).toLocaleString()+" mll. km2"}</span></p>
                    <p>Population: <span>{Number(country.population).toLocaleString()}</span></p>
                    <p>Continent: <span>{country.continent}</span></p>
                    <p>Code: <span>{country.code}</span></p>
                    {
                        country.map && <a className='mapLink' 
                        target='_blank' 
                        rel='noopener noreferrer' 
                        href={country.map}>Google Maps</a>
                    }
                    
                    

                </div>
                <img src={country.flag} alt={country.name} />
            </div>

            <div className="activities">
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
