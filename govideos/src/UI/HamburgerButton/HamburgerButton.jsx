import React from "react";
import styled from "styled-components";

export default function HamburgerButton({ onClick, title = "Filtros", "aria-label": ariaLabel = "Abrir filtros" }) {
  return (
    <Btn onClick={onClick} aria-label={ariaLabel} title={title}>
      <div className="line1" />
      <div className="line2" />
      <div className="line3" />
    </Btn>
  );
}

const Btn = styled.button`
  position: relative;
  width: 46px; height: 40px;
  background-color: rgba(59, 59, 59, 0.09);
  border: 1px solid rgba(85, 85, 85, 0);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* For Safari */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgba(8, 8, 8, 0.21);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.91);
    box-shadow: 0 2px 4px rgba(197, 0, 0, 0.1);
    transform: translateY(1px);
  }

  div {
    position: absolute; left: 50%;
    width: 26px; height: 3px; background: #58585898; border-radius: 2px;
    transform: translateX(-50%); transition: .25s;
  }
  .line1 { top: 11px; }
  .line2 { top: 50%; transform: translate(-50%, -50%); }
  .line3 { bottom: 11px; }
`;
