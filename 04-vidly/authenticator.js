
function auth (req, resp, next){
   console.log('Authenticating ...');
   next();
}

module.exports = auth;