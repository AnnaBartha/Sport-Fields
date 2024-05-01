import pool from './connection.js';

export const userek = () => {
  const query = 'SELECT felhID,username,password FROM felhasznalo';
  console.log(query);
  return pool.query(query);
};

export const felhasznaloID = (username) => {
  const query = 'SELECT felhID FROM felhasznalo WHERE username = ?';
  console.log(query);
  return pool.query(query, [username]);
};

export const beszur = (username, password) => {
  const query = "INSERT INTO felhasznalo (hataskor,username,password) VALUES('diak',?,?)";
  console.log(query);
  return pool.query(query, [username, password]);
};

export const signIn = (username) => {
  const quey = 'SELECT password FROM felhasznalo WHERE username = ?';
  console.log(quey);
  return pool.query(quey, [username]);
};

export const role = (username) => {
  const quey = 'SELECT hataskor FROM felhasznalo WHERE username = ?';
  console.log(quey);
  return pool.query(quey, [username]);
};

export const changePW = (username, password) => {
  const query = 'UPDATE felhasznalo SET password = ? WHERE username = ?';
  console.log(query);
  return pool.query(query, [password, username]);
};

export const selectAll = () => {
  const query = "SELECT * FROM felhasznalo WHERE hataskor <> 'admin'";
  console.log(query);
  return pool.query(query, []);
};

export const deleteByName = (username) => {
  const query = 'DELETE FROM felhasznalo WHERE username = ?';
  console.log(query);
  return pool.query(query, [username]);
};
