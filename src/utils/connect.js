import pkg from "pg";
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool, Client } = pkg;

const db_name = process.env.DB_NAME;
const db_port = process.env.DB_PORT;
const db_user = process.env.DB_USER;
const bd_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;

export const dbConfig={
    host: db_host,
    port: db_port,
    database: db_name,
    user: db_user,
    password: bd_password,
};

export const  pool = new Pool(dbConfig);
const client = new pg.Client(dbConfig);

export default client;