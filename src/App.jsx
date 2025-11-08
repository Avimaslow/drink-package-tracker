import { useMemo, useState } from 'react';

const TABS = {
  TRACKER: 'tracker',
  JOURNAL: 'journal',
};

function App() {
  const [cruiseDays, setCruiseDays] = useState(7);
  const [packagePricePerDay, setPackagePricePerDay] = useState(90);
  const [defaultDrinkPrice, setDefaultDrinkPrice] = useState(12);

  const [currentDay, setCurrentDay] = useState(1);
  const [drinksPerDay, setDrinksPerDay] = useState(() => []); // array of arrays

  const [journal, setJournal] = useState([]);
  const [journalName, setJournalName] = useState('');
  const [journalRating, setJournalRating] = useState(5);
  const [journalNotes, setJournalNotes] = useState('');

  const [activeTab, setActiveTab] = useState(TABS.TRACKER);

  const ensureDrinksArray = (days) => {
    setDrinksPerDay((prev) => {
      const copy = [...prev];
      while (copy.length < days) {
        copy.push([]);
      }
      return copy.slice(0, days);
    });
  };

  const handleCruiseDaysChange = (value) => {
    const n = Math.max(1, Math.floor(value || 1));
    setCruiseDays(n);
    if (currentDay > n) setCurrentDay(n);
    ensureDrinksArray(n);
  };

  const handleAddDrink = () => {
    if (!packagePricePerDay || packagePricePerDay <= 0) {
      alert('Set your daily package price first!');
      return;
    }
    if (!defaultDrinkPrice || defaultDrinkPrice <= 0) {
      alert('Set your typical drink price first!');
      return;
    }

    ensureDrinksArray(cruiseDays);

    setDrinksPerDay((prev) => {
      const copy = prev.length ? [...prev] : Array.from({ length: cruiseDays }, () => []);
      const idx = currentDay - 1;
      const entry = {
        id: Date.now() + Math.random(),
        price: defaultDrinkPrice,
      };
      copy[idx] = [...copy[idx], entry];
      return copy;
    });
  };

  const handleResetDay = () => {
    if (!window.confirm(`Reset all drinks for Day ${currentDay}?`)) return;
    setDrinksPerDay((prev) => {
      const copy = prev.length ? [...prev] : Array.from({ length: cruiseDays }, () => []);
      const idx = currentDay - 1;
      copy[idx] = [];
      return copy;
    });
  };

  const drinksToday = useMemo(() => {
    if (!drinksPerDay.length) return [];
    const idx = currentDay - 1;
    return drinksPerDay[idx] || [];
  }, [drinksPerDay, currentDay]);

  const totalConsumedToday = useMemo(
    () => drinksToday.reduce((sum, d) => sum + d.price, 0),
    [drinksToday],
  );

  const fillPercent = useMemo(() => {
    if (!packagePricePerDay || packagePricePerDay <= 0) return 0;
    const pct = (totalConsumedToday / packagePricePerDay) * 100;
    return Math.min(100, Math.round(pct));
  }, [totalConsumedToday, packagePricePerDay]);

  const gotMoneyWorth = packagePricePerDay > 0 && totalConsumedToday >= packagePricePerDay;

  const breakEvenDrinks = useMemo(() => {
    if (!packagePricePerDay || !defaultDrinkPrice) return null;
    return (packagePricePerDay / defaultDrinkPrice).toFixed(1);
  }, [packagePricePerDay, defaultDrinkPrice]);

  const handleAddJournalEntry = () => {
    if (!journalName.trim()) {
      alert('Give the drink a name!');
      return;
    }
    const ratingNum = Number(journalRating) || 0;
    const entry = {
      id: Date.now() + Math.random(),
      name: journalName.trim(),
      rating: Math.min(5, Math.max(1, ratingNum)),
      notes: journalNotes.trim(),
    };
    setJournal((prev) => [entry, ...prev]);
    setJournalName('');
    setJournalRating(5);
    setJournalNotes('');
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Did I Get My Money&apos;s Worth?</h1>
          <p className="subtitle">Cruise Drink Package Tracker</p>
        </div>
        <nav className="tabs">
          <button
            className={
              'tab-button ' + (activeTab === TABS.TRACKER ? 'active' : '')
            }
            onClick={() => setActiveTab(TABS.TRACKER)}
          >
            🍹 Daily Tracker
          </button>
          <button
            className={
              'tab-button ' + (activeTab === TABS.JOURNAL ? 'active' : '')
            }
            onClick={() => setActiveTab(TABS.JOURNAL)}
          >
            📓 Drink Journal
          </button>
        </nav>
      </header>

      <main className="layout">
        {activeTab === TABS.TRACKER && (
          <>
            <section className="left-panel">
              <h2>Cruise setup</h2>

              <div className="form-group">
                <label>Cruise length (days)</label>
                <input
                  type="number"
                  min="1"
                  value={cruiseDays}
                  onChange={(e) =>
                    handleCruiseDaysChange(parseInt(e.target.value, 10))
                  }
                />
                <p className="hint">How many days is your cruise?</p>
              </div>

              <div className="form-group">
                <label>Package price per day</label>
                <div className="input-prefix">
                  <span>$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={packagePricePerDay}
                    onChange={(e) =>
                      setPackagePricePerDay(parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <p className="hint">
                  What you pay per day for the drink package.
                </p>
              </div>

              <div className="form-group">
                <label>Typical drink price</label>
                <div className="input-prefix">
                  <span>$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={defaultDrinkPrice}
                    onChange={(e) =>
                      setDefaultDrinkPrice(parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <p className="hint">
                  Average price of cocktails, beers, etc. on board.
                </p>
              </div>

              <h2>Day controls</h2>
              <div className="form-group">
                <label>Current cruise day</label>
                <div className="day-selector">
                  <button
                    className="button ghost"
                    onClick={() =>
                      setCurrentDay((d) => Math.max(1, d - 1))
                    }
                  >
                    ◀
                  </button>
                  <span>
                    Day {currentDay} of {cruiseDays}
                  </span>
                  <button
                    className="button ghost"
                    onClick={() =>
                      setCurrentDay((d) => Math.min(cruiseDays, d + 1))
                    }
                  >
                    ▶
                  </button>
                </div>
              </div>

              <h2>Add a drink</h2>
              <p className="hint">
                Every time you order a drink on the ship, tap the button below.
              </p>
              <button className="button primary" onClick={handleAddDrink}>
                + I had a drink 🥂
              </button>
              <button className="button ghost" onClick={handleResetDay}>
                Reset this day
              </button>

              <div className="stats-card">
                <h3>Day {currentDay} stats</h3>
                <p>
                  Drinks logged:{' '}
                  <strong>{drinksToday.length}</strong>
                </p>
                <p>
                  Value consumed:{' '}
                  <strong>${totalConsumedToday.toFixed(2)}</strong>
                </p>
                {breakEvenDrinks && (
                  <p>
                    Break even at ~
                    <strong> {breakEvenDrinks} drinks/day</strong>
                  </p>
                )}
              </div>
            </section>

            <section className="center-panel">
              <div className="glass-card">
                <h2>Margarita Meter (Day {currentDay})</h2>
                <div className="glass-wrapper">
                  <div className="glass-outline">
                    <div
                      className="glass-fill"
                      style={{ height: `${fillPercent}%` }}
                    >
                      <div className="glass-gradient" />
                    </div>
                    <div className="glass-rim" />
                    <div className="glass-stem" />
                    <div className="glass-base" />
                  </div>
                </div>
                <p className="glass-percent">
                  {packagePricePerDay > 0 ? (
                    <>
                      {fillPercent}% of today&apos;s package value used
                    </>
                  ) : (
                    <>Set your daily package price to start</>
                  )}
                </p>

                <div
                  className={
                    'money-worth-banner ' + (gotMoneyWorth ? 'yes' : 'no')
                  }
                >
                  {packagePricePerDay <= 0 ? (
                    <span>Enter your package price to track value.</span>
                  ) : gotMoneyWorth ? (
                    <span>
                      ✅ YES! You got your money&apos;s worth on Day {currentDay}{' '}
                      🎉
                    </span>
                  ) : (
                    <span>
                      ❌ Not yet... you&apos;re at $
                      {totalConsumedToday.toFixed(2)} of $
                      {packagePricePerDay.toFixed(2)}.
                    </span>
                  )}
                </div>
              </div>
            </section>

            <section className="right-panel">
              <h2>Drinks log (Day {currentDay})</h2>
              {drinksToday.length === 0 && (
                <p className="hint">
                  No drinks logged yet. Tap &quot;I had a drink&quot; whenever
                  you order one.
                </p>
              )}
              <ul className="drink-list">
                {drinksToday.map((d, index) => (
                  <li key={d.id} className="drink-item">
                    <div className="drink-avatar">{index + 1}</div>
                    <div className="drink-info">
                      <div>Drink #{index + 1}</div>
                      <div className="drink-meta">
                        Value: ${d.price.toFixed(2)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {activeTab === TABS.JOURNAL && (
          <>
            <section className="left-panel">
              <h2>Add a drink to your journal</h2>
              <div className="form-group">
                <label>Drink name</label>
                <input
                  type="text"
                  value={journalName}
                  onChange={(e) => setJournalName(e.target.value)}
                  placeholder="e.g. Spicy Margarita"
                />
              </div>

              <div className="form-group">
                <label>Rating (1–5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={journalRating}
                  onChange={(e) => setJournalRating(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  rows="4"
                  value={journalNotes}
                  onChange={(e) => setJournalNotes(e.target.value)}
                  placeholder="What did you like or dislike about it?"
                />
              </div>

              <button
                className="button primary"
                onClick={handleAddJournalEntry}
              >
                Save drink to journal 📓
              </button>

              <p className="hint">
                Use this to remember your favorite cocktails across different
                cruises.
              </p>
            </section>

            <section className="center-panel journal-center">
              <h2>Drink journal summary</h2>
              {journal.length === 0 && (
                <p className="hint">
                  No journal entries yet. Log a few drinks on the left to build your
                  list.
                </p>
              )}
              <ul className="journal-list">
                {journal.map((entry) => (
                  <li key={entry.id} className="journal-item">
                    <div className="journal-header">
                      <span className="journal-name">{entry.name}</span>
                      <span className="journal-rating">
                        {'★'.repeat(entry.rating)}
                        {'☆'.repeat(5 - entry.rating)}
                      </span>
                    </div>
                    {entry.notes && (
                      <p className="journal-notes">{entry.notes}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="right-panel">
              <h2>Tip</h2>
              <p className="hint">
                You can use the daily tracker and journal together: track whether
                you beat the package each day, and remember which drinks were worth
                ordering again.
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
