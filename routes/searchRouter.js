import express from 'express';
import { selectAllItems, selectTypeMax, selectType } from '../database/palyaRequest.js';
import authorize from '../middleware/authorize.js';

const searchRouter = express.Router();
searchRouter.use('/', express.urlencoded({ extended: true }));

// KERESES
searchRouter.post('/', authorize(['admin']), async (req, res) => {
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
    const { username } = req.session;
    return res.render('mainPage', { palyak: queryRes[0], username });
  } catch (err) {
    console.log(err);
    return 0;
  }
});

export default searchRouter;
