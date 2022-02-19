import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { filterByActivity, filterByContinent, filterByName, setFirstCountries } from '../actions';


const Filters = () => {
    const dispatch = useDispatch()
    //const countries = useSelector(state => state.countries)   
    const activities = useSelector(state => state.activitieNames)
    console.log('activities in component', activities)
       
    const [input, setInput] = useState("")
    
    const changeContinent = (e) => {
        e.preventDefault()
        dispatch(filterByContinent(e.target.value))
        dispatch(setFirstCountries())
    }

    const handleInput = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setInput(e.target.value)
        dispatch(filterByName(input))
        dispatch(setFirstCountries())
    }     
    
    const handleActivityFilter = (e) => {
        e.preventDefault()
        if (e.target.value === 'activity') return
        else{
            dispatch(filterByActivity(e.target.value))
        }
    }
    
    return (
        <div className="filters">
         <form className='searchForm' action="" onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" onChange={(e) => handleInput(e)} />
                       
                        <button type="submit">search by name</button>
        </form>    
                        <br />
                
                <select name="continent" id="continent" onChange={(e)=>changeContinent(e)}>                    
                        <option value="none">Continent</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Europe">Europe</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctica">Antarctica</option>   
                </select>
                <br />
                
                <select name="activity" id="activity" onChange={(e) => handleActivityFilter(e)}>
                    <option value="">activity</option>
                    {
                        activities && activities.map( activity => {
                            return (
                                <option key={activity} value={activity}>{activity}</option>
                                )
                            })     
                            
                        }
                </select>
                <br />

                <select name="order" id="order">
                    <option value="">order by</option>
                    <option value="AZ">A-Z</option>
                    <option value="ZA">Z-A</option>
                    <option value="popAsc">population ⇧ </option>
                    <option value="popDesc">population ↓ </option>
                </select>

                    
        </div>
    );
}

export default Filters;
