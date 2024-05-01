import express from 'express';
import bcrypt from 'bcrypt';
import { signIn, role } from '../database/felhasznaloRequest.js';

const regRouter = express.Router();

// belepes
regRouter.post('/', async (req, res) => {
  // a bejelentkezni kivano fel megadja a usernevet es a jelszavat
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  // lekerem az adatbazisban tarolt hash-elt jelszot a megadott username-re
  let jelszavakHash = [];
  jelszavakHash = await signIn(username);
  console.log(jelszavakHash[0][0].password);
  const hasheltJelszoString = jelszavakHash[0][0].password;
  // ellenorzom hogy a megadott jelszo match e az adatbazisban levovel
  const helyes = await bcrypt.compare(password, hasheltJelszoString);
  // admin jelszavakat generalok
  // const anna = 'danielpw';
  // const hashanna = await bcrypt.hash(anna, 10);
  // console.log(hashanna);
  // admin jelszo vege
  console.log(helyes);
  if (helyes) {
    const userRole = await role(username);
    const roleAsString = userRole[0][0].hataskor;
    if (roleAsString === 'admin') {
      req.session.username = username;
      req.session.role = 'admin';
      return res.redirect('/adminview');
    }
    req.session.username = username;
    req.session.role = 'diak';
    return res.redirect('/diakview');
  }
  // ha helytelen a megadott jelszo
  // return res.status(401).send('Passwords do not match');
  return res.render('login');
});

// szamolom hogy hanyan lepnek ide
regRouter.use((req, res, next) => {
  // init wiev obj
  req.session.views = req.session.views || {};
  const { views } = req.session;
  const pathname = req.path;
  // szmaolom az elerest
  views[pathname] = (views[pathname] || 0) + 1;

  next();
});

regRouter.get('/', express.urlencoded({ extended: true }), (req, res) => {
  try {
    return res.render('login');
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export default regRouter;
