import React, { useEffect } from "react";
import styled from "styled-components";

/**
 * Modal (genérico)
 * Props:
 * - open, onClose
 * - title? (string | node)
 * - footer? (node)
 * - size?: "sm" | "md" | "lg" | number  (largura)
 * - closeOnOverlay?: boolean (default true)
 * - closeOnEsc?: boolean (default true)
 * - children: conteúdo
 */
export default function Modal({
  open,
  onClose,
  title,
  footer,
  size = "md",
  closeOnOverlay = true,
  closeOnEsc = true,
  children,
}) {
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  const width =
    typeof size === "number" ? size : size === "sm" ? 420 : size === "lg" ? 720 : 540;

  return (
    <Overlay onClick={() => closeOnOverlay && onClose?.()}>
      <Sheet style={{ width }} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {(title || onClose) && (
          <Header>
            <div className="title">{title}</div>
            {onClose && (
              <button className="x" onClick={onClose} aria-label="Fechar">
                ✕
              </button>
            )}
          </Header>
        )}
        <Content>{children}</Content>
        {footer && <Footer>{footer}</Footer>}
      </Sheet>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed; inset: 0; z-index: 60;
  background: rgba(0,0,0,.35);
  display: grid; place-items: center;
`;

const Sheet = styled.div`
  background: #fff; color: #111; border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
  max-width: 95vw; max-height: 85vh; overflow: auto;
`;

const Header = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; border-bottom: 1px solid #eee;
  .title { font-weight: 600; font-size: 16px; }
  .x { background: transparent; border: 0; font-size: 18px; cursor: pointer; }
`;

const Content = styled.div` padding: 16px; `;
const Footer  = styled.div` padding: 12px 16px; border-top: 1px solid #eee; `;
