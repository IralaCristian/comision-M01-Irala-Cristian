import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from './src/settings/config.js';
import { startConnection } from './src/settings/database.js';

//imports de routers
import { authRouter } from './src/routes/auth.routes.js';
import { postRouter } from './src/routes/post.routes.js';
import { authHeader } from './src/models/validations/auth-validation.js';
import { validateToken } from './src/middlewares/validate-token.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(helmet());
app.use(morgan('dev'));

//rutas de la api

//rutas de usuario
app.use('/api/auth', authRouter);
//rutas de posteos
//app.use('api/post/public', postRouterPublic) // Públicas
app.use('/api/post', authHeader, validateToken, postRouter)

app.listen(config.port, async () => {
  await startConnection({ uri: config.mongo, database: config.database });
  console.log('Server is running on port: http://localhost:' + config.port);
});