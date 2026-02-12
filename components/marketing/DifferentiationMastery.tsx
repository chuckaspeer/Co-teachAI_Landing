import { Card } from "@/components/ui/Card";

export function DifferentiationMastery() {
  return (
    <section
      aria-labelledby="diff-mastery-heading"
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
        backgroundColor: "var(--bg-muted)",
      }}
    >
      <div className="container">
        <h2
          id="diff-mastery-heading"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginTop: 0,
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Differentiation &amp; mastery
        </h2>
        <div
          className="diff-mastery-grid"
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "1fr",
          }}
        >
          <Card>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                marginTop: 0,
                marginBottom: "0.5rem",
              }}
            >
              Differentiation
            </h3>
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "0.9375rem",
              }}
            >
              Same objective, different supports—so every student can reach the
              same goal.
            </p>
          </Card>
          <Card>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                marginTop: 0,
                marginBottom: "0.5rem",
              }}
            >
              Mastery
            </h3>
            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: "0.9375rem",
              }}
            >
              Track progress by standard or student expectation so you know where
              each student stands.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
