import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from './src/settings/config.js';
import { startConnection } from './src/settings/database.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(helmet());
app.use(morgan('dev'));



app.listen(config.port, async () => {
  await startConnection({ uri: config.mongo, database: config.database });
  console.log('Server is running on port: http://localhost:' + config.port);
});