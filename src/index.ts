import express from 'express';
import apiRoutes from './routes/api';
import bodyParser from 'body-parser';
import { AppDataSource } from './ormconfig';

const app = express();

app.use(bodyParser.json());

app.use('/api', apiRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    // Start the server after the database connection is established
    app.listen(8090, () => {
      console.log('Server is running on port 8090');
    });
  })
  .catch((error) => console.log('Database connection error:', error));
