import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <Link href="/" className="header-logo">
          <div className="header-logo-icon">Е</div>
          <span className="header-logo-text">Екомоніторинг</span>
        </Link>

        <div className="header-links">
          <Link href="/" className="header-link">Головна</Link>
          <Link href="/stations" className="header-link">Станції</Link>
          <Link href="/pollutants" className="header-link">Довідник</Link>
          <Link href="/about" className="header-link">Про проєкт</Link>
        </div>
      </nav>
    </header>
  );
}
