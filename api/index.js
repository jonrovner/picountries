//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require('axios')


// esta función se ejecuta al iniciar el server y se trae los datos de la restapi a la postgres db
async function populateDB() { 
  
  // me traigo todos los paises de la restapi
  let apiCountries = await axios.get('https://restcountries.com/v3/all')
  
  //creo un array de paises para mi db
  let dbCountries = []
  
  //por cada pais que devuelve la api 
    apiCountries.data.forEach( (country) => {                
    
    //agrego un objeto con los datos pertinentes a mi array de paises  
    dbCountries.push(
      {
        name: country.name.common,
        flag: country.flags[0],
        code: country.cca3,
        capital: country.capital ? country.capital[0] : "no capital",
        region: country.subregion ? country.subregion : country.region,
        area: country.area,
        population: country.population,
        continent: country.continents && country.continents[0]
       }
    ) 
  })
  
  // por cada elemento de mi array de paises creo un pais en mi db
  dbCountries.forEach( async dbc => {
    try {       
      const country = await Country.create(dbc)                     
    }
    catch (err) {console.log("ERROR EN LA CREACION DE PAISES  : ", err)}
  }) 
  
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  
  populateDB()
  
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
