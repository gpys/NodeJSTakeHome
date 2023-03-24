const app = require('./app');
const port = process.env.PORT || 3001;

// start server and listen on default port. optional port param
const createServer = (listen) => {
    //address variable set to 'listen' argument if present to specify desired port 
  const address = listen ? listen : port;
    return app.listen(address, () => {
      console.log(`server listening on port ${address}`);
    });
};

module.exports = createServer;
