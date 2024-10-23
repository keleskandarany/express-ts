import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: ['dist/models/**/*{.js,.ts}'],
  migrations: ['dist/migrations/**/*{.js,.ts}'],
  subscribers: ['dist/subscribers/**/*{.js,.ts}'],
});
