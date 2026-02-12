import Link from "next/link";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = (
  | { href: string; children: React.ReactNode }
  | { href?: never; children: React.ReactNode; type?: "button" | "submit"; disabled?: boolean }
) & {
  variant?: ButtonVariant;
  className?: string;
};

const base = "btn-base";

const variants: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={"type" in props ? props.type ?? "button" : "button"}
      className={classes}
      disabled={"disabled" in props ? props.disabled : false}
    >
      {props.children}
    </button>
  );
}
