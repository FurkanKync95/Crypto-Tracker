import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    // Placeholder news fetch (can integrate CryptoPanic or GNews later)
    setNews([`Latest news about ${coin}`, `Market sentiment for ${coin}`]);
  };

  const calculatePrediction = (coin) => {
    // Simple rule-based prediction (can replace with TA-Lib or AI model later)
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
      <div className="flex justify-between">
        <div className="w-2/3">
          <h1 className="text-3xl font-bold mb-4">Crypto Tracker</h1>
          <div className="mb-4">
            <label className="block mb-2">Select Coin:</label>
            <select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className="p-2 border rounded"
            >
              {coins.map((coin) => (
                <option key={coin.symbol} value={coin.symbol}>{coin.name}</option>
              ))}
            </select>
            <Button className="ml-2" onClick={() => addToFavorites(selectedCoin)}>Add to Favorites</Button>
          </div>

          <Card className="mb-4">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Prediction</h2>
              <p>{prediction}</p>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">News</h2>
              <ul>
                {news.map((n, idx) => <li key={idx}>{n}</li>)}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Average Cost Calculator</h2>
              {averagePriceInputs.map((input, idx) => (
                <div key={idx} className="flex mb-2">
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={input.quantity}
                    onChange={(e) => handleInputChange(idx, 'quantity', e.target.value)}
                    className="mr-2"
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={input.price}
                    onChange={(e) => handleInputChange(idx, 'price', e.target.value)}
                  />
                </div>
              ))}
              <Button className="mt-2" onClick={addNewInput}>Add More</Button>
              <Button className="mt-2 ml-2" onClick={calculateAverage}>Calculate</Button>
              {averagePrice && (
                <p className="mt-2">Average Buy Price: ${averagePrice}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="w-1/3">
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Favorites</h2>
              <ul>
                {favorites.map((f) => (
                  <li key={f}>
                    <Button variant="link" onClick={() => setSelectedCoin(f)}>{f}</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Chart</h2>
            <iframe
              src={`https://s.tradingview.com/widgetembed/?symbol=BINANCE:${selectedCoin}&interval=60&theme=light&style=1&locale=en`}
              width="100%"
              height="400"
              frameBorder="0"
              allowtransparency="true"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
