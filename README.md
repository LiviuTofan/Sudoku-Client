# Sudoku Web App

A modern, interactive Sudoku web application built with React and featuring multiple difficulty levels, real-time feedback, and a celebration animation when you complete a puzzle.

![Sudoku App Screenshot](/src/assets/result.png)

## 🎮 Play Live

**Try it now:** [https://sudoku-client-two.vercel.app/](https://sudoku-client-two.vercel.app/)

## ✨ Features

- **Multiple Difficulty Levels**
  - Easy: Fewer empty cells for beginners
  - Medium: Balanced challenge for regular players
  - Hard: Minimal clues for expert players

- **Intelligent Puzzle Generation**
  - All puzzles have a unique solution
  - Different algorithms for each difficulty level
  - Adaptive generation based on difficulty parameters

- **Player-Friendly Interface**
  - Visual feedback with red numbers for incorrect placements
  - Progress tracking showing remaining steps to solve
  - "Show Solution" option for when you're stuck
  - Number pad for easy input

- **Customizable Experience**
  - Light/Dark mode toggle
  - Persistent settings saved in local storage
  - Auto-saves your current game progress

- **Celebration Animation**
  - Colorful confetti animation when you complete a puzzle
  - Congratulatory message to reward your achievement

## 🧩 How to Play

1. Select your preferred difficulty level (Easy, Medium, or Hard)
2. Click on an empty cell to select it
3. Enter a number using the on-screen number pad or your keyboard (1-9)
4. The game will highlight incorrect entries in red
5. Use the backspace button or key to clear a cell
6. Track your progress with the "Steps to solve" counter
7. Complete the puzzle to trigger the celebration animation!

## 🚀 Technical Details


### Testing

The application includes comprehensive test suites for the puzzle generator and solver algorithms.

Run the tests with:

```bash
npm test
```

![Test Results](/src/assets/tests.png)
## 🛠️ Installation and Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/sudoku-web-app.git
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Build for production
   ```bash
   npm run build
   ```

## 🧪 Technologies Used

- React for UI components
- CSS for styling and animations
- LocalStorage for saving game state
- Custom tests