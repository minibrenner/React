// src/components/LibraryGrid/FiltersModal.jsx
import React from "react";
import { ModalShell, FiltersContent } from "@/UI";

export default function FiltersModal({
  open, onClose,
  categories, selectedCategories, toggleCategory,
  companies, selectedCompanies, toggleCompany,
  clearAll, totalAfterFilter, totalAll,
}) {
  if (!open) return null;
  return (
    <ModalShell open={open} onClose={onClose} width={720}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <h3 style={{margin:0}}>Filtros</h3>
        <span style={{opacity:.8,fontSize:".9rem"}}>Mostrando {totalAfterFilter} de {totalAll}</span>
      </div>

      <FiltersContent
        categories={categories}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        companies={companies}
        selectedCompanies={selectedCompanies}
        toggleCompany={toggleCompany}
      />

      <div style={{display:"flex",justifyContent:"flex-end",gap:10,marginTop:10}}>
        
        <button className="btn-primary" onClick={onClose}>Aplicar</button>
      </div>
    </ModalShell>
  );
}
