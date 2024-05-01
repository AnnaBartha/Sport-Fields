import express from 'express';
import { insertPalya } from '../database/palyaRequest.js';

const palyaRouter = express.Router();

palyaRouter.use('/', express.urlencoded({ extended: true }));

function OraberValidation(oraBer) {
  const seged = oraBer;
  let i = seged.length;
  // vegig megyek a stringen, ha kapok nem szam elemet akkor ez egy hibas adat
  while (i) {
    console.log(i > 0);
    if (seged[i - 1] <= '9' && seged[i - 1] >= '0') {
      console.log(i);
      console.log(seged[i]);
      i--;
    } else {
      return false;
    }
  }
  return true;
}

// PALYAK adatok fogadasa
palyaRouter.post('/', express.urlencoded({ extended: true }), async (req, res) => {
  const { tipus, oraBer, cim, leiras } = req.body;
  // Adatok validalasa:
  // egyik mezo sem maradhat uresen
  if (tipus === '' || oraBer === '' || cim === '' || leiras === '') {
    res.send('<h1>HIBA: egyik mezo sem maradhat uresen</h1>');
    return;
  }
  // az oraber csak szam lehet
  if (!OraberValidation(oraBer)) {
    res.send(`<h1>HIBA: Az oraber mezo egy pozitiv szam kell legyen ${typeof oraBer} </h1>`);
    return;
  }
  // az oraber nem lehet egy negativ ertek
  if (oraBer < 0) {
    res.send('<h1>HIBA: Az oraber mezo egy pozitiv szam kell legyen</h1>');
    return;
  }
  try {
    const [header] = await insertPalya(tipus, oraBer, cim, leiras);
    console.log(`Inserted request. Affected rows: ${header.affectedRows}`);
    res.redirect('/adminview');
  } catch (err) {
    console.log(err);
  }
  // res.send('<h1>sikeres</h1>');
});
export default palyaRouter;
