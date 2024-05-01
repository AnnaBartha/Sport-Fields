import express from 'express';
import { selectAllItems } from '../database/palyaRequest.js';
import authorize from '../middleware/authorize.js';

const adminRouter = express.Router();
// kuldok egy get kerest a fooldalra:
adminRouter.get('/', express.urlencoded({ extended: true }), authorize(['admin']), async (req, res) => {
  try {
    // lekerem az ab-ba levo osszes palyamat
    const all = await selectAllItems();
    // kirajzolja az ossszes palyat amkit kerek
    console.log(all[0]);
    const { username } = req.session;
    return res.render('mainPage', { palyak: all[0], username });
  } catch (err) {
    console.log(err);
    return 0;
  }
});
export default adminRouter;
