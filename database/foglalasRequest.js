import pool from './connection.js';

export const fogalas = (playaID) => {
  const query = 'SELECT * FROM foglalas WHERE palyaID = ?';
  console.log(query, [playaID]);
  return pool.query(query, [playaID]);
};

export const foglalasInsert = (ora, palyaID, felhID) => {
  const query = 'INSERT INTO foglalas (ora, palyaID, felhID) VALUES(?, ?, ?)';
  console.log(query);
  return pool.query(query, [ora, palyaID, felhID]);
};

export const selectAllforUser = (username) => {
  const query = 'SELECT * FROM foglalas WHERE username = ? ';
  console.log(query);
  return pool.query(query, [username]);
};

export const selectall = () => {
  const query = 'SELECT * FROM foglalas';
  console.log(query);
  return pool.query(query, []);
};

export const diakfoglal = (ora, nap, honap, palyaID, username) => {
  const qurey = 'INSERT INTO foglalas(ora,nap,honap,palyaID,username) values(?,?,?,?,?)';
  console.log(qurey);
  return pool.query(qurey, [ora, nap, honap, palyaID, username]);
};

export const deleteFrom = (foglalasID) => {
  const query = 'DELETE FROM foglalas WHERE foglalasID = ?';
  console.log(query);
  return pool.query(query, [foglalasID]);
};

export const deleteFromName = (username) => {
  const query = 'DELETE FROM foglalas WHERE username = ?';
  console.log(query);
  return pool.query(query, [username]);
};
