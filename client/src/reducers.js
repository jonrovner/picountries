
const initialState = {
    countriesfromDB: [],
    filterCountries: [],
    showingCountries: [],
    countryDetail: {},
    activities: [],
    activityNames: [],
    offset: -1,
    pages: 0,
    filters: {continent: "", activity: ""}
}


const rootReducer = (state = initialState, action ) => {
    
    if (action.type === 'setFilter'){
        const {name, value} = action.payload
        
        if (name === 'continent'){


        }

    
    }
    
    if (action.type === 'getCountries'){ 

        let activitiesdb = action.payload.map( c => c.activities)        
        let activities = activitiesdb.filter(a => a.length>0).flat()
        let activityNames = activities.map( a => a.name)
        let pages = paginate(action.payload)    
        return {
            ...state, 
            countriesfromDB: [...action.payload],
            filterCountries: [...action.payload],
            pages,
            
            //pages: new Array( Math.ceil((action.payload.length-9)/10)).fill([]),
            activities,
            activitieNames: [...new Set(activityNames)]

        }
    }

    if (action.type === 'setFirstCountries'){
    
        return {
            ...state, 
            showingCountries: [...state.filterCountries.slice(0,9)]
        }
    }

    if (action.type === 'setCountries') {
        console.log('SETING PAGE', action.paload)

        return {
            ...state,
            showingCountries: [...state.filterCountries.slice(action.payload, action.payload+10)]
        }
    }

    if (action.type === 'getFirstNine'){
        return {
            ...state,
            showingCountries: [...state.filterCountries.slice(0,9)]
        }
    }

    if (action.type === 'addActivity'){
              
        return {...state,
                activities: [...state.activities, action.payload]
                }
    }

    if (action.type === 'filterByName'){

        return {
            ...state,
            filterCountries: state.countriesfromDB.filter( c => c.name.toLowerCase().includes(action.payload.toLowerCase())),
            showingCountries: state.filterCountries.slice(0,9)
        }
    }
    
    if (action.type === 'filterByContinent'){        
        
        if (action.payload === "none" ){
                        
            return{
                ...state,
                filterCountries: [...state.countriesfromDB],
                offset: -1,
                pages: [...paginate(state.countriesfromDB)]

            }
        }
       
        let filterCountries = [...state.countriesfromDB.filter( c => c.continent === action.payload )]
       // console.log('filtered by continent length', filterCountries.length)
        let pages = paginate(filterCountries)
       // console.log('pages filtered', pages)

        return {
            ...state,            
            filterCountries,
            showingCountries: [...state.filterCountries.slice(0,9)],
            pages
        }
    }

    if (action.type === 'getCountryByCode'){
        
        return {
            ...state,
            countryDetail: action.payload.country
        }
    }

    if (action.type === 'filterByActivity'){

        let countriesIds = [] 
        
        state.activities.forEach(a => {
            if (a.name === action.payload){
            countriesIds.push(a.CountryActivity.countryId)
            }
        })
        
        let toShow = []
        countriesIds.forEach( id => {
            toShow.push(state.filterCountries.find( c => c.id === id))
        })
        
        return {...state,
                showingCountries: [...toShow.slice(0,9)],
                pages: [...paginate(toShow)]
            }
    }
    
    else 
   
        return state

}

function paginate(countries){
    let offset = -1
    let pages = [...new Array( Math.ceil((countries.length - 9)/10) )
        .fill([])
        .map( page => {
            offset+=10
            return offset
        })
    ] 
    return pages   

}

export default rootReducer