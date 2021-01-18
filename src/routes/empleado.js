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

router.get('/tesis/web-erase', webDELETE)
router.patch('/tesis/web-erase', webDELETE)
router.put('/tesis/web-erase', webDELETE)
router.post('/tesis/web-erase', webDELETE)
router.delete('/tesis/web-erase', webDELETE)

module.exports = router;

