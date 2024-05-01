import express from 'express';
import { selectAllItems } from '../database/palyaRequest.js';

const mainPgRouter = express.Router();
// kuldok egy get kerest a fooldalra:
mainPgRouter.get('/', express.urlencoded({ extended: true }), async (req, res) => {
  try {
    // lekerem az ab-ba levo osszes palyamat
    const all = await selectAllItems();
    // kirajzolja az ossszes palyat amkit kerek
    console.log(all[0]);
    return res.render('viewerPage', { palyak: all[0] });
  } catch (err) {
    console.log(err);
    return 0;
  }
});
export default mainPgRouter;
