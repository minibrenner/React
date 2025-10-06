// src/components/LibraryGrid/FiltersBar.jsx
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SearchInput, FiltersContent, HamburgerButton } from "@/UI";

export default function FiltersBar({
  // estado/lógica vindos do LibraryPage
  search, setSearch,
  categories, selectedCategories, toggleCategory,
  companies, selectedCompanies, toggleCompany,
  clearAll, totalAfterFilter, totalAll,
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (
        panelRef.current?.contains(event.target) ||
        triggerRef.current?.contains(event.target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <Bar>
        <div className="search">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar por título ou descrição..."
          />
        </div>

        <ToggleWrap ref={triggerRef}>
          <HamburgerButton onClick={() => setOpen((prev) => !prev)} />
          {open && (
            <Popover ref={panelRef} role="dialog" aria-modal="false">
              <Header>
                <h3>Filtros</h3>
                <span>Mostrando {totalAfterFilter} de {totalAll}</span>
              </Header>

              <Content>
                <FiltersContent
                  categories={categories}
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  companies={companies}
                  selectedCompanies={selectedCompanies}
                  toggleCompany={toggleCompany}
                />
              </Content>

              <Footer>
                <button className="btn-outline" type="button" onClick={clearAll}>
                  Limpar filtros
                </button>
                <button className="btn-primary" type="button" onClick={() => setOpen(false)}>
                  Aplicar
                </button>
              </Footer>
            </Popover>
          )}
        </ToggleWrap>
      </Bar>
    </>
  );
}

const Bar = styled.div`
  display: grid; grid-template-columns: 1fr auto; gap: 10px; align-items: center;
`;

const ToggleWrap = styled.div`
  position: relative;
  justify-self: end;
`;

const Popover = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(720px, 90vw);
  max-height: 70vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: #0039c9a1;
  background-image: linear-gradient(139deg, #242832c7 0%, #242832e1 0%, #251c28d5 100%);
  color: #e8e8e8;
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  padding: 18px 18px 14px;
  z-index: 70;
`;

const Header = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
  h3 { margin: 0; }
  span { opacity: .8; font-size: .9rem; }
`;

const Content = styled.div`
  max-height: 45vh;
  overflow: auto;
`;

const Footer = styled.div`
  display: flex; justify-content: flex-end; gap: 10px; margin-top: 12px;
  button {
    min-width: 120px;
    height: 40px;
    border-radius: 10px;
    padding: 0 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  .btn-outline {
    background: transparent;
    color: #e8e8e8;
    border: 1px solid #5a5f6b;
  }
  .btn-outline:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  .btn-primary {
    background: #5353ff;
    color: #fff;
    border: none;
  }
  .btn-primary:hover {
    background: #4343e6;
  }
`;
