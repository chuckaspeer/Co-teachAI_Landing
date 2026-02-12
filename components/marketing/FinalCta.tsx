import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
        textAlign: "center",
      }}
    >
      <div className="container">
        <h2
          id="final-cta-heading"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginTop: 0,
            marginBottom: "1.5rem",
          }}
        >
          Bring Co-TeachAI to Your School
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <Button href="/pilot" className="cta-primary-btn">
            Request Access
          </Button>
          <Button href="/demo" variant="secondary" className="cta-secondary-btn">
            Schedule a Walkthrough
          </Button>
        </div>
      </div>
    </section>
  );
}
