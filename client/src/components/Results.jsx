import React, {useEffect, useState, } from 'react';
import CountryCard from './CountryCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Results = () => {
    
    const countries = useSelector(state => state.filterCountries) 
    //console.log('countries in component', countries)
    const [showing, setShowing] = useState([])
    const [current, setCurrent] = useState(0)
    const [pages, setPages] = useState([]) 
    
    useEffect(() => {
      //  console.log('running pagination effect')
        setPages([])
        paginate(countries) 
        setShowing(countries.slice(0,9))        
              
    },[countries])

    
    useEffect(() => {
        if (pages.length > 0){
            setShowing(countries.slice(pages[current][0], pages[current][1]))        
        }

    }, [pages, current, countries])
    
    const filters = useSelector(state => state.filters)
    useEffect(() => {
        setCurrent(0)

    }, [filters])

    const paginate = (countries) => {
        let pagesEffect = []
        let num = countries && countries.length > 0 && 
        Math.ceil((countries.length - 9)/10)
        for (let i=0; i <=num; i++){
            if (i===0) 
            pagesEffect[i] = [0, 9]
            else
            pagesEffect[i] = [ (i*10)-1, (i*10)+9 ] 
        }
        if (num > 0){
            setPages(pagesEffect)
        }  
        //console.log('pages in paginate', pages)   
    } 

    const handlePagesIndex = (index) => {
        setCurrent(index)
    }
  
    const nextPage = () => {
        if (current === pages.length-1) return
         else 
            setCurrent(current => current+1)        
    }

    const prevPage = () => {
        if (current === 0) return
        else 
           setCurrent(current => current-1)
    }

    //console.log('pages in component', pages) 
    return (
        <>
        <div className='results'>
            {
            (countries.length > 0 && showing && showing.length > 0) 
            ? showing.map( country => { 
                return (
                <Link 
                key={country.id} 
                to={`/countries/${country.code}`}
                className="resultsItem"
                >                
                    <CountryCard
                    name={country.name} 
                    flag={country.flag}
                    code={country.code}
                    continent={country.continent}    
                    />
                </Link>) }        
            ):(
                <div className='emptyList'>
                    <h3>no countries to show</h3>
                </div>
            )
            }
        </div>
        <br/>
        <div className="controls">
            <div className='pagination' onClick={prevPage}>≪</div>   
               {                                  
                pages.length > 0 && pages.map( (page, i) => {
                    return(
                        <div className='pagination' 
                            key={i} 
                            onClick={()=>handlePagesIndex(i)}
                            >
                            {i+1}
                        </div>
                    )
                })           
                }

            <div className='pagination' onClick={()=>{nextPage()}}>≫</div>    
        </div>
            
        </>
    );
}

export default Results;

