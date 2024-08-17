import { GitIcon } from "@/shared/ui/icons";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <a href="https://github.com/kot-vmeshke" target="_blank">
          <GitIcon />
        </a>
        <span>© 2024</span>
      </div>
    </footer>
  );
};

export { Footer };
