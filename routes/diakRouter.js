import express from 'express';
import { selectAllItems, selectTypeMax, selectType } from '../database/palyaRequest.js';
import authorize from '../middleware/authorize.js';

const diakR = express.Router();
diakR.use(express.urlencoded({ extended: false }));
diakR.get('/', express.urlencoded({ extended: true }), authorize(['diak']), async (req, res) => {
  try {
    const all = await selectAllItems();
    const { username } = req.session;
    // console.log('HELLOUUU ');
    // console.log(username);
    return res.render('diakView', { palyak: all[0], username });
    // return res.render('mainPage', { palyak: all[0] });
  } catch (err) {
    console.log(err);
    return 0;
  }
});

diakR.post('/', authorize(['diak']), async (req, res) => {
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
    return res.render('diakView', { palyak: queryRes[0], username });
  } catch (err) {
    console.log(err);
    return 0;
  }
});

export default diakR;
