import React, {useEffect} from 'react';
import CountryCard from './CountryCard';
import { useSelector, useDispatch } from 'react-redux';
import { setFirstCountries } from '../actions';
import { Link } from 'react-router-dom';

const Results = () => {

    const dispatch = useDispatch() 
    
    useEffect(()=>{
        dispatch(setFirstCountries)        
    }, [dispatch])

    const countries = useSelector(state => state.showingCountries)
        
    return (
        <div className='results'>
            {
            countries && countries.map( country =>  
                <Link 
                key={country.id} 
                to={`/countries/${country.code}`}
                >                
                    <CountryCard
                            name={country.name} 
                            flag={country.flag}
                            code={country.code}
                            continent={country.continent}    
                        />
                    </Link>
                
               
                )
            }

            
        </div>
    );
}

export default Results;

