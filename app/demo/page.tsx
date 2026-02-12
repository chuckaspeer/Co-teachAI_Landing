import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Schedule a Walkthrough — Co-TeachAI",
  description: "Schedule a walkthrough of Co-TeachAI for your school.",
};

export default function DemoPage() {
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
            Schedule a Walkthrough
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "2rem",
            }}
          >
            Schedule a live walkthrough of Co-TeachAI with your team.
          </p>
          <form
            action="#"
            method="post"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <label htmlFor="demo-name" style={{ fontWeight: 500 }}>
              Name
            </label>
            <input
              id="demo-name"
              type="text"
              name="name"
              required
              style={{
                padding: "0.5rem 0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
                fontSize: "1rem",
              }}
            />
            <label htmlFor="demo-email" style={{ fontWeight: 500 }}>
              Email
            </label>
            <input
              id="demo-email"
              type="email"
              name="email"
              required
              style={{
                padding: "0.5rem 0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
                fontSize: "1rem",
              }}
            />
            <label htmlFor="demo-school" style={{ fontWeight: 500 }}>
              School / District
            </label>
            <input
              id="demo-school"
              type="text"
              name="school"
              style={{
                padding: "0.5rem 0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
                fontSize: "1rem",
              }}
            />
            <label htmlFor="demo-preferred" style={{ fontWeight: 500 }}>
              Preferred date / time (optional)
            </label>
            <input
              id="demo-preferred"
              type="text"
              name="preferred"
              placeholder="e.g. Next Tuesday afternoon"
              style={{
                padding: "0.5rem 0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "0.375rem",
                fontSize: "1rem",
              }}
            />
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <Button type="submit">Schedule a Walkthrough</Button>
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
