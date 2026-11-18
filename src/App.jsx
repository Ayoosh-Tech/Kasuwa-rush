
import { useEffect, useState } from "react";
import "./index.css";

const products = [
  { id: "tomato", name: "Tomatoes", emoji: "🍅", price: 100 },
  { id: "onion", name: "Onions", emoji: "🧅", price: 150 },
  { id: "pepper", name: "Peppers", emoji: "🌶️", price: 50 },
  { id: "rice", name: "Rice", emoji: "🍚", price: 500 },
  { id: "beans", name: "Beans", emoji: "🫘", price: 300 },
  { id: "yam", name: "Yams", emoji: "🍠", price: 400 },
];

const orders = [
  {
    customer: "Aunty Zainab",
    emoji: "👩🏽",
    items: { tomato: 2, onion: 1, pepper: 1 },
    payment: 500,
  },
  {
    customer: "Mallam Musa",
    emoji: "👨🏽",
    items: { rice: 1, beans: 1 },
    payment: 1000,
  },
  {
    customer: "Aunty Fatima",
    emoji: "👩🏾",
    items: { yam: 2, tomato: 1 },
    payment: 1000,
  },
  {
    customer: "Young Trader",
    emoji: "🧑🏽",
    items: { onion: 2, pepper: 2, beans: 1 },
    payment: 1000,
  },
  {
    customer: "Uncle Ibrahim",
    emoji: "👨🏾",
    items: { rice: 1, yam: 1, tomato: 2 },
    payment: 1500,
  },
];

