import express from 'express';
import { deleteFrom } from '../database/foglalasRequest.js';
import authorize from '../middleware/authorize.js';
import { selectAllItems } from '../database/palyaRequest.js';

const foglalasTorloRouter = express.Router();

foglalasTorloRouter.get('/', authorize(['diak']), async (req, res) => {
  const { azonosito } = req.query;
  console.log(azonosito);
  const azonositoINT = parseInt(azonosito, 10);
  const torol = await deleteFrom(azonositoINT);
  console.log(torol);
  const all = await selectAllItems();
  const { username } = req.session;
  // console.log('HELLOUUU ');
  // console.log(username);
  return res.render('diakView', { palyak: all[0], username });
  // res.render()
  // res.send('<h1>hy</h1>');
});

export default foglalasTorloRouter;
