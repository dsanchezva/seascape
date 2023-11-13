//check if the usser is already logged in
function isLoggedIn(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect("/user/login");
  } else {
    next();
  }
}
//check if the session is active
function infoLocals(req, res, next) {
  if (req.session.user === undefined) {
    res.locals.sessionActive = false;
  } else {
    res.locals.sessionActive = true;
  }
  next();
}
//check if the user is administrator
function isAdmin(req, res, next) {
  if (req.session.user.role === "admin") {
    next();
  } else {
    res.redirect("/content");
  }
}

function infoLocalsAdmin(req, res, next) {
  if (req.session.user !== undefined) {
    if (req.session.user.role === "admin") {
      res.locals.adminActive = true;
    } else {
      res.locals.adminActive = false;
    }
  }
  next();
}

module.exports = {
  isLoggedIn,
  infoLocals,
  isAdmin,
  infoLocalsAdmin,
};
