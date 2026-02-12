import Link from "next/link";

const footerLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#trust", label: "Trust" },
  { href: "#for-schools", label: "For Schools" },
  { href: "/#request-access", label: "Request Access" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        backgroundColor: "var(--bg-muted)",
      }}
    >
      <div className="container">
        <nav
          aria-label="Footer navigation"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem 1.5rem",
            marginBottom: "1rem",
          }}
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "var(--text-muted)",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p
          style={{
            margin: 0,
            color: "var(--muted)",
            fontSize: "0.8125rem",
          }}
        >
          © {year} Co-TeachAI
        </p>
      </div>
    </footer>
  );
}
