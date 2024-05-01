import express from 'express';
import { selectAllItems, selectTypeMax, selectType } from '../database/palyaRequest.js';

const searchview = express.Router();
searchview.use('/', express.urlencoded({ extended: true }));

// KERESES
searchview.post('/', async (req, res) => {
  const maximum = req.body.max;
  const minimum = req.body.min;
  const type = req.body.tipus;
  console.log(maximum, minimum, type);
  let queryRes;
  try {
    if (type !== '' && maximum === '' && minimum === '') {
      queryRes = await selectType(type);
      console.log(queryRes.affectedRows);
    }
    if (type !== '' && maximum !== '' && minimum !== '') {
      queryRes = await selectTypeMax(type, maximum, minimum);
      console.log(queryRes.affectedRows);
    }
    if (type === '' && maximum === '' && minimum === '') {
      queryRes = await selectAllItems();
      console.log(queryRes, 'ok');
    }
    return res.render('viewerPage', { palyak: queryRes[0] });
  } catch (err) {
    console.log(err);
    return 0;
  }
});

export default searchview;
