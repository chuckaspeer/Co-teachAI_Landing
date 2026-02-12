const bullets = [
  "Teacher control",
  "Transparent about when and how AI is used",
  "Privacy by design — no student identifiers sent to AI",
  "Built to support FERPA-aligned data practices",
];

export function TrustSafety() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <div className="container">
        <h2
          id="trust-heading"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginTop: 0,
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Trust &amp; safety
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            maxWidth: "32rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {bullets.map((item) => (
            <li
              key={item}
              style={{
                padding: "0.75rem 0",
                paddingLeft: "1.75rem",
                position: "relative",
                color: "var(--text-muted)",
                fontSize: "1rem",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  color: "var(--brand-teal)",
                  fontWeight: 700,
                }}
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
