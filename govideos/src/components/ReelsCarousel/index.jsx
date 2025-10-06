// ----------------------------------------------------------------------------
// ReelsCarousel/index.jsx
// ----------------------------------------------------------------------------

// Importamos o CSS específico deste componente.
// Isso deixa o estilo organizado "ao lado" do componente.
import "./ReelsCarousel.css";
import ArrowButton from "../../UI/ArrowButton";
import "../../styles/global.css"

// Importamos três "hooks" do React.
// - useRef: guarda uma referência (um "atalho") para um elemento real do DOM.
// - useState: cria um "estado" (valor que muda) e obriga o React a redesenhar quando muda.
// - useEffect: executa efeitos colaterais APÓS o React desenhar a tela (ex.: assinar eventos).
import { useRef, useState, useEffect } from "react";

// Importamos o componente que desenha cada cartão de vídeo.
// Ele recebe um objeto "video" e (opcionalmente) a prop "vertical" para formato 9:16.
import VideoCard from "../VideoCard";

// ----------------------------------------------------------------------------
// Definimos o componente de função "ReelsCarousel".
// Em React, componentes começam com LETRA MAIÚSCULA.
// Recebemos "videos" como PROP (dados vindos do pai, ex.: App.jsx).
// ----------------------------------------------------------------------------
export default function ReelsCarousel({ videos }) {
  // --------------------------------------------------------------------------
  // 1) useRef: criamos uma "ref" para acessar o elemento real do DOM do trilho.
  // --------------------------------------------------------------------------
  // - No começo, "current" é null porque o elemento ainda NÃO foi desenhado.
  // - Quando o JSX <div ref={trackRef} ...> for renderizado,
  //   o React colocará o elemento DOM real dentro de "trackRef.current".
  //   Ex.: trackRef.current === <div class="carousel-track">...</div>
  const trackRef = useRef(null);

  // --------------------------------------------------------------------------
  // 2) useState: criamos dois estados para controlar os botões ◀ (voltar) e ▶ (avançar).
  // --------------------------------------------------------------------------
  // - canPrev: "posso voltar?" (true/false). Começa "false" pois no início estamos no começo.
  // - canNext: "posso avançar?" (true/false). Começa "true" pois geralmente temos conteúdo à direita.
  // Obs.: o padrão [valor, setValor] é convenção do React.
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // --------------------------------------------------------------------------
  // 3) Função utilitária: updateButtons
  //    Calcula se deve habilitar ou desabilitar os botões com base na rolagem atual.
  // --------------------------------------------------------------------------
  // É uma "arrow function" (=>). Diferença prática: sintaxe curta e não cria "this" próprio.
  const updateButtons = () => {
    // Pega o elemento real do DOM (a "esteira" onde os vídeos ficam lado a lado).
    // Abreviação: "el" = elemento.
    const el = trackRef.current;

    // Se o elemento ainda não existe (antes da primeira renderização), saímos.
    if (!el) return;

    // -------------------- SOBRE AS PROPRIEDADES DE SCROLL --------------------
    // - el.scrollLeft  : quantos pixels já rolamos para a esquerda.
    //                    0 = início absoluto; >0 significa que existe "passado" à esquerda.
    // - el.clientWidth : largura visível (a janelinha que você enxerga).
    // - el.scrollWidth : largura total do conteúdo rolável (todos os cards + gaps).
    // ------------------------------------------------------------------------

    // "Posso voltar?" — Se já rolamos pelo menos 1px, então há conteúdo à esquerda.
    setCanPrev(el.scrollLeft > 0);

    // "Posso avançar?" — Se (rolado + janela visível) ainda NÃO alcançou o total,
    // então há conteúdo escondido à direita.
    // O "- 1" evita erros de arredondamento (às vezes o navegador arredonda).
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 0.8);

    // Dica de debug (opcional): descomente para ver números no console.
    // console.log({
    //   scrollLeft: el.scrollLeft,
    //   clientWidth: el.clientWidth,
    //   scrollWidth: el.scrollWidth,
    //   canPrev: el.scrollLeft > 0,
    //   canNext: el.scrollLeft + el.clientWidth < el.scrollWidth - 1
    // })
  };

  // --------------------------------------------------------------------------
  // 4) useEffect: roda DEPOIS que o React desenha a tela (montagem).
  //    Aqui conectamos o "mundo real" (evento de scroll) com nosso estado React.
  // --------------------------------------------------------------------------
  // O array de dependências [] significa:
  // - Rode a função uma ÚNICA VEZ ao montar (primeira renderização).
  // - Rode a função de limpeza (return) ao desmontar (quando o componente sai da tela).
  useEffect(() => {
    // Pegamos o elemento real do DOM novamente.
    const el = trackRef.current;

    // Se por algum motivo ainda não existe, saímos (evita erro).
    if (!el) return;

    // Calculamos o estado inicial dos botões (importantíssimo para começar correto).
    updateButtons();

    // Assinamos o evento de rolagem do "el".
    // Sempre que o usuário rolar, chamaremos "updateButtons" para recalcular canPrev/canNext.
    // O options { passive: true } indica ao navegador que NÃO chamaremos preventDefault(),
    // permitindo otimizações de performance na rolagem.
    el.addEventListener("scroll", updateButtons, { passive: true });

    // FUNÇÃO DE LIMPEZA: quando o componente for desmontado,
    // removemos o event listener para NÃO vazar memória.
    return () => {
      el.removeEventListener("scroll", updateButtons);
    };
  }, []); // <- vazio = monta/desmonta apenas

  // --------------------------------------------------------------------------
  // 5) scrollByViewport: faz o carrossel "andar" em passos confortáveis.
  // --------------------------------------------------------------------------
  // Parâmetro "dir" tem valor padrão 1:
  // - Se ninguém passar nada, assume "1" (andar para a direita = PRÓXIMO).
  // - Se quisermos voltar, chamamos com "-1" (andar para a esquerda = ANTERIOR).
  // Por que ter um padrão? Torna a função segura e prática de reusar.
  const scrollByViewport = (dir = 1) => {
    // Pegamos o elemento real do trilho.
    const el = trackRef.current;
    if (!el) return;

    // Calculamos um "passo" baseado em 80% da largura visível.
    // Limitamos entre 280 e 420 px para evitar passos gigantescos ou minúsculos
    // (melhor UX em telas muito grandes ou muito pequenas).
    const amount = Math.max(280, Math.min(420, el.clientWidth * 1.0));

    // Rolamos suavemente para a DIREITA (dir = 1) ou ESQUERDA (dir = -1).
    // O "behavior: 'smooth'" pede rolagem suave ao navegador.
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  // --------------------------------------------------------------------------
  // 6) JSX: o que de fato desenhamos na tela.
  //    JSX parece HTML, mas é JavaScript — chaves { } inserem valores JS.
  // --------------------------------------------------------------------------
  return (
    // "section" é apenas semântica/estrutura; a classe "section" pode ter margens.
    <section className="section">
      {/* "container" centraliza o conteúdo e limita a largura máxima */}
      <div className="container">
        {/* Título da seção */}
        <h2 className="title-section">Reels</h2>

        {/* Wrapper do carrossel (apenas para posicionar botões, etc.) */}
        <div className="carousel">
          {/*
            Este é o "TRILHO" (a esteira).
            - "ref={trackRef}": colamos o post-it aqui; depois da renderização,
              trackRef.current apontará para ESTE elemento DOM.
            - "carousel-track" (no CSS) faz:
              display: grid; grid-auto-flow: column; overflow-x: auto;
              scroll-snap-type: x mandatory; (trava em cada item)
          */}
          <div ref={trackRef} className="carousel-track">
            {/*
              Desenhamos CADA vídeo mapeando o array "videos".
              - "map" percorre cada item (v) e devolve um trecho de JSX.
              - "key={v.id}" é obrigatório: ajuda o React a identificar cada item da lista.
              - "vertical" é uma PROP para o VideoCard montar o embed 9:16 (formato reels).
            */}
            {videos.map((v) => (
              // Cada item do carrossel (um "cartão" vertical).
              <div key={v.id} className="carousel-item">
                {/* VideoCard exibe thumbnail/player + título/descrição.
                   Passamos o objeto "v" completo na prop "video". */}
                <VideoCard video={v} vertical />
              </div>
            ))}
          </div>

          {/*
            Botão de VOLTAR (◀)
            - onClick: usamos uma ARROW FUNCTION para chamar "scrollByViewport(-1)"
              SOMENTE quando clicar (se escrevesse scrollByViewport(-1) sem a função, chamaria na hora).
            - disabled: baseado no estado "canPrev" calculado pelo updateButtons.
            -Chama do UI Global para ficar padrao 
          */}
          <ArrowButton
            direction="prev"
            onClick={() => scrollByViewport(-1)}
            disabled={!canPrev}
          />

          {/*
            Botão de AVANÇAR (▶)
            - onClick: chama "scrollByViewport(1)" (direita/próximo).
            - disabled: baseado no estado "canNext".
            -Chama do UI Global para ficar padrao 
          */}
          <ArrowButton
            direction="next"
            onClick={() => scrollByViewport(1)}
            disabled={!canNext}
          />
        </div>
      </div>
    </section>
  );
}
