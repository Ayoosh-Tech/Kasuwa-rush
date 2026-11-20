
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


const translations = {
  en: {
    play: "PLAY GAME",
    score: "Score",
    points: "Points",
    coins: "Coins",
    time: "Time",
    orders: "Orders",
    order: "Customer Order",
    add: "ADD",
    remove: "REMOVE",
    total: "Total",
    enterTotal: "Enter total amount",
    change: "Change",
    enterChange: "Enter change",
    complete: "COMPLETE ORDER",
    completed: "ORDER COMPLETED",
    playAgain: "PLAY AGAIN",
    home: "BACK TO HOME",
    progress: "Market progress",
    customersServed: "customers served",
    nextCustomer: "YOUR NEXT CUSTOMER",
    customerRequest: "Please help me buy these items!",
    shoppingList: "Shopping List",
    customerPays: "Customer pays",
    freshMarket: "FRESH FROM THE MARKET",
    chooseProducts: "Choose Your Products",
    items: "items",
    almostThere: "ALMOST THERE",
    checkout: "Checkout",
    basketTotal: "Your basket total",
    totalQuestion: "1. Enter the correct total",
    changeQuestion: "2. Calculate the customer's change",
    tip: "💡 Tip: Check the shopping list carefully before completing your order.",
    resultTagline: "YOUR MARKET REPORT",
    champion: "Market Champion!",
    goodEffort: "Good Effort!",
    wonMessage: "Amazing! You served every customer successfully.",
    lostMessage: "The market rush is over. Keep practising and try again!",
    pointsLabel: "Points",
    orderSuccess: "Excellent! Order completed! 🎉",
    basketError: "Check the products and quantities again!",
    totalError: "Your total is incorrect. Try calculating again!",
    changeError: "Your change is incorrect. Try again!",
    products: {
      tomato: "Tomatoes",
      onion: "Onions",
      pepper: "Peppers",
      rice: "Rice",
      beans: "Beans",
      yam: "Yams",
    },
  },

  ha: {
    play: "FARA WASA",
    score: "Maki",
    points: "Maki",
    coins: "Tsabar kuɗi",
    time: "Lokaci",
    orders: "Oda",
    order: "Odar Abokin Ciniki",
    add: "ƘARA",
    remove: "RAGE",
    total: "Jimla",
    enterTotal: "Shigar da jimla",
    change: "Canji",
    enterChange: "Shigar da canji",
    complete: "KAMMALA ODA",
    completed: "AN KAMMALA ODA",
    playAgain: "SAKE WASA",
    home: "KOMA GIDA",
    progress: "Ci gaban kasuwa",
    customersServed: "abokan ciniki da aka yi wa hidima",
    nextCustomer: "ABOKIN CINIKI NA GABA",
    customerRequest: "Don Allah taimaka min in sayi waɗannan kayayyaki!",
    shoppingList: "Jerin Kayan Siyayya",
    customerPays: "Abokin ciniki ya biya",
    freshMarket: "SABON KAYAN KASUWA",
    chooseProducts: "Zaɓi Kayayyaki",
    items: "kaya",
    almostThere: "KUSAN KAMMALAWA",
    checkout: "Biyan Kuɗi",
    basketTotal: "Jimillar kuɗin kwando",
    totalQuestion: "1. Shigar da jimillar kuɗi",
    changeQuestion: "2. Lissafa kuɗin da za a mayar",
    tip: "💡 Shawara: Duba jerin kayan kafin kammala odarka.",
    resultTagline: "RAHOTON KASUWARKA",
    champion: "Gwarzon Kasuwa!",
    goodEffort: "Ka Yi Ƙoƙari!",
    wonMessage: "Madalla! Ka yi wa dukkan abokan ciniki hidima.",
    lostMessage: "Lokacin kasuwa ya ƙare. Ci gaba da atisaye ka sake gwadawa!",
    pointsLabel: "Maki",
    orderSuccess: "Madalla! An kammala oda! 🎉",
    basketError: "Duba kayayyaki da adadinsu da kyau!",
    totalError: "Jimillar kuɗin ba daidai ba ce. Sake lissafawa!",
    changeError: "Kuɗin da za a mayar ba daidai ba ne. Sake gwadawa!",
    products: {
      tomato: "Tumatur",
      onion: "Albasa",
      pepper: "Barkono",
      rice: "Shinkafa",
      beans: "Wake",
      yam: "Doya",
    },
  },
};

