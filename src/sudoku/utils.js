// src/sudoku/utils.js - Utility functions for the sudoku game

/**
 * Shuffles an array in-place using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 */
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  /**
   * Finds an empty cell in the grid
   * @param {Array<Array<number>>} grid - The sudoku grid
   * @returns {Object|null} Object with row and col properties, or null if no empty cell found
   */
  export function findEmptyCell(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          return { row, col };
        }
      }
    }
    return null;
  }
  
  /**
   * Checks if placing a number at a specific position is valid
   * @param {Array<Array<number>>} grid - The sudoku grid
   * @param {number} row - Row index
   * @param {number} col - Column index
   * @param {number} num - Number to place
   * @returns {boolean} True if the placement is valid
   */
  export function isValidPlacement(grid, row, col, num) {
    // Check row
    for (let c = 0; c < 9; c++) {
      if (grid[row][c] === num) return false;
    }
    
    // Check column
    for (let r = 0; r < 9; r++) {
      if (grid[r][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (grid[boxRow + r][boxCol + c] === num) return false;
      }
    }
    
    return true;
  }
  
  /**
   * Helper function to print a sudoku grid to the console
   * @param {Array<Array<number>>} grid - The sudoku grid to print
   */
  export function printGrid(grid) {
    let output = "";
    for (let row = 0; row < 9; row++) {
      if (row % 3 === 0 && row !== 0) {
        output += "-".repeat(21) + "\n";
      }
      
      let rowStr = "";
      for (let col = 0; col < 9; col++) {
        if (col % 3 === 0 && col !== 0) {
          rowStr += "| ";
        }
        
        const cell = grid[row][col];
        rowStr += cell === 0 ? ". " : cell + " ";
      }
      
      output += rowStr + "\n";
    }
    
    console.log(output);
    return output;
  }