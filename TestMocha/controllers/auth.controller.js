function authController() {
  function isAuthorized(roles, name) {
    return roles.indexOf(name) > -1;
  }

  function isAuthorizedAsync(roles, name, cb) {
    setTimeout(() => {
      cb(roles.indexOf(name) > -1);
    }, 0);
  }

  function isAuthorizedPromised(roles, name) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(roles.indexOf(name) > -1);
      }, 100);
    });
  }

  function getIndex(req, res) {
    try {
      if (req.user.isAuthorized('user')) {
        res.renderME('index');
      }
      res.renderME('notFound');
    } catch (error) {
      res.renderME('error');
    }
  }

  return {
    isAuthorized,
    isAuthorizedAsync,
    isAuthorizedPromised,
    getIndex,
  };
}

module.exports = authController();
