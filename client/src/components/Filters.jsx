import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addFilter, filterByName, getCountries, setFirstCountries, clearFilters } from '../actions';


const Filters = () => {

    const dispatch = useDispatch()    
    //useEffect(()=>{dispatch(getCountries())},[dispatch])
    
    const activities = useSelector(state => state.activities)
    let names = []
    if (activities && activities.length > 0) {
        names = [...new Set(activities.map(a => a.name))]
    }             
    
    const [input, setInput] = useState("")
    
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

    const handleFilters = (e) => {
        const {name, value} = e.target
        dispatch(addFilter({name, value}))
    }

   
    
    return (
        <div className="filters">
         
         <form className='searchForm' action="" onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" onChange={(e) => handleInput(e)} />
                       
                        <button type="submit">search by name</button>
        </form>    
        <br />

        <form id="filterForm" onChange={(e)=>handleFilters(e)}>

            <select name="continent" id="continent">

                            <option value="clear">Continent</option>
                            <option value="Asia">Asia</option>
                            <option value="Africa">Africa</option>
                            <option value="Europe">Europe</option>
                            <option value="North America">North America</option>
                            <option value="South America">South America</option>
                            <option value="Oceania">Oceania</option>
                            <option value="Antarctica">Antarctica</option>   
            </select>
                
                
            <select name="activity" id="activity">
                    <option value="clear">activity</option>
                    {
                        names.length > 0 && names.map( activity => {
                            return (
                                <option key={activity} value={activity}>{activity}</option>
                                )
                            })     
                            
                        }
            </select>
            
            <select name="order" id="order">
                        <option value="clear">order by</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                        <option value="populationASC">population ascending </option>
                        <option value="populationDESC">population descending </option>
            </select>
        
        
        
        
        
        </form>    
        <button onClick={()=>{
            dispatch(clearFilters())
            dispatch(getCountries())
            document.querySelector('#filterForm').reset()
        }}>clear filters</button>    
                

               

                    
        </div>
    );
}

export default Filters;
