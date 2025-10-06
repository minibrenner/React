import HeroSection from './components/HeroSection'
import RowSection from './components/RowSection'
import ReelsCarousel from './components/ReelsCarousel'

import Footer from "./components/Footer"
 import LibraryPage from "./components/LibraryGrid/LibraryPage";
 import 'semantic-ui-css/semantic.min.css';



// Importamos arrays de dados
import { videos } from './data/videos'
import { reels } from './data/reels' // agora separado só para os Reels

export default function App() {
  // Separamos vídeos por seção
  const s1 = videos.slice(0, 4) // Section 1 → destaque
  const s2 = videos.slice(3, 7) // Section 2 → fileira de 4
  const s3 = reels              // Section 3 → carrossel de reels
  const s4 = videos    // Section 4 → grid (não implementado)


  return (
    <>
      {/* Cabeçalho da página */}
      <header className="section">
        <div className="container" style={{ display:'flex', alignItems:'center', gap:12 }}>
          
        </div>
      </header>

      {/* Sections */}
      <HeroSection videos={s1} />
      <RowSection videos={s2} />
      <ReelsCarousel videos={s3} />
       {/* Em vez de <GridSection videos={videos} />, mostramos a página com filtros */}
      <LibraryPage />
      


      {/* Rodapé */}
      <Footer />
     
    </>
  )
}
