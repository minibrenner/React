import React, { useMemo, useState, useCallback } from "react";
import { videos as allVideos } from "../../data/videos"; // dados da biblioteca
import GridSection from "../GridSection";                // index.jsx export default
import FiltersBar from "./FiltersBar";                   // toolbar (UI)

// Normalizador simples (case-insensitive)
const norm = (s) => (s ?? "").toString().trim().toLowerCase();

export default function LibraryPage() {
  // ----- Estado -----
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(() => new Set());
  const [selectedCompanies, setSelectedCompanies] = useState(() => new Set());

  // ----- Opções dinâmicas (derivadas dos dados) -----
  const { categories, companies, totalAll } = useMemo(() => {
    const catSet = new Set();
    const compSet = new Set();
    for (const v of allVideos) {
      if (v?.category) catSet.add(v.category);
      if (v?.company) compSet.add(v.company);
    }
    return {
      categories: Array.from(catSet).sort(),
      companies: Array.from(compSet).sort(),
      totalAll: allVideos.length,
    };
  }, []); // se os dados são estáticos, [] é suficiente

  // ----- Handlers (toggle/clear) -----
  const toggleCategory = useCallback((cat) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }, []);

  const toggleCompany = useCallback((comp) => {
    setSelectedCompanies((prev) => {
      const next = new Set(prev);
      next.has(comp) ? next.delete(comp) : next.add(comp);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSearch("");
    setSelectedCategories(new Set());
    setSelectedCompanies(new Set());
  }, []);

  // ----- Filtro + Busca (useMemo para performance) -----
  const filteredVideos = useMemo(() => {
    const hasCat = selectedCategories.size > 0;
    const hasComp = selectedCompanies.size > 0;
    const q = norm(search);

    return allVideos.filter((v) => {
      const cat = v?.category ?? "";
      const comp = v?.company ?? "";

      // 1) Categoria
      if (hasCat && !selectedCategories.has(cat)) return false;

      // 2) Empresa
      if (hasComp && !selectedCompanies.has(comp)) return false;

      // 3) Busca textual
      if (q) {
        const inTitle = norm(v?.title).includes(q);
        const inDesc = norm(v?.description).includes(q);
        return inTitle || inDesc;
      }

      return true;
    });
  }, [search, selectedCategories, selectedCompanies]);

  // ----- Render -----
  return (
    <section className="section">
      <div className="container" style={{ display: "grid", gap: 16 }}>
        <h2 className="title-section">Biblioteca de vídeos</h2>

        <FiltersBar
          search={search}
          setSearch={setSearch}
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          companies={companies}
          selectedCompanies={selectedCompanies}
          toggleCompany={toggleCompany}
          clearAll={clearAll}
          totalAfterFilter={filteredVideos.length}
          totalAll={totalAll}
        />

        {/* Estado vazio */}
        {filteredVideos.length === 0 ? (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: 24,
              border: "1px dashed #ccc",
              borderRadius: 8,
              textAlign: "center",
              background: "#fff",
            }}
          >
            Nenhum resultado encontrado para os filtros/busca atuais.
           
          </div>
        ) : (
          <GridSection videos={filteredVideos} />
        )}
      </div>
    </section>
  );
}

