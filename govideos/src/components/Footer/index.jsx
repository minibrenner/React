import "./Footer.css";
import { footerLinks } from "../../data/footerLinks";
import Button from "../../UI/Button";

export default function Footer() {
  // Ano dinâmico (pra não ter que mudar todo ano)
  const year = new Date().getFullYear();

  // Handler do botão "Topo ↑"
  const scrollToTop = () => {
    // Rola suavemente pro topo da página
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <div className="footer-container">
        {/* Newsletter (aqui só um título e o botão topo) */}
        <div className="footer-newsletter">
          <div className="newsletter-text">
            <h3 id="footer-heading">GoUp</h3>
          </div>
          {/* 🔹 Agora o botão recebe label e ação */}
            <Button label="Subir 𖤂" onClick={scrollToTop} />
        </div>

        <hr className="footer-divider" />

        {/* Colunas de links (dados vindos do array) */}
        <nav className="footer-links" aria-label="Links do rodapé">
          {footerLinks.map((coluna, idxColuna) => (
            <div className="links-column" key={idxColuna}>
              <h4>{coluna.title}</h4>
              <ul>
                {coluna.links.map((link, idxLink) => (
                  <li key={idxLink}>
                    {/* target="_blank" abre nova aba. rel="noreferrer" por segurança */}
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <hr className="footer-divider" />

        {/* Parte inferior */}
        <div className="footer-bottom">
          <div className="footer-logo">
            {/* Coloque seu caminho de logo real aqui */}
            <img src="/logo.png" alt="Logo GoUp" />
          </div>

          <div className="footer-copyright">
            <p>&copy; 1992–{year} Copimaq — Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