function App() {
  const [started, setStarted] = useState(false);
  const [orderIndex, setOrderIndex] = useState(0);
  const [cart, setCart] = useState({});
  const [totalAnswer, setTotalAnswer] = useState("");
  const [changeAnswer, setChangeAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [coins, setCoins] = useState(0);
  const [time, setTime] = useState(90);
  const [message, setMessage] = useState("");
  const [finished, setFinished] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentOrder = orders[orderIndex];

  const total = Object.entries(cart).reduce(
    (sum, [id, quantity]) => {
      const product = products.find((item) => item.id === id);
      return sum + product.price * quantity;
    },
    0
  );

  const orderTotal = Object.entries(currentOrder.items).reduce(
    (sum, [id, quantity]) => {
      const product = products.find((item) => item.id === id);
      return sum + product.price * quantity;
    },
    0
  );

  const expectedChange = currentOrder.payment - orderTotal;

  useEffect(() => {
    if (!started || finished || isProcessing || time <= 0) return;

    const timer = setInterval(() => {
      setTime((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished, isProcessing, time]);

  useEffect(() => {
    if (started && time === 0) {
      setFinished(true);
      setIsProcessing(false);
    }
  }, [started, time]);

  function startGame() {
    setStarted(true);
    setFinished(false);
    setIsProcessing(false);
    setOrderIndex(0);
    setCart({});
    setScore(0);
    setCompletedOrders(0);
    setCoins(0);
    setTime(90);
    setMessage("");
    setTotalAnswer("");
    setChangeAnswer("");

  }

  function addProduct(id) {
    setCart((previous) => ({
      ...previous,
      [id]: (previous[id] || 0) + 1,
    }));
    setMessage("");
  }

  function removeProduct(id) {
    setCart((previous) => {
      const updated = { ...previous };
      updated[id] = Math.max(0, (updated[id] || 0) - 1);

      if (updated[id] === 0) delete updated[id];

      return updated;
    });
    setMessage("");
  }

  function submitOrder() {
    if (isProcessing) return;

    const correctBasket = Object.keys(currentOrder.items).every(
      (id) => (cart[id] || 0) === currentOrder.items[id]
    ) && Object.keys(cart).every(
      (id) => (currentOrder.items[id] || 0) === cart[id]
    );

    if (!correctBasket) {
      setMessage("Check the products and quantities again!");
      return;
    }

    if (Number(totalAnswer) !== orderTotal) {
      setMessage("Your total is incorrect. Try calculating again!");
      return;
    }

    if (Number(changeAnswer) !== expectedChange) {
      setMessage("Your change is incorrect. Try again!");
      return;
    }


    setIsProcessing(true);
    setScore((previous) => previous + 50);
    setCoins((previous) => previous + 20);
    setCompletedOrders((previous) => previous + 1);
    setMessage("Excellent! Order completed! 🎉");

    if (orderIndex === orders.length - 1) {
      setFinished(true);
      setIsProcessing(false);
    } else {
      setTimeout(() => {
        setOrderIndex((previous) => previous + 1);
        setCart({});
        setTotalAnswer("");
        setChangeAnswer("");
        setMessage("");
        setIsProcessing(false);
      }, 1200);
    }
  }

  if (!started) {
    return (
      <main className="app">
        <nav className="navbar">
          <h2>🛍️ Kasuwa Rush</h2>
          <span>🇳🇬 Nigerian Market Game</span>
        </nav>

        <section className="hero">
          <div className="hero-content">
            <p className="tagline">WELCOME TO THE MARKET!</p>
            <h1>KASUWA <span>RUSH!</span></h1>
            <p className="description">
              Buy Smart. Sell Fast. Beat the Rush!
            </p>
            <p className="intro">
              Serve customers, select fresh products,
              calculate prices and become a market champion!
            </p>
            <button className="play-button" onClick={startGame}>
              START PLAYING 🎮
            </button>
          </div>

          <div className="market-art">
            <div className="market-icon">🏪</div>
            <div className="market-products">
              <span>🍅</span><span>🧅</span><span>🌶️</span>
              <span>🍚</span><span>🍠</span>
            </div>
            <p>YOUR MARKET. YOUR RULES!</p>
          </div>
        </section>

        <footer>© 2026 Kasuwa Rush</footer>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="game-page">
        <section className="result-card">
          <div className="result-emoji">🏆</div>
          <h1>Market Champion!</h1>
          <p>Your market session is complete.</p>
          <h2>⭐ {score} Points</h2>
          <h3>🪙 {coins} Coins</h3>
          <p>Orders completed: {completedOrders} / 5</p>
          <button className="play-button" onClick={startGame}>
            PLAY AGAIN 🔄
          </button>
          <button className="back-button" onClick={() => {
            setStarted(false);
            setFinished(false);

          }}>
            HOME
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="game-page">
      <header className="game-header">
        <h2>🛍️ Kasuwa Rush</h2>
        <div>⭐ {score} Points</div>
        <div>🪙 {coins} Coins</div>
        <div className="timer">⏱️ {time}s</div>
      </header>

      <section className="game-content">
        <div className="customer-card">
          <div className="customer-emoji">{currentOrder.emoji}</div>
          <div>
            <h2>{currentOrder.customer}</h2>
            <p>Please help me buy these items!</p>
          </div>
        </div>

        <section className="order-card">
          <h3>🛒 Customer's Shopping List</h3>
          {Object.entries(currentOrder.items).map(([id, quantity]) => {
            const product = products.find((item) => item.id === id);
            return (
              <p key={id}>
                {product.emoji} {quantity} × {product.name}
              </p>
            );
          })}
          <p><strong>Customer pays: ₦{currentOrder.payment}</strong></p>
        </section>

        <h2 className="section-heading">Choose Your Products</h2>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-emoji">{product.emoji}</div>
              <h3>{product.name}</h3>
              <p>₦{product.price}</p>
              <div className="quantity-controls">
                <button onClick={() => removeProduct(product.id)}>−</button>
                <strong>{cart[product.id] || 0}</strong>
                <button onClick={() => addProduct(product.id)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <section className="checkout-card">
          <h2>💰 Checkout</h2>
          <p>Your basket total: <strong>₦{total}</strong></p>

          <label>Enter the correct total:</label>
          <input
            type="number"
            value={totalAnswer}
            onChange={(event) => setTotalAnswer(event.target.value)}
            placeholder="Enter total amount"
          />

          <label>Calculate the customer's change:</label>
          <input
            type="number"
            value={changeAnswer}
            onChange={(event) => setChangeAnswer(event.target.value)}
            placeholder="Enter change"
          />

          <button className="play-button" onClick={submitOrder}>
            COMPLETE ORDER
          </button>

          {message && <p className="game-message">{message}</p>}
        </section>

        <p className="progress">
          Customer {orderIndex + 1} of {orders.length}
        </p>
      </section>
    </main>
  );
}

export default App;
