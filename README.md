# **Drink Package Tracker**

**A modern web application that helps cruise passengers determine whether their drink package purchase was worth the cost.**

Built with **React** and **Vite**, this project provides a clean and interactive interface featuring a visual drink meter that fills as you log drinks each day, plus a journal to rate and record your favorites.

---

## **Overview**

> *“Did I really get my money’s worth from my drink package?”*

This project helps answer that question by turning cruise drink tracking into a fun, data-driven experience.  
You can track your daily consumption, visualize progress with an animated margarita glass, and record your favorite drinks in a built-in journal.

---

## **Features**

- **Automatic value tracking**  
  Enter your cruise length, daily package cost, and average drink price. The app automatically calculates your break-even point.

- **Visual progress indicator**  
  The margarita glass fills as you log drinks, showing how much value you’ve consumed that day.

- **Multi-day tracking**  
  Manage drink logs separately for each day of your cruise.

- **Drink journal**  
  Record drinks, ratings, and personal notes to remember your favorites.

- **Planned: Local storage support**  
  A future version will let you save progress between sessions.

---

## **Tech Stack**

| Category | Technology |
|-----------|-------------|
| Framework | React + Vite |
| Styling | Modern CSS (glassmorphism UI) |
| State Management | React Hooks |
| Build Tool | Vite |
| Deployment | GitHub Pages / Netlify / AWS Amplify |

---

## **Getting Started**

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/drink-package-tracker.git
cd drink-package-tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the project locally
```bash
npm run dev
```

After the server starts, open the local URL shown in your terminal, for example:
```
http://localhost:5173
```

---

## **How It Works**

1. Set your cruise length, average drink cost, and daily drink package cost.  
2. Each time you order a drink, click **"I had a drink."**  
3. The app calculates your total drink value for the day and updates the progress meter.  
4. Once your total drink value exceeds your package cost, it confirms that you’ve gotten your money’s worth.  
5. Use the **Drink Journal** tab to log drink names, ratings, and notes.

---

## **Project Structure**

```
drink-package-tracker/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## **Inspiration**

Created for cruise travelers who want a simple, visual, and data-driven way to understand whether their drink package was worth it.

---

## **License**

MIT License © 2025  
Developed by [Avi Maslow](https://github.com/Avimaslow?tab=repositories)
