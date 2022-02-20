import React, {useEffect, useState} from 'react';
import CountryCard from './CountryCard';
import { useSelector } from 'react-redux';
//import { setFirstCountries } from '../actions';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const Results = () => {
    
    let countries = useSelector(state => state.filterCountries)
    //console.log('countries in Results component: ', countries)
    //let filters = useSelector(state => state.filters)
    //console.log('filters in component', filters)
    
    //const dispatch = useDispatch() 

    const [showing, setShowing] = useState([])        
    
    useEffect(()=>{
        countries && setShowing(countries.slice(0,9))        
    }, [countries] )   
    
    const paginate = (filtered) => {
        let offset = -1
        let pages = [...new Array( Math.ceil((filtered.length - 9)/10) )
            .fill([])
            .map( page => {
                offset+=10
                return offset
            })
        ] 
        return pages       
    }
    
    let pages = countries && countries.length > 0 
        ? paginate(countries) : [0]
    
    //console.log("pages in results", pages)
    
    const handlePages = (index) => {
        setShowing(countries.slice(index, index+10))
    }

    const firstNine = () => {
        setShowing(countries.slice(0,9))
    }
        
    return (
        <>
        <div className='results'>
            {
            countries.length > 0 && showing && showing.length > 0 && showing.map( country => { 
                //console.log('country is ', country)
                return (<Link 
                key={country.id} 
                to={`/countries/${country.code}`}
                >                
                    <CountryCard
                    name={country.name} 
                    flag={country.flag}
                    code={country.code}
                    continent={country.continent}    
                    />
                </Link>) }        
            )
            }
            <br/>
        </div>
            <Pagination 
                pages={pages} 
                handlePages={handlePages}
                firstNine={firstNine}
                />
        </>
    );
}

export default Results;

