import './VideoCard.css'
import VideoEmbed from '../VideoEmbed'

export default function VideoCard({ video, vertical = false }) {
  return (
    <div className="card">
      <VideoEmbed youtubeId={video.youtubeId} vertical={vertical} title={video.title} />
      <div className="card-body">
        <div className="title">{video.title}</div>
        <p className="desc">{video.description}</p>
      </div>
    </div>
  )
}
