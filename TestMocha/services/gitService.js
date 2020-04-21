const https = require('https');


module.exports = function () {
  const getRepos = function (userId, cb) {
    const options = {
      host: 'api.github.com',
      path: `/users/${userId}/repos`,
      headers: { 'User-Agent': 'gitExample' },
    };

    const callback = function (response) {
      let str = '';
      
      response.on('data', (chunk) => {
        str += chunk;
      });
      
      
      response.on('end',
      () => {
        // console.log('CALBACk in repos',str);
          cb(JSON.parse(str));
        });
    };

    https.request(options, callback).end();
  };
  const getUser = function (userId) {
    return new Promise(((resolve) => {
      // console.log('getUser');
      const options = {
        host: 'api.github.com',
        path: `/users/${userId}`,
        headers: { 'User-Agent': 'gitExample' },
      };

      const callback = function (response) {
        // console.log('callback');
        let str = '';

        response.on('data', (chunk) => {
          str += chunk;
        });

        response.on('end', () => {
          const user = JSON.parse(str);
          getRepos(userId, (repos) => {
            console.log('repos');
            user.repos = repos;
               resolve(user);
            
          });
        });
        // response.on('error', (e) => {
        //   console.log(`problem with request: ${e.message}`);
        // });
      };

      // console.log(options);
      https.request(options, callback).end();
    }));
  };

  return {
    getUser,
  };
};
