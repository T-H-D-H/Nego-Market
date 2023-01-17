// import mysql from "mysql2";
const mysql = require('mysql2/promise');
import "dotenv/config";

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

export default pool;
