type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={className}
      style={{
        border: "1px solid var(--border)",
        borderRadius: "0.5rem",
        boxShadow: "var(--shadow)",
        padding: "1.5rem",
        backgroundColor: "var(--bg)",
      }}
    >
      {children}
    </div>
  );
}
