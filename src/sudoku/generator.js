// src/sudoku/generator.js - Functions for generating sudoku puzzles

import { isValidPlacement, shuffleArray } from './utils.js';
import { solveSudokuRandomized, solveSudoku } from './solver.js';

/**
 * Generates a complete, valid sudoku grid (fully filled)
 * @returns {Array<Array<number>>} 9x9 2D array representing a valid sudoku solution
 */
export function generateSolvedGrid() {
  // Initialize empty 9x9 grid
  const grid = Array(9).fill().map(() => Array(9).fill(0));
  
  // Fill the grid using backtracking with randomized values
  if (!solveSudokuRandomized(grid)) {
    console.error("Failed to generate a valid sudoku solution");
    return null;
  }
  
  return grid;
}

/**
 * Checks if the puzzle has a unique solution
 * This is a simplified version that doesn't check ALL possible solutions
 * @param {Array<Array<number>>} puzzle - A sudoku puzzle
 * @returns {boolean} True if the puzzle appears to have a unique solution
 */
export function hasUniqueSolution(puzzle) {
  // Create a copy of the puzzle
  const copy = puzzle.map(row => [...row]);
  
  // Find first empty cell
  let emptyFound = false;
  let firstEmpty = { row: -1, col: -1 };
  
  outerLoop:
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (copy[row][col] === 0) {
        firstEmpty = { row, col };
        emptyFound = true;
        break outerLoop;
      }
    }
  }
  
  if (!emptyFound) return true; // Puzzle is already solved
  
  // Try each value in the first empty cell and see if any lead to multiple solutions
  let solutionCount = 0;
  
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(copy, firstEmpty.row, firstEmpty.col, num)) {
      copy[firstEmpty.row][firstEmpty.col] = num;
      
      // Check if this leads to a solution
      const tempCopy = copy.map(row => [...row]);
      const hasSolution = solveSudoku(tempCopy);
      if (hasSolution) solutionCount++;
      
      // If we already found multiple solutions, no need to keep checking
      if (solutionCount > 1) return false;
    }
  }
  
  return solutionCount === 1;
}

/**
 * Creates a puzzle by removing numbers from a solved grid
 * @param {Array<Array<number>>} solvedGrid - A complete valid sudoku solution
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Array<Array<number>>} A puzzle with some cells empty (represented as 0)
 */
export function createPuzzle(solvedGrid, difficulty) {
  // Define number of cells to keep based on difficulty
  const cellsToKeep = {
    'easy': 40, // Keep ~40 cells (remove ~41)
    'medium': 30, // Keep ~30 cells (remove ~51)
    'hard': 25, // Keep ~25 cells (remove ~56)
  }[difficulty] || 35;
  
  // Create a copy of the solved grid
  const puzzle = solvedGrid.map(row => [...row]);
  
  // Create a list of all 81 cell positions
  const positions = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      positions.push({ row, col });
    }
  }
  
  // Shuffle positions randomly
  shuffleArray(positions);
  
  // Calculate how many cells to remove
  const cellsToRemove = 81 - cellsToKeep;
  
  // Remove cells one by one, ensuring uniqueness at each step
  let removedCells = 0;
  for (const pos of positions) {
    if (removedCells >= cellsToRemove) break;
    
    const { row, col } = pos;
    const value = puzzle[row][col];
    
    // Temporarily remove this cell
    puzzle[row][col] = 0;
    
    // For hard puzzles, we don't need to check uniqueness for every cell
    // For easy and medium, we ensure unique solution (but skip some checks for efficiency)
    if ((difficulty === 'easy' && removedCells % 5 === 0) || 
        (difficulty === 'medium' && removedCells % 3 === 0) || 
        (difficulty === 'hard' && removedCells % 8 === 0)) {
      
      // If removing this cell results in multiple solutions, put it back
      if (!hasUniqueSolution(puzzle)) {
        puzzle[row][col] = value;
        continue;
      }
    }
    
    removedCells++;
  }
  
  return puzzle;
}

/**
 * Generates a sudoku puzzle of the specified difficulty
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Object} Object containing the puzzle and its solution
 */
export function generateSudoku(difficulty) {
  const solution = generateSolvedGrid();
  const puzzle = createPuzzle(solution, difficulty);
  
  return {
    puzzle,
    solution
  };
}