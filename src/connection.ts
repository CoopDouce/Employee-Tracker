import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 5432
});

const connectToDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
};

export { connectToDB, pool };