import "./Footer.css";
import { footerLinks } from "../../data/footerLinks";
import Button from "../../UI/Button";

const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" aria-labelledby="footer-heading">
      <div className="footer-container">
        <div className="footer-newsletter">
          <div className="newsletter-text">
            <h3 id="footer-heading">GoUp</h3>
          </div>
          <Button label="Subir" onClick={scrollToTop} />
        </div>

        <hr className="footer-divider" />

        <nav className="footer-links" aria-label="Links do rodape">
          {footerLinks.map((column, columnIndex) => (
            <div className="links-column" key={columnIndex}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
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

        <div className="footer-bottom">
          <div className="footer-logo">
            <img src={logoSrc} alt="Logo GoUp" />
          </div>

          <div className="footer-copyright">
            <p>&copy; 1992-{year} Copimaq - Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
