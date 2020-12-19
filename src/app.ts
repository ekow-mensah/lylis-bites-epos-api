import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import {routes} from './routes/index';

/* mongoose connection */
const connectionString = "mongodb+srv://admin:H2AaoC9JGb1Ca6EE"
  + "@lylis-bites-cluster.ucwb7.mongodb.net/LBDB_TEST1"
  + "?retryWrites=true&w=majority";

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

