import Image from "next/image";
import { ImagePlaceholder } from "@/components/marketing/ImagePlaceholder";

const blocks = [
  {
    id: "lesson-planning",
    title: "Lesson Planning",
    body: "Generate standards-aligned lesson plans, adjust objectives and pacing, and organize each phase of instruction with clarity.",
    imageLabel: "Lesson planning in Co-TeachAI",
    imageSrc: "/images/lessonplanlogo.png",
  },
  {
    id: "bell-ringers",
    title: "Bell Ringers",
    body: "Start class with purpose. Standards-aligned prompts designed for spiraling review, with immediate feedback and grading you control.",
    imageLabel: "Bell ringers in Co-TeachAI",
    imageSrc: "/images/bellringlogo.png",
  },
  {
    id: "exit-tickets",
    title: "Exit Tickets",
    body: "Check understanding before they leave. Tied to the day's objective, not generic questions.",
    imageLabel: "Exit tickets in Co-TeachAI",
    imageSrc: "/images/ExitTicket logo.png",
  },
  {
    id: "student-tutor",
    title: "Student Tutor",
    body: "Built on the Socratic method, the tutor guides students through objective-aligned questions instead of giving answers. You can review every interaction.",
    imageLabel: "Student tutor in Co-TeachAI",
    imageSrc: "/images/tutorlogo.png",
  },
];

export function ProductStoryFlow() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="product-story-heading"
      style={{
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <div className="container">
        <h2
          id="product-story-heading"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            marginTop: 0,
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          How it works
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {blocks.map((block, index) => (
            <article
              key={block.id}
              id={block.id}
              className="product-block"
              style={{
                display: "grid",
                gap: "1.5rem",
                alignItems: "center",
                gridTemplateColumns: "1fr",
              }}
            >
              <div
                className="product-block-content"
                style={{
                  order: index % 2 === 1 ? 2 : 1,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginTop: 0,
                    marginBottom: "0.5rem",
                  }}
                >
                  {block.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "var(--text-muted)",
                    fontSize: "1rem",
                  }}
                >
                  {block.body}
                </p>
              </div>
              <div
                className="product-block-image"
                style={{
                  order: index % 2 === 1 ? 1 : 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {"imageSrc" in block && block.imageSrc ? (
                  <Image
                    src={block.imageSrc}
                    alt={block.imageLabel}
                    width={400}
                    height={240}
                    style={{ width: "auto", height: "auto", maxWidth: "100%" }}
                  />
                ) : (
                  <ImagePlaceholder
                    label={block.imageLabel}
                    width={400}
                    height={240}
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
