import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { ApiResponseMiddleware, errorHandlerMiddleware } from './middlewares/index';
import { getEnvVariable } from '../utility/index';
import Router from './routes/index';

dotenv.config();

const app = express();

// Middlewares globaux
app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.headers['access-control-request-private-network'] === 'true') {
        res.setHeader('Access-Control-Allow-Private-Network', 'true');
    }
    next();
});

// Autoriser toutes les origines (répond avec l'origine demandée) et permettre les credentials
app.use(cors({ origin: true, credentials: true }));
app.use(ApiResponseMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use('/api', Router);

// Middleware d'erreur 
app.use(errorHandlerMiddleware);

const PORT = getEnvVariable('PORT') || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api/doc`);
});