import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

const TradingBot = ({ selectedCrypto }) => {
  const [answer, setAnswer] = useState('');

  const generateAnswer = async () => {
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB5HJkYLT-A94YKlybi46UtRyPBl_Lry3o',
        {
          contents: [{
            parts: [{
              text: `Tell me the best investment strategies for ${selectedCrypto}.`
            }]
          }]
        }
      );
      if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content && response.data.candidates[0].content.parts) {
        setAnswer(response.data.candidates[0].content.parts[0].text);
      } else {
        setAnswer('Error: Unable to generate answer. Please try again.');
      }
    } catch (error) {
      console.error('Error generating answer:', error);
      setAnswer('Error: Unable to generate answer. Please try again.');
    }
  };

  useEffect(() => {
    generateAnswer();
  }, [selectedCrypto]);

  return (
    <div className="bg-zinc-900 border-zinc-600 border-[1px] p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">Trading Bot for Investing Stratergies</h2>
      <p>{answer}</p>
    </div>
  );
};

const CryptoTracker = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [coinChartData, setCoinChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [conversionValue, setConversionValue] = useState('');
  const [conversionResult, setConversionResult] = useState('');

  const generateRandomData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push(Math.round(Math.random() * 100));
    }
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: 7
          }
        });

        const coinChartData = response.data.prices.map(value => ({
          x: moment(value[0]).format('MMM DD'),
          y: value[1].toFixed(2)
        }));

        setCoinChartData(coinChartData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCrypto]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
          },
        });

        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto list:', error);
      }
    };

    fetchCryptoData();
  }, []);

  const handleCryptoChange = (e) => {
    setSelectedCrypto(e.target.value);
  };

  const handleConversion = () => {
    const selectedCoin = cryptoData.find(coin => coin.id === selectedCrypto);
    if (selectedCoin) {
      setConversionResult((conversionValue / selectedCoin.current_price).toFixed(8));
    }
  };

  const data = {
    labels: coinChartData.map(value => value.x),
    datasets: [
      {
        label: `${selectedCrypto.toUpperCase()} Price`,
        data: coinChartData.map(value => value.y),
        fill: true,
        backgroundColor: 'rgb(32, 64, 25)',
        borderColor: 'rgb(0, 179, 0)',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)'
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };

  const selectedCryptoData = cryptoData.find(crypto => crypto.id === selectedCrypto);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-zinc-900 border-zinc-600 border-[1px] p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">{selectedCrypto.toUpperCase()} Price</h2>
            <div>
              <label htmlFor="crypto" className="block text-sm">Select Cryptocurrency:</label>
              <select
                id="crypto"
                value={selectedCrypto}
                onChange={handleCryptoChange}
                className="bg-zinc-800 border p-2 rounded border-transparent"
              >
                {cryptoData.map((crypto) => (
                  <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
                ))}
              </select>
            </div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="h-80">
              <Line data={data} options={options} />
            </div>
          )}
        </div>
        <div className="bg-zinc-900 border-zinc-600 border-[1px] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Conversion Section</h2>
          {selectedCryptoData && (
            <div className="mb-4">
              <p>{selectedCryptoData.name} ({selectedCryptoData.symbol.toUpperCase()}) is currently priced at ${selectedCryptoData.current_price.toFixed(2)} USD.</p>
            </div>
          )}
          <div className="mb-4">
            <input
              type="number"
              value={conversionValue}
              onChange={(e) => setConversionValue(e.target.value)}
              placeholder="Amount in USD"
              className="bg-zinc-800 border-zinc-600 border p-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleConversion}
            className="bg-amber-500 text-white p-2 rounded w-full"
          >
            Convert to {selectedCrypto.toUpperCase()}
          </button>
          {conversionResult && (
            <p className="mt-4 text-lg font-semibold">
              {conversionValue} USD = {conversionResult} {selectedCrypto.toUpperCase()}
            </p>
          )}
        </div>
      </div>
      <TradingBot selectedCrypto={selectedCrypto} />
      <div className="bg-zinc-900 border-zinc-600 border-[1px] p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Coins</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4">S no</th>
                <th className="py-2 px-4">Logo</th>
                <th className="py-2 px-4">Cryptocurrency</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">24h Change</th>
                <th className="py-2 px-4">Market Cap</th>
                <th className="py-2 px-4">Sparkline</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto, index) => (
                <tr key={crypto.id} className="bg-zinc-800">
                  <td className="py-2 px-4 border-zinc-600 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-zinc-600 border-b">
                    <img src={crypto.image} alt={`${crypto.name} logo`} className="w-6 h-6 mx-auto" />
                  </td>
                  <td className="py-2 px-4 border-zinc-600 border-b">{crypto.name}</td>
                  <td className="py-2 px-4 border-zinc-600 border-b">${crypto.current_price.toFixed(2)}</td>
                  <td className={`py-2 px-4 border-zinc-600 border-b ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="py-2 px-4 border-zinc-600 border-b">${crypto.market_cap.toLocaleString()}</td>
                  <td className="py-2 px-4 border-zinc-600 border-b">
                    <Sparklines data={generateRandomData()}>
                      <SparklinesLine color={crypto.price_change_percentage_24h >= 0 ? 'green' : 'red'} />
                      <SparklinesSpots />
                    </Sparklines>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CryptoTracker;
