import express from 'express';
import bcrypt from 'bcrypt';
import authorize from '../middleware/authorize.js';
import { signIn, changePW } from '../database/felhasznaloRequest.js';

const setnewpwAdmin = express.Router();
// ha az adott diak modositani szeretne a jelszavat vagy username-jet
setnewpwAdmin.use(express.urlencoded({ extended: false }));
setnewpwAdmin.get('/', authorize(['admin']), (req, res) => {
  try {
    return res.render('settingsAdmin');
  } catch (err) {
    console.log(err);
    return 0;
  }
});

// ha a felhasznalo meg akarja valtoztatni a jelszavat
setnewpwAdmin.post('/', authorize(['admin']), async (req, res) => {
  try {
    // lekerem az adatokat
    const { username, currentPassword, newPassword, confirmPassword } = req.body;
    console.log(username);
    console.log(currentPassword);
    console.log(newPassword);
    console.log(confirmPassword);
    // ellenorzom hogy az altala megadott jelszo valoban helyes e
    let jelszavakHash = [];
    jelszavakHash = await signIn(username);
    console.log(jelszavakHash[0][0].password);
    const hasheltJelszoString = jelszavakHash[0][0].password;
    // ellenorzom hogy a megadott jelszo match e az adatbazisban levovel
    const helyes = await bcrypt.compare(currentPassword, hasheltJelszoString);
    console.log(helyes);
    if (helyes && newPassword === confirmPassword) {
      // megvaltoztatom a jelszot ha helyes az altala bevitt jelszo
      const hashedNewPW = await bcrypt.hash(newPassword, 10);
      console.log(hashedNewPW);
      const [valtozas] = await changePW(username, hashedNewPW);
      console.log(`Inserted request. Affected rows: ${valtozas.affectedRows}`);
      return res.redirect('/adminview');
    }
    // Ha a confirm nem egyenlo az uj jelszoval vagy nem helyes a regi jelszo
    return res.redirect('/setNewPwAdmin');
  } catch (err) {
    console.log(err);
    return 0;
  }
});

export default setnewpwAdmin;
