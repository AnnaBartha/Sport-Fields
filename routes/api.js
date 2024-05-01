import express from 'express';
import * as db from '../database/palyaRequest.js';
import * as kepek from '../database/fenykepRequest.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();

router.get('/getLeiras/:id', (req, res) => {
  // egy get keresre varakozok
  const { id } = req.params; // lekerem a parameter kozul az id-t
  db.selectPalyaByID(id) // a select-em segitsegevel lekerem az adott id-ju elem leirasat
    .then((leiras) => (leiras ? res.json(leiras) : res.status(404).json({ message: `palya with id ${id} not found.` }))) // visszakulom vagy error
    .catch((err) => res.status(500).json({ message: `Error  ${id}: ${err.message}` }));
});

router.delete('/delete/:id', authorize(['admin']), (req, res) => {
  console.log(req);
  const { id } = req.params;
  console.log('api');
  kepek
    .deleteByID(id)
    .then((rows) => (rows ? res.sendStatus(204) : res.status(404).json({ message: `Photo with ID ${id} not found.` })))
    .catch((err) => res.status(500).json({ message: `Error while deleting photo with ID ${id}: ${err.message}` }));
});

export default router;
