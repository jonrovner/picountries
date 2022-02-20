import React, {useState} from 'react';
import { addActivity, getCountries } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Countrylist from './CountryList';


const Create = () => {
    let navigate = useNavigate()
    const countries = useSelector(state => state.countriesfromDB)
    
    const europCountries = countries.filter(country => country.continent === "Europe")
    const asiaCountries = countries.filter(c => c.continent === "Asia")
    const NACountries = countries.filter(c => c.continent === "North America")
    const SACountries = countries.filter(c => c.continent === "South America")
    const africaCountries = countries.filter(c => c.continent === "Africa")
    const oceaniaCountries = countries.filter(c => c.continent === "Oceania")
    const antarCountries = countries.filter(c => c.continent === "Antarctica")
    
    const dispatch = useDispatch()
    
    const [input, setInput] = useState({countries: []})
    const [valid, setValid] = useState("")
    const [viewList, setViewList] = useState(false)

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value

        setInput( input => {
            return {
                ...input,
                [name]: value} 
        })
    }

    const validate = () => {
        if(!input.name || !input.difficulty || !input.season || !input.duration){
            return "all fields must be setted"
        }
        return "valid"
    }

    const handleSubmit = async (e) => {        
        e.preventDefault()
        const validity = validate()
        
        if (validity !== "valid"){
           return setValid(validity)
        } else {
            await dispatch(addActivity(input))
            await dispatch(getCountries())
            return navigate('/countries')
        }
    }

    const handleCheckbox = (e) => {
        e.target.checked ? setInput({
            ...input,
            countries: [...input.countries, e.target.name]
        }):
            setInput({
                ...input,
                countries: input.countries.filter( c => c !== e.target.name)
            })

    }
    const showList = (e) => {
        e.preventDefault()
        setViewList(true)
    }
    const hideList = (e) => {
        e.preventDefault()
        setViewList(false)
    }

    //console.log('input is : ', input)

    return (
        <div className='create'>
            <form
                onChange={ (e) => handleInput(e) }
                onSubmit={(e)=>handleSubmit(e)}> 
                <div className='validation'>{valid}</div>
                <label htmlFor='name'>name</label>
                <input name="name" type="text" />
                <br/>
                <label htmlFor='difficulty'>difficulty</label>
                <select name="difficulty" id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                </select>
                <br/>
                <label htmlFor='duration'>duration</label>
                <input name="duration" type="text" />
                <br/>
                <label htmlFor='season'>season</label>
                <select name="season" id="">
                    <option value="winter">winter</option>
                    <option value="spring">spring</option>
                    <option value="summer">summer</option>
                    <option value="fall">fall</option>
                </select>

                <br/>
                <button onClick={(e)=>showList(e)}>select countries</button>
                
                <button type='submit'>submit</button>

            </form>
            <form>
                {
                 viewList && 
                 <>
                    <Countrylist continent="Europe" countries={europCountries} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="Asia" countries={asiaCountries} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="North America" countries={NACountries} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="South America" countries={SACountries} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="Africa" countries={africaCountries} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="Oceania" countries={oceaniaCountries} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="Antarctica" countries={antarCountries} handleCheckbox={handleCheckbox}/>
                    <button onClick={(e)=>hideList(e)}>Done</button>
                 </>                   

                }

                
            </form>
            
        </div>
    );
}

export default Create;
