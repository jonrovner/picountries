const { Country, Activity } = require('../db')
const router = require('express').Router()

router.get('/countries', async (req, res) => {
    let {name} = req.query
    let countries = await Country.findAll({include: Activity, order: [['name', 'ASC']]})
    
    if (!name) return res.json(countries)
    let country = await Country.findOne({
        where: {
            name: name
        },        
    })
    let activities = await country.getActivities()
    res.json({...country, ...activities})
 })

 router.get('/countries/:idPais', async (req, res) => {
    const {idPais} = req.params
    const country = await Country.findOne({
        where: {
            code: idPais
        },
        include: Activity
    })
    console.log('COUNTRY FROM DB :', country)
    res.json({country})
    
 })

module.exports = router

