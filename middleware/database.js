import nextConnect from 'next-connect';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE || 'phone_numbers'
});

async function database(req, res, next) {
    req.db = connection;
    req.tableName = process.env.DATABASE_TABLE || 'users';
    return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
