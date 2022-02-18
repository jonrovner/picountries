
const initialState = {
    countriesfromDB: [],
    filterCountries: [],
    showingCountries: [],
    countryDetail: {},
    activities: [],
    activityNames: [],
    offset: -1,
    pages: 0
}


const rootReducer = (state = initialState, action ) => {
    
    if (action.type === 'getCountries'){ 

        let activitiesdb = action.payload.map( c => c.activities)        
        let activities = activitiesdb.filter(a => a.length>0).flat()
        console.log("activities in reducer", activities)
        
        let activityNames = activities.map( a=> a.name)

        return {
            ...state, 
            countriesfromDB: [...action.payload],
            filterCountries: [...action.payload],
            pages: new Array( Math.ceil((action.payload.length-9)/10)).fill([]),
            activities: [...activities],
            activitieNames: [...new Set(activityNames)]

        }
    }

    if (action.type === 'setFirstCountries'){
        
        let indexes = state.pages.map( page => {
            state.offset+=10
            return [state.offset]
        }) 

        return {
            ...state, 
            showingCountries: [...state.filterCountries.slice(0,9)],
            pages: [...indexes] }
    }

    if (action.type === 'setCountries') {
        return {
            ...state,
            showingCountries: [...state.countries.slice(action.payload[0], action.payload[0]+10)]
        }
    }

    if (action.type === 'getFirstNine'){
        return {
            ...state,
            showingCountries: [...state.countries.slice(0,9)]
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
            filterCountries: state.filterCountries.filter( c => c.name.toLowerCase().includes(action.payload.toLowerCase())),
            showingCountries: state.countries.slice(0,9)
        }
    }
    
    if (action.type === 'filterByContinent'){        
        
        if(action.payload === "none" ){
            let pageslength = state.countriesfromDB.length
            let newOffset = -1
                        
            return{
                ...state,
                filterCountries: [...state.filterCountries],
                offset: -1,
                pages: [...new Array( Math.ceil((pageslength-9)/10) )
                    .fill([])
                    .map( page => {
                        newOffset+=10
                        return [newOffset]
                    })
                ]

            }
        }
                
        const pageslength = [...state.countriesfromDB.filter( c => c.continent === action.payload )].length        
        let newOffset = -1
        return {
            ...state,            
            filterCountries: [...state.filterCountries.filter( c => c.continent === action.payload )],
            showingCountries: [...state.filterCountries.slice(0,9)],
            offset: -1,
            pages: [...new Array( Math.ceil((pageslength-9)/10) )
                .fill([])
                .map( page => {
                    newOffset+=10
                    return [newOffset]
                })
            ]
        }
    }

    if (action.type === 'getCountryByCode'){
        
        return {
            ...state,
            countryDetail: {...action.payload.country}
        }
    }

    if (action.type === 'filterByActivity'){

        //let newCountries = [...state.showingCountries.filter( country => country.activities).flat()]
        let countriesIds = [] 
        state.activities.forEach(a => {
            if (a.name === action.payload){
            countriesIds.push(a.CountryActivity.countryId)
            }
        })
        console.log('countriesIds', countriesIds)
        let toShow = []
        countriesIds.forEach( id => {
            toShow.push(state.filterCountries.find( c => c.id === id))
        })
        
        console.log('countries to show', toShow)

        return {...state,
                filterCountries: [...toShow]    
            }
    }
    
    else 
   
        return state

}

export default rootReducer