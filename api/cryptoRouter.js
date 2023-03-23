const { Router } = require('express');
const router = Router();
const cryptoController = require('./controllers/cryptoController')


router.get('/', (req, res) => res.json('welcome to the crypto page'))

//route handler to return list of all reward coins
router.get('/all', cryptoController.getAllRewards, (req, res) => {
  return res.status(200).json(res.locals.coins);
});

//route handler return list of mining pools for specified coin
router.get('/pools/:coin', cryptoController.coinPools, (req, res) => {
  return res.status(200).json(res.locals.pools);
});




module.exports = router;