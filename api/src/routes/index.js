const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const home = require('./countries')
const activities = require('./activities')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/api/', home)
router.use('/api/activity', activities)

module.exports = router;
