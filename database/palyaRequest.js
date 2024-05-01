import pool from './connection.js';

export const selectAllItems = () => {
  const query = 'SELECT * FROM palya';
  console.log(query);
  return pool.query(query);
};

export const selectType = (type) => {
  const query = 'SELECT * FROM palya WHERE tipus = ?';
  console.log(query);
  return pool.query(query, [type]);
};
// teljes kereses
export const selectTypeMax = (type, maxi, mini) => {
  const query = 'SELECT * FROM palya WHERE tipus = ? AND oraBer <= ? AND oraBer >= ?';
  console.log(query, [type, maxi]);
  return pool.query(query, [type, maxi, mini]);
};

export const selectMaxMin = (maxi, mini) => {
  const query = 'SELECT * FROM palya WHERE oraBer <= ? AND oraBer >= ?';
  console.log(query, [maxi, mini]);
  return pool.query(query, [maxi, mini]);
};

export const selectTypeMaxMin = (type, maxi, mini) => {
  const query = 'SELECT * FROM palya WHERE tipus = ? AND oraBer >= ? AND oraBer <= ?';
  console.log(query, [type, maxi, mini]);
  return pool.query(query, [type, maxi, mini]);
};

export const insertPalya = (tipus, oraBer, cim, leiras) => {
  // const date = new Date();
  console.log(tipus, oraBer, cim, leiras, '1');
  const query = 'INSERT INTO palya (tipus, oraBer, cim, leiras) VALUES(?, ?, ?, ?)';
  return pool.query(query, [tipus, oraBer, cim, leiras]);
};

export const selectPalyaByID = (palyaID) => {
  console.log(palyaID);
  const query = 'SELECT leiras FROM palya WHERE palyaID = ?';
  return pool.query(query, [palyaID]);
};

export const howMany = () => {
  const query = 'SELECT COUNT(*) AS nr FROM palya';
  console.log(query);
  return pool.query(query);
};
