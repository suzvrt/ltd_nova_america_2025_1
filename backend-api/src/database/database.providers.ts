import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: 5432,
        username: process.env.API_PG_USER,
        password: process.env.API_PG_PASS,
        database: process.env.API_PG_DB,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
