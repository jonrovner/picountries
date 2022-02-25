const { Country, Activity } = require('../db')
const router = require('express').Router()

router.post('/', async (req, res) => {
    console.log("entering post")

    const { countries, name, difficulty, duration, season } = req.body
    
    try {
        const activity = await Activity.create({
            name,
            difficulty,
            duration,
            season,      
        })      
        console.log("CREATED ACTIVITY", activity.name)       
        
        countries.forEach( async countryName => {
            
            try{
                let countryDb = await Country.findOne({
                    where:{
                        name: countryName
                    }
                })
                //console.log('FOUND COUNTRY', countryDb.name)
                
                await countryDb.addActivity(activity)
            
            } catch (err) {
               
                console.log('ERROR FINDING COUNTRY', err)
            
            }    
    
        })         
        
        res
        .status(201)
        .json(activity)   

    } catch (err){
        console.log('ERROR ADDING ACTIVITY', err)
        res.status(500).json(err)
    }   
 })

module.exports = router

