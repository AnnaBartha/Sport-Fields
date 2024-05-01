import express from 'express';
import authorize from '../middleware/authorize.js';
import { selectall } from '../database/foglalasRequest.js';

const allreservations = express.Router();
allreservations.use(express.urlencoded({ extended: false }));
allreservations.get('/', authorize(['admin']), async (req, res) => {
  try {
    const { username } = req.session;
    // lekerem az osszes foglalast
    const all = await selectall(username);
    console.log(all[0]);
    return res.render('allreservations', { foglalasok: all[0], username });
    // return res.render('allreservations');
  } catch (err) {
    console.log(err);
    return 0;
  }
});
export default allreservations;
