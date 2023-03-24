const express = require('express');
const app = express();
const cors = require('cors');

//import middleware
const cryptoRouter = require('./cryptoRouter');
const authCheck = require('./controllers/authController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Good luck!')
  });
  
//direct request to crypto endpoint to authentication and then appropriate router
app.use('/crypto', authCheck, cryptoRouter);


//unknown route
app.use('/', (req, res) => {
return res.status(404).json('Page not found');
});

//global error handler
app.use((err, req, res, next) => {
const defaultErr = {
    log: 'Global error handler triggered',
    status: 500,
    message: {error: 'an error occurred'},
};
const errOb = Object.assign(defaultErr, err);
console.log(errOb.log);
res.status(errOb.status).json(errOb.message);
});

module.exports = app;