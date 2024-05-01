import express from 'express';
import authorize from '../middleware/authorize.js';
import { selectAllforUser, fogalas, diakfoglal } from '../database/foglalasRequest.js';
import { howMany, selectAllItems } from '../database/palyaRequest.js';

const diakFoglalRouter = express.Router();
diakFoglalRouter.use(express.urlencoded({ extended: false }));

diakFoglalRouter.get('/', authorize(['diak']), async (req, res) => {
  try {
    // lekerem a user nevet a sessionbol hogy ki tudjam irni az oldalra, hogy ki van bejelentkezve
    const { username } = req.session;
    // lekerem az osszes foglalast
    const all = await selectAllforUser(username);
    console.log(all[0]);
    return res.render('diakFoglalas', { foglalasok: all[0], username });
  } catch (err) {
    console.error(err);
    return 0;
  }
});

function validate(hour, day, month, pid) {
  if (hour < 0 || day < 0 || month < 0 || pid <= 0) {
    return false;
  }
  if (hour > 23 || day > 7 || month > 12) {
    return false;
  }
  if (hour === '' || day === '' || month === '' || pid === '') {
    return false;
  }
  return true;
}

diakFoglalRouter.post('/', authorize(['diak']), async (req, res) => {
  const { hour, day, month, pid } = req.body;
  const { username } = req.session;
  const palyaknr = await howMany();
  const palyakSzama = palyaknr[0][0].nr;
  let baj = false;
  const honapINT = parseInt(month, 10);
  const napINT = parseInt(day, 10);
  const oraINT = parseInt(hour, 10);
  const pidINT = parseInt(pid, 10);
  console.log(palyakSzama);
  const all1 = await selectAllforUser(username);
  if (!validate(hour, day, month, pid) || pid > palyakSzama) {
    // ha a user altal bevitt adatok nem validak
    // ha olyan palyara probalunk hovatkozni ami nem letezik az adatbazisban
    res.render('diakFoglalas', { foglalasok: all1[0], username });
  } else {
    // az adatok validok, azonban ellenorizni kell, hogy mas foglalast ne usson
    const foglalasiadatok = await fogalas(pid);
    let i = 0;
    for (i = 0; i < foglalasiadatok[0].length && !baj; i++) {
      // console.log('bent');
      const segedhonap = foglalasiadatok[0][i].honap;
      const segednap = foglalasiadatok[0][i].nap;
      const segedora = foglalasiadatok[0][i].ora;
      if (
        segedhonap === honapINT &&
        segednap === napINT &&
        (segedora === oraINT + 1 || segedora === oraINT - 1 || segedora === oraINT)
      ) {
        console.log('baj van a foglalassal');
        baj = true;
        res.render('diakFoglalas', { foglalasok: all1[0], username });
      }
    }
    if (!baj) {
      const foglaldb = await diakfoglal(oraINT, napINT, honapINT, pidINT, username);
      console.log(foglaldb);
      const all = await selectAllItems();
      res.render('diakView', { palyak: all[0], username });
    }
  }
});

export default diakFoglalRouter;
