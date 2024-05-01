function authorize(roles = ['diak', 'admin']) {
  return (req, res, next) => {
    if (!req.session.role) {
      // a felhasználó nincs bejelentkezve
      res.status(401).send('You are not logged in');
    } else if (!roles.includes(req.session.role)) {
      // a felhasználó be van jelentkezve de nincs joga ehhez az operációhoz
      res.status(403).send('You do not have permission to access this endpoint');
    } else {
      // minden rendben
      next();
    }
  };
}

export default authorize;
