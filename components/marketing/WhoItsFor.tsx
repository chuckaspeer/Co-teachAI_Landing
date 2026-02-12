import { Card } from "@/components/ui/Card";

const audiences = [
  {
    title: "Teachers",
    body: "Plan, differentiate, and adjust instruction with clarity — without adding hours to your day.",
  },
  {
    title: "Students",
    body: "Receive guided, objective-aligned support that meets them at their level.",
  },
  {
    title: "Administrators",
    body: "See measurable progress by standard — without adding more reporting or paperwork.",
  },
];

export function WhoItsFor() {
  return (
    <section
      id="for-schools"
      aria-labelledby="who-heading"
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
        backgroundColor: "var(--bg-muted)",
      }}
    >
      <div className="container">
        <h2
          id="who-heading"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginTop: 0,
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Who it&apos;s for
        </h2>
        <p
          style={{
            margin: 0,
            marginBottom: "2rem",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "1rem",
          }}
        >
          Built for classrooms and campuses. See progress in real time.
        </p>
        <div
          className="who-grid"
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "1fr",
          }}
        >
          {audiences.map((audience) => (
            <Card key={audience.title}>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  marginTop: 0,
                  marginBottom: "0.5rem",
                }}
              >
                {audience.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--text-muted)",
                  fontSize: "0.9375rem",
                }}
              >
                {audience.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
