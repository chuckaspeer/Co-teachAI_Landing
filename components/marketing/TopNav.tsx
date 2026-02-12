"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#trust", label: "Trust" },
  { href: "#for-schools", label: "For Schools" },
];

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      role="banner"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "64px" }}>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center" }}
          aria-label="Co-teachAI home"
        >
          <Image
            src="/images/Co-teachAI text logo.png"
            alt="Co-teachAI"
            width={160}
            height={40}
            priority
            style={{ width: "auto", height: "32px" }}
          />
        </Link>

        <nav
          aria-label="Main navigation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "var(--text-muted)",
                fontWeight: 500,
                fontSize: "0.9375rem",
              }}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/pilot" className="nav-request-access-btn">
            Request Access
          </Button>
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            padding: "0.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text)",
          }}
          className="nav-toggle"
        >
          {menuOpen ? (
            <span aria-hidden>✕</span>
          ) : (
            <span aria-hidden>☰</span>
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile menu"
        style={{
          display: menuOpen ? "block" : "none",
          borderTop: "1px solid var(--border)",
          padding: "1rem",
          backgroundColor: "var(--bg-muted)",
        }}
        className="nav-mobile-menu"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              padding: "0.75rem 0",
              color: "var(--text)",
              fontWeight: 500,
            }}
          >
            {link.label}
          </Link>
        ))}
        <div style={{ marginTop: "0.75rem" }}>
          <Button href="/pilot" className="nav-request-access-btn">
            Request Access
          </Button>
        </div>
      </div>

    </header>
  );
}
