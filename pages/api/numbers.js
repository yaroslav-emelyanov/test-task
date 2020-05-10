import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();
handler.use(middleware);


handler.get((req, res) => {
    const sql = `SELECT * FROM ${req.tableName}`
    req.db.query(sql, (err, result) => {
       if (err) throw err
       res.json(result)
    });
});

export default (req, res) => handler.apply(req, res);