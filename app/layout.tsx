import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Co-TeachAI — Teacher-first AI for lesson planning, differentiation & mastery",
  description:
    "Teachers stay in control. AI helps with lesson planning, bell ringers, exit tickets, tutoring, differentiation, and mastery tracking. District-friendly and privacy-safe.",
  openGraph: {
    title: "Co-TeachAI — Teacher-first AI for lesson planning, differentiation & mastery",
    description:
      "Teachers stay in control. AI helps with lesson planning, bell ringers, exit tickets, tutoring, differentiation, and mastery tracking.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
