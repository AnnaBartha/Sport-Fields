import pool from './connection.js';

export const kepek = (playaID) => {
  const query = 'SELECT * FROM fenykep WHERE azonosito = ?';
  console.log(query, [playaID]);
  return pool.query(query, [playaID]);
};

export const insertImg = (azonosito, files) => {
  console.log(azonosito, files, '2');
  const query = 'INSERT INTO fenykep (files, azonosito) VALUES(?, ?)';
  console.log(query);
  return pool.query(query, [files, azonosito]);
};

export const deleteByID = (kepID) => {
  console.log(kepID);
  const query = 'DELETE FROM fenykep WHERE kepID = ?';
  console.log(query);
  return pool.query(query, [kepID]);
};
