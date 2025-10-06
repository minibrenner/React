import React from 'react'
import './Button.css'

const Button = ({ label, onClick }) => {
  return (
    <button 
      onClick={onClick}   // agora usamos a função recebida como props
      className="button"
    >
      {label}             {/* renderiza o texto que veio como props */}
    </button>
  )
}

export default Button
