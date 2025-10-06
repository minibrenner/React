import React, { forwardRef } from "react";
import styled from "styled-components";

/**
 * ToggleHamburger
 * - genérico: pode abrir qualquer coisa (menu, filtros, sidebar…)
 * - controlado por props: `open`, `onToggle`
 * - acessível: aria-pressed, button semântico
 * - customizável: size (sm|md|lg|number), lineColor, className, style
 */
const ToggleHamburger = forwardRef(
  (
    {
      open = false,
      onToggle,
      ariaLabel = "Alternar",
      size = "md",      // "sm" | "md" | "lg" | number (px)
      lineColor = "#111",
      disabled = false,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const px =
      typeof size === "number"
        ? size
        : size === "sm"
        ? 32
        : size === "lg"
        ? 56
        : 44; // md

    return (
      <Wrap
        ref={ref}
        as="button"
        type="button"
        aria-label={ariaLabel}
        aria-pressed={open}
        disabled={disabled}
        className={className}
        style={{ "--w": `${px}px`, "--c": lineColor, ...style }}
        onClick={() => !disabled && onToggle?.()}
        {...rest}
      >
        <div className={`hamburger ${open ? "open" : ""}`}>
          <span className="line l1" />
          <span className="line l2" />
          <span className="line l3" />
        </div>
      </Wrap>
    );
  }
);

export default ToggleHamburger;

const Wrap = styled.button`
  all: unset;
  display: inline-flex;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;

  &:focus-visible { outline: 2px solid #4c9ffe; outline-offset: 2px; }
  &:disabled { opacity: .5; cursor: not-allowed; }

  .hamburger {
    width: var(--w, 44px);
    height: calc(var(--w, 44px) * 0.75);
    position: relative;
  }

  .line {
    position: absolute;
    left: 0; right: 0;
    height: 4px;
    background: var(--c, #111);
    border-radius: 2px;
    transition: transform .22s ease, opacity .22s ease, width .22s ease;
  }

  .l1 { top: 4px; }
  .l2 { top: 50%; transform: translateY(-50%); }
  .l3 { bottom: 4px; }

  .open .l1 { transform: translateY(10px) rotate(45deg); }
  .open .l2 { opacity: 0; }
  .open .l3 { transform: translateY(-10px) rotate(-45deg); }
`;
