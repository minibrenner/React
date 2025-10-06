import React, { useEffect } from "react";
import styled from "styled-components";

export default function ModalShell({ open, onClose, children, width = 720 }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <Panel style={{ width: `min(${width}px, 92vw)` }} onClick={(e) => e.stopPropagation()}>
        {children}
      </Panel>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,.45);
  display: grid; place-items: center; z-index: 60;
`;
const Panel = styled.div`
  max-height: 85vh; overflow: auto;
  background: #242832;
  background-image: linear-gradient(139deg,#242832 0%,#242832 0%,#251c28 100%);
  color: #e8e8e8;
  border-radius: 14px; padding: 18px 18px 14px;
  box-shadow: 0 20px 60px rgba(0,0,0,.4);
`;
