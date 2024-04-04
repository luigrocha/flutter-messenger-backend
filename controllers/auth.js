const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const newUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existEmail = await User.findOne({ email });

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }
        const user = new User(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generar token
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

};

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'El correo no encontrado'
            });
        }

        // validar password

        const validatePassword = bcrypt.compareSync(password, user.password);

        if (!validatePassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });

        }

        // Generar token
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador - error login'
        });

    }

};

const renewToken = async (req, res = response) => {

    const { uid } = req.body;

    const user = await User.findOne({ uid });

    // Generar token
    const token = await generateJWT(user.id);
    res.json({
        ok: true,
        user,
        token
    });

};

module.exports = {
    newUser,
    login,
    renewToken
};