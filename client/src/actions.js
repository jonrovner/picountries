import axios from "axios"

export const getCountries = () => {   

    return function (dispatch) {
        //console.log("geting all countries")
        return axios.get('/countries')
        .then( res => {
            dispatch({
                type: 'getCountries',
                payload: res.data
            }
            
            )})
            .catch(err => console.log('EROR GETTING ALL COUNTRIES', err))
        }
    }
    
    export const getActivities = () => {
        //console.log('getting activities')
        return function(dispatch){
        return axios.get('/countries')
        .then( res => {            
            let activitiesDB = res.data.map( c => c.activities)
            let activities = activitiesDB.filter(a => a.length>0).flat()
           // console.log('activities in db ', activities)
            dispatch({
                type: 'getActivities',
                payload: activities
            })

        })

    }
}    

export const addActivity = (activity) => {    
    return function(dispatch){
        return axios.post('/activity', activity)
        .then( res => {
            dispatch({
                type: 'addActivity',
                payload: activity
                
            })
        })
        .catch(err => console.log('ERROR ADDING ACTIVITY ,', err))
        
    }
}


export const addFilter = (filter) => {
    
    return {
        type: 'addFilter',
        payload: filter
    }
}

export const filterByName = (name) => {
    return {
        type: 'filterByName',
        payload: name
    }
}

export const getCountryByCode = (code) => {
    return function(dispatch){
        return axios.get(`/countries/${code}` )
        .then( res => {
            dispatch({
                type: 'getCountryByCode',
                payload: res.data
            })
        })
    }     
}

export const clearFilters = () => {
    return {
        type: 'clearFilters'
    }
}

export const clearDetails = () => {
    return {
        type: 'clearDetails'
    }
}

