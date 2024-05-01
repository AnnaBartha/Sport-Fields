import express from 'express';
import authorize from '../middleware/authorize.js';
import { selectAllItems } from '../database/palyaRequest.js';

const visszadiakR = express.Router();

visszadiakR.get('/', authorize(['diak']), async (req, res) => {
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

export default visszadiakR;
