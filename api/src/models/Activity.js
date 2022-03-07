
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }, 
    difficulty: {
        type: DataTypes.INTEGER
    },
    duration: {
        type: DataTypes.STRING
        
    },
    season: {
        type: DataTypes.ENUM('winter', 'spring', 'summer', 'fall')
    }
    
  }, {timestamps: false});
  
};
