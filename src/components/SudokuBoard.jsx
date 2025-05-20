
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [selectedCell, setSelectedCell] = useState(null);
  const [errors, setErrors] = useState(Array(9).fill().map(() => Array(9).fill(false)));
  const [showingSolution, setShowingSolution] = useState(false);

  const isPrefilled = (row, col) => {
    return puzzle && puzzle[row][col] !== 0;
  };

      if (solution) {
        setBoard(solution.map(row => [...row]));
      }
    } else {

        setErrors(Array(9).fill().map(() => Array(9).fill(false)));
      }
    }
  };


    if (!isPrefilled(row, col)) {
      setSelectedCell({ row, col });
    }
  };


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
    if (selectedCell && !showingSolution) {
      const key = e.key;
      if (/^[1-9]$/.test(key)) {
        handleNumberInput(parseInt(key));
      } else if (key === 'Backspace' || key === 'Delete' || key === '0') {
        handleNumberInput(0);
      }
    }
  };


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCell, board]);


  const handleClear = () => {
    handleNumberInput(0);
  };


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
          onClick={handleClear}
          className="number-button backspace-button"
        >
          ←
        </button>
      </div>
    );
  };


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
                  ${showingSolution ? 'solution-view' : ''}
                `}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="board-controls">
        {!showingSolution && renderNumberControls()}
        
        {!showingSolution && (
          <div className="steps-counter">

          </div>
        )}
        
        <button 
          className={`solution-button ${showingSolution ? 'showing-solution' : ''}`}
          onClick={toggleSolution}
        >
          {showingSolution ? 'Hide Solution' : 'Show Solution'}
        </button>
      </div>
    </div>
  );
};

export default SudokuBoard;