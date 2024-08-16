import { GitIcon } from "@/shared/ui/icons";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <a href="https://github.com/kot-vmeshke" target="_blank">
        <GitIcon />
      </a>
      <span>© 2024</span>
    </footer>
  );
};

export { Footer };
