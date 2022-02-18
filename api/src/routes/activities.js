const { Country, Activity } = require('../db')
const router = require('express').Router()

router.post('/', async (req, res) => {
    console.log("entering post")

    const { countries, name, difficulty, duration, season } = req.body
    
    try{
        const activity = await Activity.create({
            name,
            difficulty,
            duration,
            season,      
        })      

        console.log("CREATED ACTIVITY", activity.name)
        
        let countiresDb = []         
        
        countries.forEach( async country => {
            
            try{
                let countryDb = await Country.findOne({
                    where:{
                        name: country
                    }
                })
                //console.log('FOUND COUNTRY', countryDb.name)
                countiresDb.push(countryDb)
                await countryDb.addActivity(activity)
            
            } catch (err) {
               
                console.log('ERROR FINDING COUNTRY', err)
            
            }    
    
        })         
        
        res.json(activity)   

    } catch (err){
        console.log('ERROR ADDING ACTIVITY', err)
    }   
 })

module.exports = router

