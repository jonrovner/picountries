
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCountries, getFirstNine, getCountries } from '../actions';
import Results from './Results';
import Filters from './Filters';

const Search = () => {
        
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getCountries)
    
    }, [dispatch]);

    //dispatch(getCountries())    
    //const countries = useSelector( state => state.countries)
    //const filteredCountries = useSelector(state => state.showingCountries)
    
    const pages = useSelector( state => state.pages)
   
    //console.log("pages is ", pages)
    /*  */
    //console.log('countries : ', countries)
    //console.log('filtered countries : ', filteredCountries)    
    
    return (
        <div className='search'>           

            <Filters />  
            <Results />                       
            
            <div className='controls'>               
                <div className='pagination' onClick={()=>dispatch(getFirstNine())}>0</div>
               {                                  
                pages && pages.map( (page, index) => {
                    return(
                        <div className='pagination' 
                            key={index} 
                            onClick={()=>dispatch(setCountries(page))}
                            >
                            {index+1}
                        </div>
                    )
                })                    
               }

            </div>
            
        </div>
    );
}

export default Search;
