import "./FiltersContent.css";

export default function FiltersContent({
  categories = [],
  selectedCategories,
  toggleCategory,
  companies = [],
  selectedCompanies,
  toggleCompany,
}) {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <div>
        <strong style={{ display: "block", marginBottom: 6 }}>Categorias</strong>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {categories.map((category) => (
            <label key={category} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={selectedCategories.has(category)}
                onChange={() => toggleCategory(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div>
        <strong style={{ display: "block", marginBottom: 6 }}>Empresas</strong>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {companies.map((company) => (
            <label key={company} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={selectedCompanies.has(company)}
                onChange={() => toggleCompany(company)}
              />
              {company}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
