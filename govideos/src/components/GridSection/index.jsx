import "./GridSection.css";
import VideoCard from "../VideoCard";
import React from "react";
import "../../styles/global.css";

export default function GridSection({
  videos,
  title = "Biblioteca de vídeos",
  toolbar = null,
  emptyMessage = "Sem resultados para os filtros/pesquisa."
}) {
  return (
    <section className="section">
      <div className="container">
       

        {/* Slot opcional para UI de filtros/pesquisa */}
        {toolbar && <div className="grid-toolbar">{toolbar}</div>}

        {videos.length === 0 ? (
          <p className="empty-state">{emptyMessage}</p>
        ) : (
          <div className="video-grid">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
