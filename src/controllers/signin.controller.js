import { connection } from '../db/database.js';
import { v4 as uuid } from 'uuid';

export async function signincontroller(req, res) {
    const { email, password } = req.body;
    try{
        const user = await connection.query(`SELECT * FROM users WHERE users."email" = ($1)`, [email])
        const usertable = user.rows[0];
        const id = usertable.id;
        const name = usertable.name;
        const token = uuid();
        await connection.query(`INSERT INTO sections ("userId", token) VALUES ($1, $2)`, [id, token])
        res.status(200).send({name, token})
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}