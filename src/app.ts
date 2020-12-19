import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import {routes} from './routes/index';

/* mongoose connection */
const connectionString = "[ConnectionString];

mongoose.connect(connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {

  console.log('connected to database');
  
  const port = 3000;
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(json());
  
  app.use("/", routes);

  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
  
});

