const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    //leer token

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en el request'
        });
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });
    }

   
}


module.exports = {
    validateJWT
}