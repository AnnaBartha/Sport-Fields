import mysql from 'mysql2';
// adatbazishoz kapcsolodok: megteremtem a kapcsolatot mintolyan
// kapcsolat a szerver oldali alkalmazas es a db kozott
const pool = mysql
  .createPool({
    // a kapcsolathoz szukseges konfiguraciok:
    connectionLimit: 10, // az egyszerre letezo max kapcsolatok szama
    database: 'baim2115', // az adatbazik neve amihez kapcsolodni szeretnek
    host: '127.0.0.1', // adatbazik szerver eleresi cime
    port: 3306, // port nr
    user: 'anna', // az adatbazik felhasznalo neve
    password: 'AnAn', // az ab felhasznalojanak jelszava (bomba biztos es feltorhetetlen!)
  })
  .promise();
/* 
exportalom a pool valtozot, annak erdekeben
hogy mas modulok importalhassak es hasznalhassak
 */
export default pool;
