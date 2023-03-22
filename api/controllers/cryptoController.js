const axios = require('axios');
const NodeCache = require('node-cache');
const coinUrl = 'https://api.minerstat.com/v2/coins';

//initialize in memory cache and set time to live 5 minutes to save requests and have fresh data
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
    cachedData.map(el => coins.add(el.reward_unit));
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
    //grab name of coin from query params
      const { coin } = req.params;
      //check if cache has list of pools for this coin
      if (!cache.has(coin)) {
        //if no cache data, check cache for total coin data
        if (!cache.has(coinUrl)) {
          const { data } = await axios.get(coinUrl);
          cache.set(coinUrl, data);
        }
        //retrieve cached total coin data
        const cachedData = cache.get(coinUrl);
        //create array of pools with specified coin as reward
        const allPools = cachedData.filter(el => el.reward_unit === coin && el.reward > -1);
        //put highest reward per hour at front of array
        allPools.sort((a, b) => b.reward - a.reward);
        //save top 10 highest rewards to list and store in cache
        const bestPools = allPools.slice(0, 10);
        cache.set(coin, bestPools);
      
      }
      const pools = cache.get(coin);
      //if array is empty return message that no reward data is available
      res.locals.pools = pools.length === 0 ? 'no reward data for this coin' : pools;
      return next();
    }
    catch(e){
      return next({
        log: {err: `error in cryptoController.coinPools: ${e}`},
        status: 500,
        message: 'error fetching pools for this coin'
      })
    }
};

module.exports= {getAllRewards, coinPools};