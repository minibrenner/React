import "./VideoEmbed.css";
import { useState } from "react";

const placeholderThumb = `${import.meta.env.BASE_URL}placeholder-thumb.svg`;

export default function VideoEmbed({ youtubeId, vertical = false, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbError, setThumbError] = useState(false);
  const cls = vertical ? "ratio-9x16" : "ratio-16x9";

  if (!youtubeId) {
    return (
      <div className={cls}>
        <img
          src={placeholderThumb}
          alt={`Sem video disponivel para ${title}`}
        />
      </div>
    );
  }

  const src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <div className={cls}>
      {isPlaying ? (
        <iframe src={src} title={title} allowFullScreen />
      ) : (
        <>
          <img
            src={thumbError ? placeholderThumb : thumbnail}
            alt={title}
            onClick={() => setIsPlaying(true)}
            onError={() => setThumbError(true)}
          />
          <button className="buttonVideo" onClick={() => setIsPlaying(true)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7-11-7z" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
