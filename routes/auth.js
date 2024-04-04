const { Router } = require('express');
const { newUser, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validation-field');
const { validateJWT } = require('../middlewares/validation-jwt');
const router = Router();

router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    validarCampos


], newUser);

router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    validarCampos

], login);

router.get('/renew', validateJWT, renewToken);

module.exports = router;