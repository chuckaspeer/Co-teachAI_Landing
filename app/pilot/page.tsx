import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Request Access — Co-TeachAI",
  description: "Request access to Co-TeachAI at your school.",
};

const inputStyle = {
  padding: "0.5rem 0.75rem",
  border: "1px solid var(--border)",
  borderRadius: "0.375rem",
  fontSize: "1rem",
} as const;

const messageStyle = {
  padding: "0.75rem 1rem",
  borderRadius: "0.375rem",
  marginBottom: "1.5rem",
} as const;

type PilotPageProps = {
  searchParams: { submitted?: string; error?: string };
};

export default function PilotPage({ searchParams }: PilotPageProps) {
  const submitted = searchParams?.submitted === "1";
  const error = searchParams?.error === "1";

  return (
    <>
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "1rem",
        }}
      >
        <div className="container">
          <Link
            href="/"
            style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)" }}
          >
            Co-TeachAI
          </Link>
        </div>
      </header>
      <main id="main-content" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <div className="container" style={{ maxWidth: "28rem" }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginTop: 0,
              marginBottom: "0.5rem",
            }}
          >
            Request Access
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "2rem",
            }}
          >
            Tell us about your school and we&apos;ll get in touch to set up a
            pilot.
          </p>

          {submitted && (
            <div
              role="alert"
              style={{
                ...messageStyle,
                backgroundColor: "var(--brand-teal)",
                color: "white",
              }}
            >
              Thanks! We&apos;ve received your request and will be in touch soon.
            </div>
          )}

          {error && (
            <div
              role="alert"
              style={{
                ...messageStyle,
                backgroundColor: "var(--error-bg, #fef2f2)",
                color: "var(--error-text, #b91c1c)",
                border: "1px solid var(--error-border, #fecaca)",
              }}
            >
              Something went wrong. Please try again or contact us directly.
            </div>
          )}

          <form
            action="/api/pilot"
            method="post"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <label htmlFor="pilot-name" style={{ fontWeight: 500 }}>
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="pilot-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              style={inputStyle}
            />
            <label htmlFor="pilot-email" style={{ fontWeight: 500 }}>
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="pilot-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              style={inputStyle}
            />
            <label htmlFor="pilot-school" style={{ fontWeight: 500 }}>
              School / District <span aria-hidden="true">*</span>
            </label>
            <input
              id="pilot-school"
              type="text"
              name="school"
              required
              autoComplete="organization"
              style={inputStyle}
            />
            <label htmlFor="pilot-role" style={{ fontWeight: 500 }}>
              Role (optional)
            </label>
            <input
              id="pilot-role"
              type="text"
              name="role"
              autoComplete="organization-title"
              style={inputStyle}
            />
            <label htmlFor="pilot-phone" style={{ fontWeight: 500 }}>
              Phone (optional)
            </label>
            <input
              id="pilot-phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              style={inputStyle}
            />
            <label htmlFor="pilot-notes" style={{ fontWeight: 500 }}>
              Notes (optional)
            </label>
            <textarea
              id="pilot-notes"
              name="notes"
              rows={4}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <Button type="submit">Request Access</Button>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 1rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
