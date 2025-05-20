// src/sudoku/solver.js - Functions for solving sudoku puzzles

import { findEmptyCell, isValidPlacement, shuffleArray } from './utils.js';

/**
 * Solves a sudoku puzzle using backtracking
 * @param {Array<Array<number>>} grid - The sudoku grid to solve
 * @returns {boolean} True if a solution was found, false otherwise
 */
export function solveSudoku(grid) {
  // Find an empty cell
  let emptyCell = findEmptyCell(grid);
  
  // If no empty cell is found, the puzzle is solved
  if (!emptyCell) return true;
  
  const { row, col } = emptyCell;
  
  // Try each number 1-9 in the empty cell (in order for deterministic solving)
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      // Place the number if it's valid
      grid[row][col] = num;
      
      // Recursively try to solve the rest of the puzzle
      if (solveSudoku(grid)) {
        return true;
      }
      
      // If we couldn't solve the puzzle with this number, backtrack
      grid[row][col] = 0;
    }
  }
  
  // No solution found with any number
  return false;
}

/**
 * Solves a sudoku puzzle using backtracking with randomized number selection
 * Used for generating puzzles
 * @param {Array<Array<number>>} grid - The sudoku grid to solve
 * @returns {boolean} True if a solution was found, false otherwise
 */
export function solveSudokuRandomized(grid) {
  // Find an empty cell
  let emptyCell = findEmptyCell(grid);
  
  // If no empty cell is found, the puzzle is solved
  if (!emptyCell) return true;
  
  const { row, col } = emptyCell;
  
  // Get a shuffled array of numbers 1-9 (for random generation)
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  shuffleArray(numbers);
  
  // Try each number in the empty cell
  for (const num of numbers) {
    if (isValidPlacement(grid, row, col, num)) {
      // Place the number if it's valid
      grid[row][col] = num;
      
      // Recursively try to solve the rest of the puzzle
      if (solveSudokuRandomized(grid)) {
        return true;
      }
      
      // If we couldn't solve the puzzle with this number, backtrack
      grid[row][col] = 0;
    }
  }
  
  // No solution found with any number
  return false;
}

/**
 * Checks if the current puzzle state is solved correctly
 * @param {Array<Array<number>>} grid - The current puzzle state
 * @returns {boolean} Whether the puzzle is solved correctly
 */
export function isSolved(grid) {
  // Check if all cells are filled
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) return false;
    }
  }
  
  // Check each row
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      seen.add(grid[row][col]);
    }
    if (seen.size !== 9) return false;
  }
  
  // Check each column
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      seen.add(grid[row][col]);
    }
    if (seen.size !== 9) return false;
  }
  
  // Check each 3x3 box
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set();
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          seen.add(grid[boxRow * 3 + row][boxCol * 3 + col]);
        }
      }
      if (seen.size !== 9) return false;
    }
  }
  
  return true;
}

/**
 * Checks if a given value is valid in a specific cell in the puzzle
 * @param {Array<Array<number>>} grid - The current puzzle state
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} value - The value to check
 * @returns {boolean} Whether the value is valid in that position
 */
export function isValidMove(grid, row, col, value) {
  return isValidPlacement(grid, row, col, value);
}