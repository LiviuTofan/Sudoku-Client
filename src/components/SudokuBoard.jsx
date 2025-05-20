import React, { useState, useEffect } from 'react';
import '../styles/SudokuBoard.css';

const SudokuBoard = ({ puzzle, solution }) => {
  // State to track user's input
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [selectedCell, setSelectedCell] = useState(null);
  const [errors, setErrors] = useState(Array(9).fill().map(() => Array(9).fill(false)));
  
  // Initialize the board with the puzzle
  useEffect(() => {
    if (puzzle) {
      // Make a deep copy of the puzzle to avoid mutation
      setBoard(puzzle.map(row => [...row]));
      // Reset errors
      setErrors(Array(9).fill().map(() => Array(9).fill(false)));
    }
  }, [puzzle]);

  // Check if a cell is prefilled (part of the original puzzle)
  const isPrefilled = (row, col) => {
    return puzzle && puzzle[row][col] !== 0;
  };

  // Handle cell selection
  const handleCellClick = (row, col) => {
    // Don't allow selection of prefilled cells
    if (!isPrefilled(row, col)) {
      setSelectedCell({ row, col });
    }
  };

  // Handle number input
  const handleNumberInput = (number) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      
      // Update the board
      const newBoard = [...board];
      newBoard[row][col] = number;
      setBoard(newBoard);
      
      // Check if the move is valid according to the solution
      const newErrors = [...errors];
      newErrors[row][col] = number !== 0 && number !== solution[row][col];
      setErrors(newErrors);
    }
  };

  // Handle keyboard input
  const handleKeyDown = (e) => {
    if (selectedCell) {
      const key = e.key;
      if (/^[1-9]$/.test(key)) {
        handleNumberInput(parseInt(key));
      } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
        handleNumberInput(0);
      }
    }
  };

  // Set up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCell, board]);

  // Render the number input controls
  const renderNumberControls = () => {
    return (
      <div className="number-controls">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button 
            key={num} 
            onClick={() => handleNumberInput(num)}
            className="number-button"
          >
            {num}
          </button>
        ))}
        <button 
          onClick={() => handleNumberInput(0)}
          className="number-button clear-button"
        >
          Clear
        </button>
      </div>
    );
  };

  return (
    <div className="sudoku-container">
      <div className="sudoku-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div 
                key={colIndex} 
                className={`board-cell 
                  ${isPrefilled(rowIndex, colIndex) ? 'prefilled' : ''}
                  ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}
                  ${errors[rowIndex][colIndex] ? 'error' : ''}
                  ${rowIndex % 3 === 2 && rowIndex < 8 ? 'border-bottom' : ''}
                  ${colIndex % 3 === 2 && colIndex < 8 ? 'border-right' : ''}
                `}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      {renderNumberControls()}
    </div>
  );
};

export default SudokuBoard;