import express from 'express';
import eformidable from 'express-formidable';
import { join } from 'path';
import { insertImg } from '../database/fenykepRequest.js';
import { selectAllItems } from '../database/palyaRequest.js';

const fileRouter = express.Router();
const uploadDir = join(process.cwd(), 'public/uploadDir');

// FILEUPLOAD file feltoltes kep + id fogadas
fileRouter.post('/', eformidable({ uploadDir, keepExtensions: true }), async (req, res) => {
  const kep = req.files.kepecske;
  const kepFogadas = kep.path.split('\\').slice(-1)[0];
  const { azonosito } = req.query;
  // MUKODES: -> a post elkuldese utan : '/uploadImages?azonosito= '
  try {
    const [header] = await insertImg(azonosito, kepFogadas);
    console.log(`Inserted request. Affected rows: ${header.affectedRows}`);
  } catch (err) {
    console.log(err);
  }
  console.log(kepFogadas);
  const all = await selectAllItems();
  // kirajzolja az ossszes palyat amkit kerek
  console.log(all[0]);
  const { username } = req.session;
  return res.render('mainPage', { palyak: all[0], username });
});
export default fileRouter;
