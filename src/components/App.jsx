import React, { useState, useEffect } from 'react'
import SudokuBoard from './SudokuBoard'
import DifficultySelector from './DifficultySelector'
import '../styles/App.css'

// Dummy function for generateSudoku - replace this with your actual function
const generateSudoku = (difficulty) => {
  console.log("Generating sudoku with difficulty:", difficulty);
  
  // Create an empty 9x9 grid
  const createEmptyGrid = () => Array(9).fill().map(() => Array(9).fill(0));
  
  // Generate a simple puzzle based on difficulty
  const puzzle = createEmptyGrid();
  const solution = createEmptyGrid();
  
  // Fill in some numbers for the puzzle and solution
  // This is just a placeholder - your actual generator would be more complex
  const filledCells = difficulty === 'easy' ? 35 : (difficulty === 'medium' ? 30 : 25);
  
  // Create a simple solution (not a valid sudoku, just for demonstration)
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // Simple pattern for the solution
      solution[i][j] = ((i*3 + Math.floor(i/3) + j) % 9) + 1;
    }
  }
  
  // Create the puzzle by copying some cells from the solution
  const positions = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push([i, j]);
    }
  }
  
  // Shuffle positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  
  // Fill the puzzle with the first 'filledCells' positions
  for (let i = 0; i < filledCells; i++) {
    const [row, col] = positions[i];
    puzzle[row][col] = solution[row][col];
  }
  
  return {
    puzzle,
    solution
  };
};

// Load saved theme from localStorage
const getSavedTheme = () => {
  const savedTheme = localStorage.getItem('sudokuTheme')
  return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

function App() {
  const [difficulty, setDifficulty] = useState('medium')
  const [puzzle, setPuzzle] = useState(null)
  const [solution, setSolution] = useState(null)
  const [theme, setTheme] = useState(getSavedTheme())

  // Generate a new puzzle when difficulty changes
  useEffect(() => {
    generateNewPuzzle()
  }, [difficulty])

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('sudokuTheme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const generateNewPuzzle = () => {
    // Generate new puzzle
    const { puzzle, solution } = generateSudoku(difficulty)
    setPuzzle(puzzle)
    setSolution(solution)

    // Save current puzzle to localStorage
    const puzzleData = {
      difficulty,
      puzzle,
      solution,
      timestamp: Date.now()
    }
    localStorage.setItem('currentSudoku', JSON.stringify(puzzleData))
  }

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // If no puzzle is loaded yet, try to load from localStorage
  useEffect(() => {
    if (!puzzle) {
      const savedPuzzle = localStorage.getItem('currentSudoku')
      if (savedPuzzle) {
        try {
          const { puzzle, solution, difficulty } = JSON.parse(savedPuzzle)
          setPuzzle(puzzle)
          setSolution(solution)
          setDifficulty(difficulty)
        } catch (e) {
          // If there's an error parsing, generate a new puzzle
          generateNewPuzzle()
        }
      } else {
        // If no saved puzzle, generate a new one
        generateNewPuzzle()
      }
    }
  }, [])

  return (
    <div className="app-container">
      <header>
        <h1>Sudoku</h1>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <main>
        <div className="controls">
          <DifficultySelector 
            difficulty={difficulty} 
            onDifficultyChange={setDifficulty} 
          />
          <button className="new-game-btn" onClick={generateNewPuzzle}>
            New Game
          </button>
        </div>

        {puzzle && (
          <SudokuBoard 
            puzzle={puzzle} 
            solution={solution}
          />
        )}
      </main>

      <footer>
        <p>Client-side Sudoku Generator &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App