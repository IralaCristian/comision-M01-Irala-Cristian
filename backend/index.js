import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from './src/settings/config.js';
import { startConnection } from './src/settings/database.js';

import { authRouter } from './src/routes/auth.routes.js';
import { postRouter } from './src/routes/post.routes.js';
import { commentRouter } from './src/routes/comment.routes.js';




const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));
app.use(helmet());
app.use(morgan('dev'));

//Api routes

//Users router
app.use('/api/auth', authRouter);
//Travel posts router
app.use('/api/post', postRouter);
//Comments router
app.use('/api/comment', commentRouter);

app.listen(config.port, async () => {
  await startConnection({ uri: config.mongo, database: config.database });
  console.log('Server is running on port: http://localhost:' + config.port);
});