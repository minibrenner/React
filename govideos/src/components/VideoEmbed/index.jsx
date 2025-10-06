import './VideoEmbed.css'
import { useState } from 'react'

export default function VideoEmbed({ youtubeId, vertical = false, title }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const cls = vertical ? 'ratio-9x16' : 'ratio-16x9'
  const src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`
  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`

  return (
    <div className={cls}>
      {isPlaying ? (
        <iframe src={src} title={title} allowFullScreen />
      ) : (
        <>
          <img src={thumbnail} alt={title} onClick={() => setIsPlaying(true)} />
          <button 
          className='buttonVideo'
          onClick={() => setIsPlaying(true)}>▶</button>
        </>
      )}
    </div>
  )
}
