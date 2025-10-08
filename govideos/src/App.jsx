import { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';

import HeroSection from './components/HeroSection';
import RowSection from './components/RowSection';
import ReelsCarousel from './components/ReelsCarousel';
import LibraryPage from './components/LibraryGrid/LibraryPage';
import Footer from './components/Footer';

import { fetchVideos } from './services/api'; // já existe

export default function App() {
  // Estado mínimo e didático
  const [destaques, setDestaques] = useState([]); // 2 vídeos normais
  const [reels, setReels] = useState([]);         // Reels da API
  const [loading, setLoading] = useState(true);   // carregando?
  const [error, setError] = useState(null);       // erro simples

  useEffect(() => {
    let vivo = true; // evita setState depois do unmount

    async function carregar() {
      try {
        setLoading(true);
        setError(null);

        // 1) busca 2 vídeos "normais" para o Hero
        const destaqueAPI = await fetchVideos({ tipo: 'video', limit: 2, offset: 0 });

        // 2) busca 12 reels para o carrossel
        const reelsAPI = await fetchVideos({ tipo: 'reels', limit: 12, offset: 0 });

        if (!vivo) return; // se o componente desmontou, não seta mais estado
        setDestaques(destaqueAPI);
        setReels(reelsAPI);
      } catch (e) {
        if (!vivo) return;
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (vivo) setLoading(false);
      }
    }

    carregar();
    return () => { vivo = false; };
  }, []);

  return (
    <>
      {/* Cabeçalho */}
      <header className="section">
        <div className="container" style={{ display:'flex', alignItems:'center', gap:12 }}>
          {/* Espaço para sua logo/menu etc. */}
        </div>
      </header>

      {/* Página com filtros (continua igual) */}
      <LibraryPage />

      {/* Mensagens simples de feedback */}
      {error && (
        <div className="section container" style={{ color: 'tomato' }}>
          Erro: {error}
        </div>
      )}
      {loading && (
        <div className="section container">
          Carregando…
        </div>
      )}

      {/* Quando terminar de carregar e não tiver erro, renderiza seções */}
      {!loading && !error && (
        <>
          {/* Carrossel de Reels agora vem da API */}
          <ReelsCarousel videos={reels} />

          {/* Hero recebe 2 destaques da API */}
          <HeroSection videos={destaques} />

          {/* Se quiser reativar sua RowSection depois */}
          {/* <RowSection videos={algumaLista}/> */}
        </>
      )}

      {/* Rodapé */}
      <Footer />
    </>
  );
}
