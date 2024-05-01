import express from 'express';
import authorize from '../middleware/authorize.js';
import { selectAll } from '../database/felhasznaloRequest.js';

const tiltoRouter = express.Router();

tiltoRouter.get('/', authorize(['admin']), async (req, res) => {
  // res.send('<h1>now you can block me</h1>');
  const all = await selectAll();
  const { username } = req.session;
  res.render('toroldiak', { palyak: all[0], username });
});

export default tiltoRouter;
// const all = await selectAllItems();
//     // kirajzolja az ossszes palyat amkit kerek
//     console.log(all[0]);
//     return res.render('viewerPage', { palyak: all[0] });
