const axios = require('axios');
const ExchangeRate = require('../models/ExchangeRate');
const { currencyApiKey, cryptoApiKey } = require('../config');

const updateExchangeRates = async () => {
  try {
    const fiatCurrencies = ['USD', 'INR'];

    for (let baseCurrency of fiatCurrencies) {
      const response = await axios.get(`https://api.currencylayer.com/live?access_key=${currencyApiKey}&source=${baseCurrency}&currencies=${fiatCurrencies.join(',')}`);
      
      const exchangeRates = response.data.quotes;

      for (let targetCurrency in exchangeRates) {
        const currencyPair = `${baseCurrency}/${targetCurrency.substring(3)}`;
        const rate = exchangeRates[targetCurrency];
        
        await ExchangeRate.findOneAndUpdate(
          { currencyPair },
          { rate, timestamp: new Date() },
          { upsert: true }
        );
      }
    }

    const cryptoCurrencies = ['bitcoin', 'ethereum'];
    const cryptoResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCurrencies.join(',')}&vs_currencies=usd`);

    for (let cryptoCurrency in cryptoResponse.data) {
      const currencyPair = `${cryptoCurrency}/USD`; 
      const rate = cryptoResponse.data[cryptoCurrency].usd;

      await ExchangeRate.findOneAndUpdate(
        { currencyPair },
        { rate, timestamp: new Date() },
        { upsert: true }
      );
    }

    console.log('Exchange rates updated successfully');
  } catch (err) {
    console.error('Failed to update exchange rates:', err.message);
  }
};

module.exports = updateExchangeRates;
