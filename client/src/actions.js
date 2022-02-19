import axios from "axios"

export const getCountries = () => {    
    return function (dispatch) {
        console.log("geting all countries")
        return axios.get('http://localhost:3001/countries')
        .then( res => {
            dispatch({
                type: 'getCountries',
                payload: res.data
            }
            
        )})
        .catch(err => console.log('EROR GETTING ALL COUNTRIES', err))
    }
}    
    

export const addActivity = (activity) => {    
    return function(dispatch){
        return axios.post('http://localhost:3001/activity', activity)
        .then( res => {
            dispatch({
                type: 'addActivity',
                payload: activity
                
            })
        })
        .catch(err => console.log('ERROR ADDING ACTIVITY ,', err))
        
    }
}

export const setFirstCountries = () => {    
    return {
        type: 'setFirstCountries',
    }
}

export const setCountries = (indexes) => {
    return {
        type: 'setCountries',
        payload: indexes
    }
}
export const getFirstNine = () =>{
    
    return {
        type: 'getFirstNine'
    }
}
export const filterByContinent = (continent) => {
    
    return {
        type: 'filterByContinent',
        payload: continent
    }
}
export const filterByName = (name) => {
    return {
        type: 'filterByName',
        payload: name
    }
}
export const filterByActivity = (activity) => {
    return {
        type: 'filterByActivity',
        payload: activity
    }
}
export const getCountryByCode = (code) => {
    return function(dispatch){
        return axios.get(`http://localhost:3001/countries/${code}` )
        .then( res => {
            dispatch({
                type: 'getCountryByCode',
                payload: res.data
            })
        })
    }     
}
