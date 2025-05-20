// src/sudoku/index.js - Main entry point for sudoku module

import { generateSudoku as genSudoku } from './generator.js';
import { isValidMove, isSolved, solveSudoku } from './solver.js';
import { printGrid } from './utils.js';

// Create a version of generateSudoku that returns a deep copy
// to prevent accidental mutation in React components
const generateSudoku = (difficulty) => {
  const result = genSudoku(difficulty);
  
  return {
    puzzle: result.puzzle.map(row => [...row]),
    solution: result.solution.map(row => [...row])
  };
};

// Re-export the main functions that should be accessible outside
export {
  generateSudoku,
  isValidMove,
  isSolved,
  solveSudoku,
  printGrid
};
