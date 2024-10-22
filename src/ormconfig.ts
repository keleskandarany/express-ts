import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'express',
  synchronize: true,
  logging: false,
  entities: ['dist/models/**/*{.js,.ts}'],
  migrations: ['dist/migrations/**/*{.js,.ts}'],
  subscribers: ['dist/subscribers/**/*{.js,.ts}'],
});
