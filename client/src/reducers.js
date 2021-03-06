
const initialState = {
    countriesfromDB: [],
    filterCountries: [],
    countryDetail: {},
    activities: [],
    filters: {continent: null, activity: null, order:null},
    pages: []
}


const rootReducer = (state = initialState, action ) => {

    if (action.type === 'clearDetails'){
        return {
            ...state,
            countryDetail: {},
        }
    }


    if (action.type === 'clearFilters'){
        return {
            ...state,
            filters:{continent: null, activity: null, order: null}
        }
    }
    
    if (action.type === 'addFilter'){

        const continentfilter = (arr, value) => {
            return arr.filter( c => c.continent === value)    
        }
        
        const activityfilter = (arr, value) => {
           // console.log('activities in filter', state.activities, "value", value)
            let countriesIds = [], returnArr = []        
            
            state.activities.forEach( activity => {
                if (activity.name === value){                
                    countriesIds.push(activity.CountryActivity.countryId)
                }
            })
            //console.log('countries ids are ', countriesIds)

            countriesIds.forEach( id => {
                returnArr.push(arr.find( c => c.id === id))
            }) 
            
            return returnArr.filter(e => e !== undefined)
        }
        
        const orderBy = (arr, value) => {
            
            let ascending = arr.sort((a,b)=>{
                return a.name.localeCompare(b.name)
            })
    
        if (value === 'az'){
            return ascending
        }
            
    
        if (value === 'za'){
            let descending = ascending.reverse()
                return descending
        }
            
    
        if (value === 'populationASC') {
                return arr.sort((a,b) => {
                        if (a.population > b.population) 
                            return 1
                        if (b.population > a.population)
                            return -1
                        else
                            return 0
    
                    })
            }
            
        if (value === 'populationDESC') {
                return arr.sort((a,b) => {
                        if (a.population > b.population) 
                            return -1
                        if (b.population > a.population)
                            return 1
                        else
                            return 0
    
                    })
        }
        }
        
        let countriesToBeReturned = [], filtersToReturn = {continent:null, activity:null, order:null}
        
        const {name, value} = action.payload 
        //console.log('adding filter ', name, 'with value', value)
        
        if (name === 'continent'){           
           // console.log('entering continent')
            
            if (state.filters.activity){     
                if (state.filters.continent){
                   // console.log('continent and activity already set')
                    const filtered = activityfilter(state.countriesfromDB, state.filters.activity)
                    countriesToBeReturned = continentfilter(filtered, value)
                }  else{
                  //console.log('only activity set as', state.filters.activity)                    
                    let filtered = activityfilter(state.countriesfromDB, state.filters.activity)
                 //   console.log('filtered is ', filtered)
                    countriesToBeReturned = continentfilter(filtered, value)
                }             
                
            } else {                
                    countriesToBeReturned = continentfilter(state.countriesfromDB, value)                
            }
            
            if(state.filters.order){
                //console.log('ordering by', state.filters.order)
                countriesToBeReturned = orderBy(countriesToBeReturned, state.filters.order )
            }
            
            //console.log('returning from continent :', countriesToBeReturned)
            filtersToReturn = 
            {...state.filters,
                continent: value
            }
        }

        if (name === 'activity'){          
            //console.log('entering activity', 'value', value)                    
           
            if (state.filters.continent){

                if (state.filters.activity){
              //      console.log('activity and continent are SET')

                    let filtered = continentfilter(state.countriesfromDB, state.filters.continent)
                    countriesToBeReturned = activityfilter(filtered, value)
                } else {
                //    console.log('only continent is set')
                    countriesToBeReturned = activityfilter(state.filterCountries, value)
                }

            } else {
                
                    countriesToBeReturned = activityfilter(state.countriesfromDB, value)

                }            

            //console.log('returning from activity', countriesToBeReturned)
            filtersToReturn = {
                ...state.filters,
                activity: value
            } 
    
            }                          
                          

        if (name === "order") {
            
           //console.log('ordering by', value, "countries are", state.filterCountries)
            
           countriesToBeReturned = orderBy(state.filterCountries, value)
           //console.log('returning from reducer', countriesToBeReturned)
                filtersToReturn = {
                    ...state.filters,
                    order: value
                }
        }
        
       // console.log('filters to return', filtersToReturn)
       // console.log('countries to return', countriesToBeReturned)    
            
        return {
            ...state,
            filterCountries: [...countriesToBeReturned],
            filters: filtersToReturn
                       
        }

    } 

    
    if (action.type === 'getCountries'){ 
       
        return {
            ...state, 
            countriesfromDB: [...action.payload],
            filterCountries: [...action.payload],
          
        }
    }

    if (action.type === 'getActivities'){
       // console.log('gettin activities reducer')                
        return {
            ...state,
            activities: action.payload
        }
    }

    
    if (action.type === 'addActivity'){
              
        return {...state,
                //activities: [...state.activities, action.payload]
                }
    }

    if (action.type === 'filterByName'){

        return {
            ...state,
            filterCountries: state.countriesfromDB.filter( c => c.name.toLowerCase().includes(action.payload.toLowerCase())),
            
        }
    }

    if (action.type === 'getCountryByCode'){
        
        return {
            ...state,
            countryDetail: action.payload.country
        }
    }
   
    
    
    else 
   
        return state

}



export default rootReducer