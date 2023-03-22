const { Router } = require('express');
const router = Router();
const cryptoController = require('./controllers/cryptoController')


router.get('/', (req, res) => res.json('hi'))

//route handler to return list of all reward coins
router.get('/all', cryptoController.getAllRewards, (req, res) => {
    console.log('back in router', res.locals.coins)
  return res.status(200).json(res.locals.coins);
});

//route handler return list of mining pools for specified coin
router.get('/:coin', cryptoController.coinPools, (req, res) => {
  return res.status(200).json(res.locals.pools);
});




module.exports = router;