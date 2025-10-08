import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import GridSection from "../GridSection";
import FiltersBar from "./FiltersBar";
import { fetchVideos } from "../../services/api";

const PLACEHOLDER_THUMB = `${import.meta.env.BASE_URL}placeholder-thumb.svg`;
const norm = (value) => (value ?? "").toString().trim().toLowerCase();

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(() => new Set());
  const [selectedCompanies, setSelectedCompanies] = useState(() => new Set());

  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setErr("");
        setLoading(true);

        const data = await fetchVideos({
          limit: 9999,
          offset: 0,
          tipo: "video",
        });

        if (cancelled) return;

        const normalized = data.map((video) => {
          if (video.youtubeId) {
            return {
              ...video,
              thumbUrl: `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`,
            };
          }

          const thumb = video.thumbUrl;
          if (typeof thumb === "string" && thumb.length > 0) {
            if (/^https?:\/\//i.test(thumb)) {
              return { ...video, thumbUrl: thumb };
            }
            const normalizedPath = thumb.startsWith("/")
              ? thumb.slice(1)
              : thumb;
            return {
              ...video,
              thumbUrl: `${import.meta.env.BASE_URL}${normalizedPath}`,
            };
          }

          return { ...video, thumbUrl: PLACEHOLDER_THUMB };
        });

        setAllVideos(normalized);
      } catch (error) {
        if (!cancelled) {
          setErr(error?.message || "Erro ao carregar videos");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const { categories, companies, totalAll } = useMemo(() => {
    const categorySet = new Set();
    const companySet = new Set();

    allVideos.forEach((video) => {
      if (video?.category) {
        categorySet.add(video.category);
      }
      if (video?.company) {
        companySet.add(video.company);
      }
    });

    return {
      categories: Array.from(categorySet).sort(),
      companies: Array.from(companySet).sort(),
      totalAll: allVideos.length,
    };
  }, [allVideos]);

  const toggleCategory = useCallback((category) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const toggleCompany = useCallback((company) => {
    setSelectedCompanies((prev) => {
      const next = new Set(prev);
      if (next.has(company)) {
        next.delete(company);
      } else {
        next.add(company);
      }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSearch("");
    setSelectedCategories(new Set());
    setSelectedCompanies(new Set());
  }, []);

  const filteredVideos = useMemo(() => {
    const hasCategoryFilter = selectedCategories.size > 0;
    const hasCompanyFilter = selectedCompanies.size > 0;
    const query = norm(search);

    return allVideos.filter((video) => {
      const category = video?.category ?? "";
      const company = video?.company ?? "";

      if (hasCategoryFilter && !selectedCategories.has(category)) {
        return false;
      }

      if (hasCompanyFilter && !selectedCompanies.has(company)) {
        return false;
      }

      if (query) {
        const matchTitle = norm(video?.title).includes(query);
        const matchDescription = norm(video?.description).includes(query);
        return matchTitle || matchDescription;
      }

      return true;
    });
  }, [search, selectedCategories, selectedCompanies, allVideos]);

  return (
    <section className="section">
      <div className="container" style={{ display: "grid", gap: 16 }}>
        <h2 className="title-section">Videos</h2>

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

        {loading && <p style={{ opacity: 0.8 }}>Carregando videos...</p>}
        {err && !loading && <p style={{ color: "tomato" }}>{err}</p>}

        {!loading && !err && (
          filteredVideos.length === 0 ? (
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
              Nenhum resultado encontrado para os filtros ou busca atuais.
            </div>
          ) : (
            <GridSection videos={filteredVideos} />
          )
        )}
      </div>
    </section>
  );
}
