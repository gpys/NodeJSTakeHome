
//confirm correct username and bearer token are present in request
const authCheck = (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    const { user } = req.body;
    if (!bearer || !user) {
      throw new Error();
    };

    //grab token from auth header
    const [, token] = bearer.split(' ');
    
    //hardcoded credentials
    const goodToken = 'f2b0156f-cf95-4e29-9f57-51296a481c6a';
    const goodUser = 'user@test.com';
    
    //confirm credentials match requirements
    if (token === goodToken && user === goodUser) {
      return next();
    } else throw new Error();

  } 
//catch errors and send to global error handler
  catch(e){
      return next({
        log: `error in authController, ${e}`,
        status: 401,
        message: {err: 'not authorized'}
      })
    }
};

module.exports = authCheck;