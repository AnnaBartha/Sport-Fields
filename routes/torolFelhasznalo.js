import express from 'express';
import authorize from '../middleware/authorize.js';
import { deleteFromName } from '../database/foglalasRequest.js';
import { deleteByName } from '../database/felhasznaloRequest.js';

const torolFelhasznalo = express.Router();
torolFelhasznalo.use('/', express.urlencoded({ extended: true }));

torolFelhasznalo.get('/', authorize(['admin']), async (req, res) => {
  const id = req.query;
  // ahhoz, hogy egy adott nevu felhasznalot torolni tudjak eloszor a foglalasait kell torolnom
  const torol = await deleteFromName(id.azonosito);
  // torlom a felhasznalot is
  const torolVegleg = await deleteByName(id.azonosito);
  console.log(torol);
  console.log(torolVegleg);
  res.redirect('/adminview');
});

export default torolFelhasznalo;
