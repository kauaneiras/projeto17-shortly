//import Node modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//import routes
import { signuprouter } from './routes/signup.router.js';

// dotenv config
dotenv.config();

// app use the modules
const app = express();
app.use(cors());
app.use(express.json());

// app use the routes
app.get('/', (req, res) => {res.send('Hello World!');});
app.use(signuprouter);


// app connection 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
    }
);