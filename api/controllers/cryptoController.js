const axios = require('axios');
const NodeCache = require('node-cache');
const coinUrl = 'https://api.minerstat.com/v2/coins';

//initialize in memory cache and set time to live 5 minutes
const cache = new NodeCache({stdTTL: 300000});


// function to return list of all coins available as rewards
const getAllRewards = async (req, res, next) => {
  try {
    //check cache for data
    if (!cache.has(coinUrl)) {
        //retrieve list of data from minerstat
      const { data } = await axios.get(coinUrl);
        //store data in cache
      cache.set(coinUrl, data)
    }
    const cachedData = cache.get(coinUrl)
    //initialize set to store unique reward coins 
    const coins = new Set();
    //add coins to set
    cachedData.map(el => coins.add(el.reward_unit))
    //save list to res.locals ready to return
    res.locals.coins = [...coins];
    return next();
  } 
  catch (e) {
    return next({
      log: {err: `error in cryptoController.getAllRewards: ${e}`},
      status: 500,
      message: 'error fetching reward coins',
    })
  }
};


//return pools for specified coin
const coinPools = async (req, res, next) => {
    try {


    }
    catch(e){
      return next({
        log: {err: `error in cryptoController.coinPools: ${e}`},
        status: 500,
        message: 'error fetching coin pools'
      })
    }
};

module.exports= {getAllRewards, coinPools};