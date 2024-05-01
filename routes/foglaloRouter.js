import express from 'express';
import { foglalasInsert } from '../database/foglalasRequest.js';
import { felhasznaloID } from '../database/felhasznaloRequest.js';

const foglalRouter = express.Router();
foglalRouter.use('/', express.urlencoded({ extended: true }));

foglalRouter.post('/', async (req, res) => {
  const { azonosito } = req.query;
  // console.log('SZIA DANIEL');
  const { ora } = req.body;
  const { username } = req.body;
  try {
    console.log(username);
    const felhID = await felhasznaloID(username);
    console.log(felhID[0][0].felhID);
    const message = await foglalasInsert(ora, azonosito, felhID[0][0].felhID);
    console.log(message);
    return res.render('correct', { valtozoutvonal: `/specifikus?azonosito=${azonosito}` });
  } catch (err) {
    console.log(err);
    return 0;
  }
});

export default foglalRouter;
