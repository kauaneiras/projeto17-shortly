import { connection } from '../db/database.js'; 
import bcrypt from 'bcrypt';

export async function signupcontroller(req, res){
    const { name, email, password, confirmPassword } = req.body;
    const passwordhash = bcrypt.hashSync(password, 10);
    try {
        await connection.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)`, [name, email, passwordhash])
            res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send(error);
    }
}