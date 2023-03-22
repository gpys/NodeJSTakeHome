const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const cryptoRouter = require('./cryptoRouter');
const auth = require('./controllers/authController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
  res.send('Good luck!')
});

//direct request to crypto endpoint to authentication and the appropriate router
app.use('/crypto', auth, cryptoRouter);



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



app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});