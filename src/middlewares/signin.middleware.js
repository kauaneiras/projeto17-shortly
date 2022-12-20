import joi from 'joi';
import { connection } from '../db/database.js';
import bcrypt from 'bcrypt';

export async function signinmiddleware(req, res, next) {
    const { email, password } = req.body;
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(422).send(error.details[0].message);
    }
    try {
        const user = await connection.query(` SELECT * FROM users WHERE email = $1`, [email]);
        if (user.rowCount === 0) {
            return res.status(401).send('User not found');
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordCorrect) {
            return res.status(401).send('Password incorrect');
        }
    } catch (error) {
        return res.status(500).send(error);
    }
    next();
}