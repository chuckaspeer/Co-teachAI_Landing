"use client";

import { useEffect, useState } from "react";
import { RequestAccessForm } from "@/components/marketing/RequestAccessForm";

function isRequestAccessHash() {
  if (typeof window === "undefined") return false;
  return window.location.hash === "#request-access";
}

export function FinalCta() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isRequestAccessHash());
    const onHashChange = () => setOpen(isRequestAccessHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a[href*="#request-access"]');
      if (target) setOpen(true);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <section
      id="request-access"
      aria-labelledby="final-cta-heading"
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
        textAlign: "center",
      }}
    >
      <div className="container">
        <details
          open={open}
          onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
          style={{ textAlign: "left" }}
        >
          <summary
            id="final-cta-heading"
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginTop: 0,
              marginBottom: 0,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Bring Co-TeachAI to Your School
            {!open && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href="/#request-access"
                  className="cta-primary-btn btn-base"
                  onClick={() => setOpen(true)}
                >
                  Request Access
                </a>
              </div>
            )}
          </summary>
          <div style={{ marginTop: "1.5rem" }}>
            <RequestAccessForm />
            {open && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1.5rem",
                }}
              >
                <a
                  href="/#request-access"
                  className="cta-primary-btn btn-base"
                  onClick={() => setOpen(true)}
                >
                  Request Access
                </a>
              </div>
            )}
          </div>
        </details>
      </div>
    </section>
  );
}
