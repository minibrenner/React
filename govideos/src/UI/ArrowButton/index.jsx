import React from 'react'
import './ArrowButton.css'

const ArrowButton = ({ direction = "next", onClick, disabled }) => {
  return (
    <button
      className={`arrow-wrapper ${direction}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="arrow">
        <div className="arrow-top" />
        <div className="arrow-bottom" />
      </div>
    </button>
  )
}

export default ArrowButton