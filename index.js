import fs from 'fs';
import express from 'express';
import { join } from 'path';
import session from 'express-session';
import palyaRouter from './routes/palyaRoute.js';
import fileRouter from './routes/fileRouter.js';
import searchRouter from './routes/searchRouter.js';
import adminPage from './routes/adminPage.js';
import specRouter from './routes/specifikusRouter.js';
import foglalRouter from './routes/foglaloRouter.js';
import apik from './routes/api.js';
import signin from './routes/signInRouter.js';
import login from './routes/loginRouter.js';
import diakR from './routes/diakRouter.js';
import logoutRouter from './routes/logoutRouter.js';
import mainPgRouter from './routes/mainPage.js';
import setRouter from './routes/settings.js';
import specFromView from './routes/specFromview.js';
import searchview from './routes/searchview.js';
import back from './routes/fromVtoMain.js';
import diakFoglalRouter from './routes/diakFoglalRouter.js';
import foglalasTorloRouter from './routes/foglalasTorloRouter.js';
import diakspecpalyaRouter from './routes/diakspecpalyaRouter.js';
import visszadiakR from './routes/visszadiakR.js';
import setnewpwAdmin from './routes/setnewpwAdmin.js';
import allreservations from './routes/allreservations.js';
import torolfoglalasAsAdmin from './routes/torolfoglalasasAdmin.js';
import addfieldRouter from './routes/addfield.js';
import tiltoRouter from './routes/blockRouter.js';
import torolFelhasznalo from './routes/torolFelhasznalo.js';

console.log(fs.readFile('public/PALYAK.html', () => {}));
const app = express();
app.set('view engine', 'ejs'); // ejs legyen az engine
app.set('views', join(process.cwd(), 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(process.cwd(), 'public')));

app.use(
  session({
    secret: 'thisi78mysuperdupersecret467.GFsessionize',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use('/logout', logoutRouter);
app.use('/diakview', diakR);
app.use('/signup', signin);
app.use('/login', login);
app.use('/adminview', adminPage);
app.use('/register', palyaRouter);
app.use('/uploadImages', fileRouter);
app.use('/search', searchRouter);
app.use('/searchview', searchview);
app.use('/specifikus', specRouter);
app.use('/specifikusfromview', specFromView);
app.use('/foglalas', foglalRouter);
app.use('/api', apik);
app.use('/', mainPgRouter);
app.use('/settings', setRouter);
app.use('/vissza', back);
app.use('/foglalasok', diakFoglalRouter);
app.use('/torolfoglalas', foglalasTorloRouter);
app.use('/diakspecpalya', diakspecpalyaRouter);
app.use('/visszadiak', visszadiakR);
app.use('/setNewPwAdmin', setnewpwAdmin);
app.use('/AllReservations', allreservations);
app.use('/torolFoglalasasAdmin', torolfoglalasAsAdmin);
app.use('/addfiled', addfieldRouter);
app.use('/block', tiltoRouter);
app.use('/torolFelhasznalo', torolFelhasznalo);

app.listen(5500, () => {
  console.log('Listening on port 5500');
});
