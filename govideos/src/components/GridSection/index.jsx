import "./GridSection.css";
import React, { useMemo, useState } from "react";
import VideoCard from "../VideoCard";
import Button from "../../UI/Button"; // <— ajuste o path se necessário
import "../../styles/global.css";

export default function GridSection({
  videos,
  title = "Vídeos",
  toolbar = null,
  emptyMessage = "Sem resultados para os filtros/pesquisa."
}) {
  const [showAll, setShowAll] = useState(false);

  // Ordena do mais novo pro mais antigo quando tiver data; senão mantém a ordem recebida
  const ordered = useMemo(() => {
    const hasDate = videos?.some(v => v.publishedAt || v.date || v.createdAt);
    if (!hasDate) return videos;
    return [...videos].sort(
      (a, b) =>
        new Date(b.publishedAt ?? b.date ?? b.createdAt ?? 0) -
        new Date(a.publishedAt ?? a.date ?? a.createdAt ?? 0)
    );
  }, [videos]);

  // Só 4 por padrão; tudo quando clicar “Ver mais”
  const visibleVideos = showAll ? ordered : ordered.slice(0, 4);

  const hasMore = videos.length > 4;

  return (
    <section className="section">
      <div className="container">
        {/* Título opcional (se quiser exibir) */}
        {/* <h2 className="grid-title">{title}</h2> */}

        {/* Slot opcional para UI de filtros/pesquisa */}
        {toolbar && <div className="grid-toolbar">{toolbar}</div>}

        {videos.length === 0 ? (
          <p className="empty-state">{emptyMessage}</p>
        ) : (
          <>
            <div className="video-grid">
              {visibleVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>

            {hasMore && (
              <div className="grid-footer">
                <Button
                  label={showAll ? "Ver menos" : "Ver mais"}
                  onClick={() => setShowAll((v) => !v)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