function playSound(type) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  const audio = new AudioContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  const sounds = {
    click: { frequency: 500, duration: 0.08 },
    success: { frequency: 850, duration: 0.2 },
    error: { frequency: 200, duration: 0.25 },
    finish: { frequency: 1000, duration: 0.4 },
  };

  const sound = sounds[type] || sounds.click;

  oscillator.frequency.value = sound.frequency;
  oscillator.type = "sine";

  gain.gain.setValueAtTime(0.15, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audio.currentTime + sound.duration
  );

  oscillator.connect(gain);
  gain.connect(audio.destination);

  oscillator.start();
  oscillator.stop(audio.currentTime + sound.duration);

  oscillator.onended = () => audio.close();
}

  const [started, setStarted] = useState(false);
  const [language, setLanguage] = useState("en");
  const t = translations[language];
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

  const total = Object.entries(cart).reduce((sum, [id, quantity]) => {
    const product = products.find((item) => item.id === id);
    return sum + product.price * quantity;
  }, 0);

  const orderTotal = Object.entries(currentOrder.items).reduce(
    (sum, [id, quantity]) => {
      const product = products.find((item) => item.id === id);
      return sum + product.price * quantity;
    },
    0
  );

  const expectedChange = currentOrder.payment - orderTotal;
  const progressPercent = (completedOrders / orders.length) * 100;

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

  function goHome() {
    setStarted(false);
    setFinished(false);
    setIsProcessing(false);
  }

  function addProduct(id) {
    if (isProcessing) return;

    setCart((previous) => ({
      ...previous,
      [id]: (previous[id] || 0) + 1,
    }));
    setMessage("");
  }

  function removeProduct(id) {
    if (isProcessing) return;

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

    const correctBasket =
      Object.keys(currentOrder.items).every(
        (id) => (cart[id] || 0) === currentOrder.items[id]
      ) &&
      Object.keys(cart).every(
        (id) => (currentOrder.items[id] || 0) === cart[id]
      );

    if (!correctBasket) {
      playSound("error");
      setMessage(t.basketError);
      return;
    }

    if (Number(totalAnswer) !== orderTotal) {
      playSound("error");
      setMessage(t.totalError);
      return;
    }

    if (Number(changeAnswer) !== expectedChange) {
      playSound("error");
      setMessage(t.changeError);
      return;
    }

    setIsProcessing(true);
    setScore((previous) => previous + 50);
    setCoins((previous) => previous + 20);
    playSound("success");
    setCompletedOrders((previous) => previous + 1);
    setMessage(t.orderSuccess);

    if (orderIndex === orders.length - 1) {
      setFinished(true);
      playSound("finish");
      setIsProcessing(false);
    } else {
      setTimeout(() => {
        playSound("click");
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
          <span>🇳🇬 A Nigerian Market Adventure</span>
        </nav>

        <section className="hero">
          <div className="hero-content">
            <p className="tagline">WELCOME TO THE MARKET!</p>
            <h1>
              KASUWA <span>RUSH!</span>
            </h1>
            <p className="description">
              Buy Smart. Sell Fast. Beat the Rush!
            </p>
            <p className="intro">
              Step into a lively Nigerian market! Serve customers, select
              fresh products, calculate prices and become a market champion.
            </p>

            <div className="welcome-features">
              <span>🛒 Shop smart</span>
              <span>🧮 Calculate fast</span>
              <span>🏆 Earn rewards</span>
            </div>

       

          
            <button
  className="play-button"
  onClick={() => {
    playSound("click");
    startGame();
  }}
>
              {t.play} <span>🎮</span>
            </button>
          </div>

      


<div className="market-art">
  <div className="language-switch">
    <button
      className={language === "en" ? "active" : ""}
      onClick={() => setLanguage("en")}
    >
      English
    </button>

    <button
      className={language === "ha" ? "active" : ""}
      onClick={() => setLanguage("ha")}
    >
      Hausa
    </button>
  </div>

  <img
    src="/assets/market/kasuwa-market.png"
    alt="Colourful illustrated Northern Nigerian market"
  />
</div>
</section>


        <footer>© 2026 Kasuwa Rush · Made with ❤️ in Nigeria</footer>
      </main>
    );
  }

  if (finished) {
    const won = completedOrders === orders.length;

    return (
      <main className="game-page results-page">
        <section className="result-card">
          <div className="result-emoji">{won ? "🏆" : "🛍️"}</div>
          <p className="result-tagline">YOUR MARKET REPORT</p>
          <h1>{won ? "Market Champion!" : "Good Effort!"}</h1>
          <p>
            {won
              ? "Amazing! You served every customer successfully."
              : "The market rush is over. Keep practising and try again!"}
          </p>

          <div className="result-stats">
            <div>
              <span>⭐</span>
              <strong>{score}</strong>
              <small>Points</small>
            </div>
            <div>
              <span>🪙</span>
              <strong>{coins}</strong>
              <small>Coins</small>
            </div>
            <div>
              <span>🛒</span>
              <strong>{completedOrders}/5</strong>
              <small>Orders</small>
            </div>
          </div>

          <div className="result-progress">
            <div style={{ width: `${progressPercent}%` }} />
          </div>

          <button className="play-button result-play" onClick={startGame}>
            PLAY AGAIN 🔄
          </button>
          <button className="back-button" onClick={goHome}>
            BACK TO HOME
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="game-page">
      <header className="game-header">
        <h2>🛍️ Kasuwa Rush</h2>
        <div className="header-stat">⭐ {score} {t.points}</div>
        <div className="header-stat">🪙 {coins} {t.coins}</div>
        <div className={`timer ${time <= 20 ? "timer-warning" : ""}`}>
          ⏱️ {time}s
        </div>
      </header>

      <section className="game-content">
        <div className="progress-panel">
          <div className="progress-label">
            <strong>{t.progress}</strong>
            <span>{completedOrders} of 5 {t.customersServed}</span>
          </div>
          <div className="progress-track">
            <div style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="game-layout">
          <div className="game-main">
            <div className="customer-card">
              <div className="customer-emoji">{currentOrder.emoji}</div>
              <div>
                <span className="eyebrow">YOUR NEXT CUSTOMER</span>
                <h2>{currentOrder.customer}</h2>
                <p>Please help me buy these items!</p>
              </div>
            </div>

            <section className="order-card">
              <div className="card-heading">
                <h3>🛒 Shopping List</h3>
                <span>Order {orderIndex + 1}/5</span>
              </div>

              <div className="shopping-items">
                {Object.entries(currentOrder.items).map(([id, quantity]) => {
                  const product = products.find((item) => item.id === id);

                  return (
                    <div className="shopping-item" key={id}>
                      <span>{product.emoji} {product.name}</span>
                      <strong>× {quantity}</strong>
                    </div>
                  );
                })}
              </div>

              <div className="payment-row">
                <span>Customer pays</span>
                <strong>₦{currentOrder.payment.toLocaleString()}</strong>
              </div>
            </section>

            <div className="section-title">
              <div>
                <span className="eyebrow">FRESH FROM THE MARKET</span>
                <h2>Choose Your Products</h2>
              </div>
              <span className="basket-count">
                🧺 {Object.values(cart).reduce((a, b) => a + b, 0)} items
              </span>
            </div>

            <div className="product-grid">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-emoji">{product.emoji}</div>
                  <h3>{product.name}</h3>
                  <p>₦{product.price.toLocaleString()}</p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => removeProduct(product.id)}
                      disabled={isProcessing || !cart[product.id]}
                      aria-label={`Remove one ${product.name}`}
                    >
                      −
                    </button>
                    <strong>{cart[product.id] || 0}</strong>
                    <button
                      onClick={() => addProduct(product.id)}
                      disabled={isProcessing}
                      aria-label={`Add one ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="checkout-card">
            <div className="checkout-heading">
              <span>💰</span>
              <div>
                <span className="eyebrow">ALMOST THERE</span>
                <h2>Checkout</h2>
              </div>
            </div>

            <div className="basket-total">
              <span>Your basket total</span>
              <strong>₦{total.toLocaleString()}</strong>
            </div>

            <label htmlFor="total-answer">1. Enter the correct total</label>
            <input
              id="total-answer"
              type="number"
              min="0"
              value={totalAnswer}
              onChange={(event) => setTotalAnswer(event.target.value)}
              placeholder="Enter total amount"
              disabled={isProcessing}
            />

            <label htmlFor="change-answer">2. Calculate the customer's change</label>
            <input
              id="change-answer"
              type="number"
              min="0"
              value={changeAnswer}
              onChange={(event) => setChangeAnswer(event.target.value)}
              placeholder="Enter change"
              disabled={isProcessing}
            />

            <button
              className="play-button checkout-button"
              onClick={() => {
  playSound("click");
  submitOrder();
}}
              disabled={isProcessing}
            >
              {isProcessing ? "ORDER COMPLETED ✓" : "COMPLETE ORDER"}
            </button>

            {message && (
              <p className="game-message" role="status">
                {message}
              </p>
            )}

            <div className="checkout-tip">
              💡 Tip: Check the shopping list carefully before completing
              your order.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default App;
