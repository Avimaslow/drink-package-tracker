Drink Package Tracker
A web application that helps cruise passengers determine whether their drink package purchase was worth the cost.
Built with React and Vite, this project provides a modern, interactive interface featuring a visual drink meter that fills up as you log drinks each day. It also includes a journal tab to record and rate drinks throughout your cruise.
Features
Value tracking
Enter your cruise length, drink package cost per day, and average drink price. The app calculates your break-even point automatically.
Visual progress indicator
A margarita glass visualization fills as you log drinks, showing how much value you’ve used for the day.
Multi-day tracking
Switch between cruise days and record drinks for each day separately.
Drink journal
Keep a record of every drink you try, with ratings and notes.
Planned: Local data storage
A future update will allow the app to save your progress locally between sessions.
Tech Stack
Category	Technology
Frontend	React + Vite
Styling	Modern CSS (glassmorphism UI)
State Management	React Hooks
Build Tool	Vite
Deployment	GitHub Pages / Netlify / AWS Amplify
Getting Started
1. Clone the repository
git clone https://github.com/<your-username>/drink-package-tracker.git
cd drink-package-tracker
2. Install dependencies
npm install
3. Run the project locally
npm run dev
Once the server starts, open the local development URL shown in your terminal, for example:
http://localhost:5173
How It Works
Enter your cruise length, average drink cost, and package cost per day.
Each time you order a drink, click "I had a drink."
The app calculates your progress toward breaking even and fills the margarita glass meter.
Once your total drink value exceeds your package cost, it indicates that you’ve gotten your money’s worth.
Use the Drink Journal tab to record each drink, rating, and notes.
Project Structure
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
Inspiration
Designed for cruise travelers who want a simple and data-driven way to know whether their drink package is worth it.
License
MIT License © 2025
Developed by Your Name
