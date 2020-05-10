import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

export const handler = nextConnect();
handler.use(middleware);


handler.get((req, res) => {
    const sql = `SELECT * FROM ${req.tableName} WHERE id = ?`
    req.db.query(sql, [req.query.id], (err, result) => {
      if (err) throw err;
      res.status(200).json(result[0])
    })
});

handler.post((req, res) => {
  const { id, name, phone } = req.body;
  const sql = `INSERT INTO ${req.tableName} (id, name, phone) VALUES(?, ?, ?)`;
  req.db.query(sql, [id, name, phone], (err, result) => {
      if (err) throw err;
      res.status(200).json({message: 'record created'})
  })
});

handler.put((req, res) => {
  const { id, name, phone } = req.body;
  const sql = `UPDATE ${req.tableName} SET name = ?, phone = ? WHERE id = ?;`;
  req.db.query(sql, [name, phone, id], (err) => {
      if (err) throw err;
      res.status(200).json({message: 'record updated'})
  })
});

handler.delete((req, res) => {
  const { id } = req.body;
  const sql = `DELETE FROM ${req.tableName} WHERE id = ?;`;
  req.db.query(sql, [id], (err) => {
      if (err) throw err;
      res.status(200).json({message: 'record deleted'})
  })
});

export default (req, res) => handler.apply(req, res)