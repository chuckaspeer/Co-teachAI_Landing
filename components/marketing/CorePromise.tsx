import { Card } from "@/components/ui/Card";

const cards = [
  {
    title: "Teacher in the loop",
    body: "You review, edit, and approve everything before students see it — in just a few clicks.",
  },
  {
    title: "AI as your assistant",
    body: "Designed to support your instruction, not replace it.",
  },
  {
    title: "Built for real classrooms",
    body: "Standards-aligned tools for lesson planning, spiraling bell ringers, exit tickets, tutoring, and mastery tracking.",
  },
];

export function CorePromise() {
  return (
    <section
      id="features"
      aria-labelledby="core-promise-heading"
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
        backgroundColor: "var(--bg-muted)",
      }}
    >
      <div className="container">
        <h2
          id="core-promise-heading"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginTop: 0,
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Features
        </h2>
        <div
          className="promise-grid"
          style={{
            display: "grid",
            gap: "1.5rem",
          }}
        >
          {cards.map((card) => (
            <Card key={card.title}>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: "0.5rem",
                  color: "var(--text)",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-muted)",
                  fontSize: "0.9375rem",
                }}
              >
                {card.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
