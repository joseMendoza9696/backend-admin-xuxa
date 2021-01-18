const express = require('express');
const router = new express.Router();
const moment = require('moment');
moment.locale('es');
const empleadoAuth = require('../middleware/empleadoAuth');
const { login, logout,
    tesisWeb, robots, flagRobots, webDELETE
} = require('../controllers/empleado.controller');


router.post('/emp/login', login );

router.post('/emp/logout', empleadoAuth, logout );

// esta parte se va a eliminar solo es para la tesis
router.get('/tesis/web-robots', tesisWeb)
router.get('/robots.txt', robots)
router.get('/59gt1', flagRobots)

router.get('/tesis/web-put', webDELETE)
router.patch('/tesis/web-put', webDELETE)
router.put('/tesis/web-put', webDELETE)
router.post('/tesis/web-put', webDELETE)
router.delete('/tesis/web-put', webDELETE)

module.exports = router;

