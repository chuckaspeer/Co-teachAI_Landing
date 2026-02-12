type ImagePlaceholderProps = {
  label: string;
  width?: number;
  height?: number;
  className?: string;
};

export function ImagePlaceholder({
  label,
  width = 400,
  height = 280,
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: width,
        aspectRatio: `${width} / ${height}`,
        backgroundColor: "var(--bg-muted)",
        border: "1px dashed var(--border)",
        borderRadius: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-muted)",
        fontSize: "0.875rem",
      }}
      role="img"
      aria-label={label}
    >
      {label}
    </div>
  );
}
