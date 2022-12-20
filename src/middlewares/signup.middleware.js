import joi from 'joi';
import { connection } from '../db/database.js';

export async function signupmiddleware (req, res, next){
    const { name, email, password, confirmPassword } = req.body;

    const schema = joi.object({
        name: joi.string().min(2).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(30).required(),
        confirmPassword: joi.ref('password')
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    try {
        const emailalreadyexists = await connection.query(` SELECT * FROM users WHERE email = $1` , [email]);
        if (emailalreadyexists.rowCount > 0) {
            return res.status(409).send('Email already exists');
        }
    } catch (error) {
        return res.status(500).send(error);
    }

    next();
}
