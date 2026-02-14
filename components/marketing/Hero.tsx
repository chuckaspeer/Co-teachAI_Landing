import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gap: "2rem",
            alignItems: "center",
            gridTemplateColumns: "1fr",
          }}
          className="hero-grid"
        >
          <div>
            <h1
              id="hero-heading"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginTop: 0,
                marginBottom: "1rem",
                color: "var(--text)",
              }}
            >
              You stay in control. AI helps you teach.
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--text-muted)",
                marginBottom: "1.5rem",
                maxWidth: "36ch",
              }}
            >
              Plan lessons, bell ringers, exit tickets, and tutoring.
              Differentiate by objective and track mastery—you stay in the
              driver&apos;s seat.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <Button href="/#request-access" className="cta-primary-btn">
                Request Access
              </Button>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src="/images/Co-teachAI logo.png"
              alt="Co-teachAI"
              width={480}
              height={320}
              priority
              style={{ width: "auto", height: "auto", maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
