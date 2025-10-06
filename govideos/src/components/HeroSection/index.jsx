import './HeroSection.css'
import VideoCard from '../VideoCard'

export default function HeroSection({ videos }) {
  // Esperamos exatamente 4 vídeos: 2 em cada coluna
  return (
    <section className="section">
      <div className="container">
        <h2 className="title-section">Destaques</h2>
        
        <div className="hero-grid">
          {videos.slice(0, 4).map((video, i) => (
            <VideoCard key={i} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}
