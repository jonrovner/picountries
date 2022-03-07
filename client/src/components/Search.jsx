import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {  getActivities } from '../actions';
import Results from './Results';
import Filters from './Filters';
import './search.css'

const Search = () => {
        
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getActivities())
    
    });
        
    return (
        <div className='search'>           

            <Filters />  
            <Results />                       
                        
        </div>
    );
}

export default Search;
