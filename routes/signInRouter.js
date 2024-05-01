import express from 'express';
import bcrypt from 'bcrypt';
import { userek, beszur } from '../database/felhasznaloRequest.js';

const logRouter = express.Router();
logRouter.use(express.urlencoded({ extended: false }));
logRouter.get('/', express.urlencoded({ extended: true }), (req, res) => {
  try {
    return res.render('signUp');
  } catch (err) {
    console.log(err);
    return 0;
  }
});

logRouter.post('/', async (req, res) => {
  try {
    // hash-elem a megadott jelszot es ugy mentem le
    // szintaxis: a jelszo + a sozasok szama: minnel nagyobb annal lassabb de JOBB safe-ebb
    const hashedPW = await bcrypt.hash(req.body.password, 10);
    // // eltarolom egy lokalis helyen
    // // megprobalom beszurni az adatbazisba az uj felhasznalot
    const [header] = await beszur(req.body.username, hashedPW);
    console.log(`Inserted request. Affected rows: ${header.affectedRows}`);

    // // megprobalom kilistazni az adatbazis elemeit
    const all = await userek();
    console.log(all[0]);
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
});

export default logRouter;
