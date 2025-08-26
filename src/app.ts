import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes';

const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// application related api
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
    res.send('Course Learning App Server is running');
});

export default app;