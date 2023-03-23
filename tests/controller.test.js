const axios = require('axios');
require('dotenv').config();
const coinURL = process.env.COIN_URL || 'https://api.minerstat.com/v2/coins';


const { getAllRewards, coinPools, cache } = require('../api/controllers/cryptoController');

jest.mock('axios');

describe('getAllRewards', () => {
  beforeEach(() => {
    cache.flushAll();
  });

  it('should retrieve data from minerstat and add unique coins to res.locals', async () => {
    const mockData = {
      data: [
        { reward_unit: 'BTC', reward: 1 },
        { reward_unit: 'BTC', reward: 5 },
        { reward_unit: 'BTC', reward: 20 },
        { reward_unit: 'BTC', reward: -1 },
        { reward_unit: 'ETH', reward: 10 },
        { reward_unit: 'LTC', reward: 1 },
        { reward_unit: 'ETH', reward: 0 },
        { reward_unit: 'ETH', reward: 2 },
      ],
    };
    axios.get.mockResolvedValue(mockData);

    const req = {};
    const res = { locals: {} };
    const next = jest.fn();

    await getAllRewards(req, res, next);

    expect(axios.get).toHaveBeenCalledWith(coinURL);
    expect(cache.has(coinURL)).toBe(true);
    expect(res.locals.coins).toEqual(['BTC', 'ETH', 'LTC']);
    expect(next).toHaveBeenCalled();
  });


  it('should handle errors by calling next with error object', async () => {
    const error = new Error('test error');
    axios.get.mockRejectedValue(error);

    const req = {};
    const res = { locals: {} };
    const next = jest.fn();

    await getAllRewards(req, res, next);

    expect(axios.get).toHaveBeenCalledWith(coinURL);
    expect(next).toHaveBeenCalledWith(expect.objectContaining(error));
  });
});

describe('coinPools', () => {
    beforeEach(() => {
        cache.flushAll();
      });
  
  it('should retrieve data from minerstat and save url and coin name as keys in cache', async () => {
    const mockData = {
        data: [
          { reward_unit: 'BTC', reward: 1, algorithm: 'an algo' },
          { reward_unit: 'BTC', reward: 5, algorithm: 'an algo' },
          { reward_unit: 'BTC', reward: 20, algorithm: 'an algo' },
          { reward_unit: 'BTC', reward: -1, algorithm: 'an algo' },
          { reward_unit: 'ETH', reward: 10, algorithm: 'an algo' },
          { reward_unit: 'LTC', reward: 1, algorithm: 'an algo' },
          { reward_unit: 'ETH', reward: 0, algorithm: 'an algo' },
          { reward_unit: 'ETH', reward: 2, algorithm: 'an algo' },
          { reward_unit: 'ADA', reward: -1, algorithm: 'an algo' },
        ],
      };
      axios.get.mockResolvedValue(mockData);

      const req = { params: 'BTC' };
      const res = { locals: {} };
      const next = jest.fn();

      await coinPools(req, res, next);

      expect(axios.get).toHaveBeenCalledWith(coinURL);
      expect(cache.has(coinURL)).toBeTrue;
      expect(cache.has(req.params)).toBeTrue;

      expect(next).toHaveBeenCalled();
  }) 
  



  it('should handle errors by calling next with error object', async () => {
    const error = new Error('test error');
    axios.get.mockRejectedValue(error);

    const req = { params: 'LTC'};
    const res = { locals: {} };
    const next = jest.fn();

    await getAllRewards(req, res, next);

    expect(axios.get).toHaveBeenCalledWith(coinURL);
    expect(next).toHaveBeenCalledWith(expect.objectContaining(error));
    });
});
