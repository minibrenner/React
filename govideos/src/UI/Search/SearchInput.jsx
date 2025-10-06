import React from "react";
import styled from "styled-components";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
  "aria-label": ariaLabel = "Buscar",
}) {
  return (
    <Wrap>
      <svg className="icon" viewBox="0 0 24 24" aria-hidden>
        <path d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
      <input
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative; display: flex; align-items: center; width: 100%;
  .icon { position: absolute; left: 12px; width: 18px; height: 18px; color: #6b7280; }
  input {
    width: 100%; padding: 10px 12px 10px 36px;
    border: 1px solid #d1d5db; border-radius: 10px; outline: none;
    background: #fff; color: #111827; transition: border-color .15s ease, box-shadow .15s ease;
  }
  input::placeholder { color: #9ca3af79; }
  input:focus { border-color: #8a8a8a59; box-shadow: 0 0 0 3px rgba(83,83,255,.12); }
`;
