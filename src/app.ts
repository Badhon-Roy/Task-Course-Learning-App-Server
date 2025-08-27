import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app : Application = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// application related api
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);


app.get('/', (req: Request, res: Response) => {
    res.send('Course Learning App Server is running');
});

export default app;