import dotenv from 'dotenv';

dotenv.config();

const config = {
 dev: process.env.NODE_ENV !== 'production',
 port: process.env.API_PORT || '3001',
 host: process.env.API_host || 'localhost',
 cors: process.env.CORS || '*',
 mongo_user: process.env.MONGO_USER,
 mongo_password: process.env.MONGO_PASSWORD,
 mongo_db: process.env.MONGO_DB
};

export default config;