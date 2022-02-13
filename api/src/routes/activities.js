const { Country, Activity } = require('../db')
const router = require('express').Router()

router.post('/', async (req, res) => {
    console.log("entering post")
    
    const { country, name, difficulty, duration, season } = req.body
    
    const countryFromDB = await Country.findOne({
        where:{
            name: country
        }
    })
    
    const activity = await Activity.create({
        name,
        difficulty,
        duration,
        season,      
    })
    console.log(activity)
    await countryFromDB.addActivity(activity)
    await activity.addCountry(countryFromDB)    
 })

module.exports = router