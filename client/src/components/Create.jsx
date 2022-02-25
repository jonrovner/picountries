import React, {useState} from 'react';
import { addActivity, getCountries } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Countrylist from './CountryList';


const Create = () => {
    let navigate = useNavigate()
    const countries = useSelector(state => state.countriesfromDB)
    
    let countriesByContinent = {}
    countries.forEach( country => {

        if (countriesByContinent.hasOwnProperty(country.continent)){
            countriesByContinent[country.continent].push(country)
        } else {

            countriesByContinent[country.continent] = [country]
        }
    })

    const dispatch = useDispatch()
    
    const [input, setInput] = useState({countries: []})
    const [valid, setValid] = useState("")
    const [viewList, setViewList] = useState(false)

    const handleInput = (e) => {
        
        const {name, value} = e.target

        if (value === "") return

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
        if (/[`!@#$%^&*()_+\-=\\{};':"\\|,.<>?~]/.test(input.name)){
            return "no special characters"
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

    console.log('input is : ', input)

    return (
        <div className='create'>
            <form className='createControls'
                onChange={ (e) => handleInput(e) }
                onSubmit={(e)=>handleSubmit(e)}> 
                <div className='validation'>{valid}</div>
                <div className='nameInput'>
                    <label htmlFor='name'>Name</label>
                    <input name="name" type="text" />
                </div>            
                <div className='difficultyFilter'>
                    <label htmlFor='difficulty'>Difficulty</label>
                    <select name="difficulty" id="">
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>

                    </select>

                </div>
              
                <div className='durationInput'>

                    <label htmlFor='duration'>Duration</label>
                    <input name="duration" type="text" />

                </div>
           
                <div className='seasonInput'>

                    <label htmlFor='season'>Season</label>
                    <select name="season" id="">
                        <option value="" ></option>
                        <option value="winter" >Winter</option>
                        <option value="spring">Spring</option>
                        <option value="summer">Summer</option>
                        <option value="fall">Fall</option>
                    </select>
                </div>
     
                <div className='createButtons'>
                    <button className="myButton" onClick={(e)=>showList(e)}>select countries</button>
                    <button className="myButton" type='submit'>submit</button>
                </div>

            </form>
            <form>
                {
                 viewList && 
                 <>
                    <Countrylist continent="Europe" countries={countriesByContinent.Europe} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="Asia" countries={countriesByContinent.Asia} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="North America" countries={countriesByContinent['North America']} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="South America" countries={countriesByContinent['South America']} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="Africa" countries={countriesByContinent.Africa} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="Oceania" countries={countriesByContinent.Oceania} handleCheckbox={handleCheckbox}/>
                    <Countrylist continent="Antarctica" countries={countriesByContinent.Antarctica} handleCheckbox={handleCheckbox}/>
                    <button className="myButton" onClick={(e)=>hideList(e)}>Done</button>
                 </>                   

                }

                
            </form>
            
        </div>
    );
}

export default Create;
