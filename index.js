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

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});
