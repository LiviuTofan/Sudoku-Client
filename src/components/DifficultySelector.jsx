import React from 'react'
import '../styles/DifficultySelector.css'

function DifficultySelector({ difficulty, onDifficultyChange }) {
  const difficulties = ['easy', 'medium', 'hard']
  
  return (
    <div className="difficulty-selector">
      <label htmlFor="difficulty-select">Difficulty:</label>
      <select 
        id="difficulty-select"
        value={difficulty} 
        onChange={(e) => onDifficultyChange(e.target.value)}
      >
        {difficulties.map(diff => (
          <option key={diff} value={diff}>
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DifficultySelector