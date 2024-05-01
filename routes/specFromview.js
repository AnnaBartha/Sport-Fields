import express from 'express';
import { fogalas } from '../database/foglalasRequest.js';
import { kepek } from '../database/fenykepRequest.js';
import { userek } from '../database/felhasznaloRequest.js';

const specFromView = express.Router();
specFromView.get('/', express.urlencoded({ extended: true }), async (req, res) => {
  const { azonosito } = req.query;
  console.log(azonosito);
  try {
    const foglalAdat = await fogalas(azonosito);
    const kepAdat = await kepek(azonosito);
    const felhasznalok = await userek();
    console.log(felhasznalok[0]);
    return res.render('palyaSpecFromView', {
      fenykep: kepAdat[0],
      username: foglalAdat[0],
      azonosito,
      felhasznalok: felhasznalok[0],
    });
  } catch (err) {
    console.log(err);
    return 0;
  }
});

export default specFromView;
