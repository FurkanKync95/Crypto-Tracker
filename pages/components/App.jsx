import React, { useState, useEffect } from 'react';

const coins = [
  { symbol: 'BTCUSDT', name: 'Bitcoin' },
  { symbol: 'ETHUSDT', name: 'Ethereum' },
  { symbol: 'WOJAKUSDT', name: 'Wojak' },
];

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState('BTCUSDT');
  const [favorites, setFavorites] = useState(['BTCUSDT', 'ETHUSDT']);
  const [news, setNews] = useState([]);
  const [prediction, setPrediction] = useState('Loading...');
  const [averagePriceInputs, setAveragePriceInputs] = useState([{ quantity: '', price: '' }]);
  const [averagePrice, setAveragePrice] = useState(null);

  useEffect(() => {
    fetchNews(selectedCoin);
    calculatePrediction(selectedCoin);
  }, [selectedCoin]);

  const fetchNews = async (coin) => {
    setNews([`Latest news about ${coin}`, `Market sentiment for ${coin}`]);
  };

  const calculatePrediction = (coin) => {
    const rsi = Math.random() * 100;
    const volumeSignal = Math.random() > 0.5 ? 1 : -1;
    const supportSignal = Math.random() > 0.5 ? 1 : -1;

    let score = 0;
    if (rsi < 30) score += 30;
    if (supportSignal === 1) score += 40;
    if (volumeSignal === 1) score += 30;

    if (score > 50) {
      setPrediction(`${coin} has a ${score}% chance of going UP.`);
    } else {
      setPrediction(`${coin} has a ${100 - score}% chance of going DOWN.`);
    }
  };

  const addToFavorites = (coin) => {
    if (!favorites.includes(coin)) {
      setFavorites([...favorites, coin]);
    }
  };

  const handleInputChange = (index, field, value) => {
    const newInputs = [...averagePriceInputs];
    newInputs[index][field] = value;
    setAveragePriceInputs(newInputs);
  };

  const addNewInput = () => {
    setAveragePriceInputs([...averagePriceInputs, { quantity: '', price: '' }]);
  };

  const calculateAverage = () => {
    let totalQuantity = 0;
    let totalCost = 0;

    averagePriceInputs.forEach(({ quantity, price }) => {
      const q = parseFloat(quantity);
      const p = parseFloat(price);
      if (!isNaN(q) && !isNaN(p)) {
        totalQuantity += q;
        totalCost += q * p;
      }
    });

    if (totalQuantity > 0) {
      setAveragePrice((totalCost / totalQuantity).toFixed(2));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">Crypto Tracker</h1>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Select Coin:</label>
            <select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className="p-2 border rounded w-full max-w-xs"
            >
              {coins.map((coin) => (
                <option key={coin.symbol} value={coin.symbol}>
                  {coin.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => addToFavorites(selectedCoin)}
              className="ml-2 mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add to Favorites
            </button>
          </div>

          <div className="mb-6 p-4 border rounded shadow bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-2">Prediction</h2>
            <p>{prediction}</p>
          </div>

          <div className="mb-6 p-4 border rounded shadow bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-2">News</h2>
            <ul className="list-disc list-inside">
              {news.map((n, idx) => (
                <li key={idx}>{n}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-2">Average Cost Calculator</h2>
            {averagePriceInputs.map((input, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={input.quantity}
                  onChange={(e) => handleInputChange(idx, "quantity", e.target.value)}
                  className="p-2 border rounded w-24"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={input.price}
                  onChange={(e) => handleInputChange(idx, "price", e.target.value)}
                  className="p-2 border rounded w-24"
                />
              </div>
            ))}
            <button
              onClick={addNewInput}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            >
              Add More
            </button>
            <button
              onClick={calculateAverage}
              className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Calculate
