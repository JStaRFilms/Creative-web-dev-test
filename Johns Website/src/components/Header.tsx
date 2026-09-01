import { RegistrationMark } from "./proof/ProofMarks";

export function Header() {
  return (
    <header className="site-header">
      <a className="identity" href="#top" aria-label="John, back to top">JOHN OLULEKE-OKE / 2026</a>
      <RegistrationMark className="header-registration" />
      <nav aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#lab">Lab</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
