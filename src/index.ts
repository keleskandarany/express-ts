require('dotenv').config();
import bodyParser from 'body-parser';
import { AppDataSource } from './ormconfig';
import { container } from './inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';

const server = new InversifyExpressServer(container);
//todo why?
server.setConfig((app) => {
  app.use(bodyParser.json());
});

//todo what does it do?
const app = server.build();

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(8090, () => {
      console.log('Server is running on port 8090');
    });
  })
  .catch((error) => console.log('Database connection error:', error));
