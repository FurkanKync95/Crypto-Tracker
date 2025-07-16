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
  const [avgInputs, setAvgInputs] = useState([{ quantity: '', price: '' }]);
  const [avgPrice, setAvgPrice] = useState(null);

  useEffect(() => {
    fetchNews(selectedCoin);
    calculatePrediction(selectedCoin);
  }, [selectedCoin]);

  const fetchNews = async (coin) => {
    setNews([
      `Breaking: ${coin} makes headlines!`,
      `Analysts predict a shift for ${coin} market trends.`
    ]);
  };

  const calculatePrediction = (coin) => {
    // Simplified ML-inspired scoring
    const rsi = Math.random() * 100;
    const maSignal = Math.random() > 0.5;
    const volSignal = Math.random() > 0.5;
    let score = 50;
    score += rsi < 30 ? 20 : rsi > 70 ? -20 : 0;
    score += maSignal ? 15 : -15;
    score += volSignal ? 15 : -15;
    score = Math.max(0, Math.min(100, score));
    const direction = score > 50 ? 'UP' : 'DOWN';
    setPrediction(`${coin} has a ${score}% chance of going ${direction}.`);
  };

  const addToFavorites = (coin) => {
    if (!favorites.includes(coin)) setFavorites([...favorites, coin]);
  };

  const handleInputChange = (i, field, val) => {
    const newArr = [...avgInputs];
    newArr[i][field] = val;
    setAvgInputs(newArr);
  };

  const addNewInput = () => setAvgInputs([...avgInputs, { quantity: '', price: '' }]);

  const calculateAverage = () => {
    let totalQ = 0,
      totalC = 0;
    avgInputs.forEach(({ quantity, price }) => {
      const q = parseFloat(quantity),
        p = parseFloat(price);
      if (!isNaN(q) && !isNaN(p)) {
        totalQ += q;
        totalC += q * p;
      }
    });
    if (totalQ > 0) setAvgPrice((totalC / totalQ).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Crypto Tracker</h1>
          <nav className="space-x-4">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">Home</button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">About</button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-8 grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Favorites</h2>
          <ul className="space-y-2">
            {favorites.map((f) => (
              <li key={f}>
                <button
                  onClick={() => setSelectedCoin(f)}
                  className="w-full text-left px-3 py-2 bg-blue-50 dark:bg-gray-700 rounded hover:bg-blue-100 dark:hover:bg-gray-600"
                >
                  {f}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <section className="lg:col-span-3 space-y-6">
          {/* Selector */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center space-x-4">
            <label className="font-semibold">Select Coin:</label>
            <select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className="p-2 border rounded bg-transparent"
            >
              {coins.map((c) => (
                <option key={c.symbol} value={c.symbol}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => addToFavorites(selectedCoin)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add to Favorites
            </button>
          </div>

          {/* Prediction */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Prediction</h2>
            <p className="text-gray-700 dark:text-gray-300">{prediction}</p>
          </div>

          {/* News */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Latest News</h2>
            <ul className="list-disc ml-5 space-y-1">
              {news.map((n, i) => (
                <li key={i} className="text-gray-700 dark:text-gray-300">
                  {n}
                </li>
              ))}
            </ul>
          </div>

          {/* Calculator */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Average Cost Calculator</h2>
            <div className="space-y-2">
              {avgInputs.map((inp, i) => (
                <div key={i} className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Qty"
                    value={inp.quantity}
                    onChange={(e) => handleInputChange(i, 'quantity', e.target.value)}
                    className="w-24 p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={inp.price}
                    onChange={(e) => handleInputChange(i, 'price', e.target.value)}
                    className="w-24 p-2 border rounded"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={addNewInput}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add More
              </button>
              <button
                onClick={calculateAverage}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Calculate
              </button>
            </div>
            {avgPrice && (
              <p className="mt-4 font-semibold">Average Buy Price: ${avgPrice}</p>
            )}
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Chart</h2>
            <iframe
              src={`https://s.tradingview.com/widgetembed/?symbol=BINANCE:${selectedCoin}&interval=60&theme=light`}
              width="100%"
              height="400"
              frameBorder="0"
              scrolling="no"
              title="Chart"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
