import express from 'express';

const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(`Session reset error: ${err.message}`);
    } else {
      res.redirect('/');
      // res.send('Logout successful');
    }
  });
});

export default logoutRouter;
