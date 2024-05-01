import express from 'express';
import { selectAllItems } from '../database/palyaRequest.js';

const back = express.Router();
back.use('/', express.urlencoded({ extended: true }));
back.get('/', async (req, res) => {
  const queryRes = await selectAllItems();
  res.render('viewerPage', { palyak: queryRes[0] });
});

export default back;
