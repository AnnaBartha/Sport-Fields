import express from 'express';
import authorize from '../middleware/authorize.js';

const addfieldRouter = express.Router();
addfieldRouter.use('/', express.urlencoded({ extended: true }));
addfieldRouter.get('/', authorize(['admin']), (req, res) => {
  // res.send('<h1>you may add a field</h1>');
  try {
    const { username } = req.session;
    return res.render('addfield', { username });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

export default addfieldRouter;
