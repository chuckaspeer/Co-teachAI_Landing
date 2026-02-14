"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_OPTIONAL = 300;
const MAX_MESSAGE = 2000;

type FormType = "access" | "demo";

type FormState = {
  type: FormType;
  name: string;
  email: string;
  school: string;
  district: string;
  role: string;
  message: string;
  honeypot: string;
};

const initial: FormState = {
  type: "access",
  name: "",
  email: "",
  school: "",
  district: "",
  role: "",
  message: "",
  honeypot: "",
};

function validate(state: FormState): Partial<Record<keyof FormState, string>> {
  const err: Partial<Record<keyof FormState, string>> = {};
  if (!state.name.trim()) err.name = "Name is required.";
  else if (state.name.length > MAX_NAME) err.name = "Name is too long.";
  if (!state.email.trim()) err.email = "Email is required.";
  else if (!EMAIL_REGEX.test(state.email)) err.email = "Please enter a valid email.";
  else if (state.email.length > MAX_EMAIL) err.email = "Email is too long.";
  if (state.school.length > MAX_OPTIONAL) err.school = "Too long.";
  if (state.district.length > MAX_OPTIONAL) err.district = "Too long.";
  if (state.role.length > MAX_OPTIONAL) err.role = "Too long.";
  if (state.message.length > MAX_MESSAGE) err.message = "Message is too long.";
  return err;
}

export function RequestAccessForm() {
  const [state, setState] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const update = (key: keyof FormState, value: string) => {
    setState((s) => ({ ...s, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const err = validate(state);
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: state.type,
          name: state.name.trim(),
          email: state.email.trim(),
          school: state.school.trim() || undefined,
          district: state.district.trim() || undefined,
          role: state.role.trim() || undefined,
          message: state.message.trim() || undefined,
          honeypot: state.honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setState(initial);
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  const formStyles = {
    form: {
      maxWidth: "28rem",
      margin: "0 auto",
      textAlign: "left" as const,
    },
    fieldset: {
      border: "none",
      margin: 0,
      padding: 0,
    },
    row: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "var(--text)",
      marginBottom: "0.25rem",
    },
    required: {
      color: "var(--brand-primary)",
    },
    input: {
      width: "100%",
      padding: "0.5rem 0.75rem",
      fontSize: "1rem",
      border: "1px solid var(--border)",
      borderRadius: "0.375rem",
      color: "var(--text)",
      backgroundColor: "var(--bg)",
    },
    textarea: {
      width: "100%",
      minHeight: "4rem",
      padding: "0.5rem 0.75rem",
      fontSize: "1rem",
      border: "1px solid var(--border)",
      borderRadius: "0.375rem",
      color: "var(--text)",
      backgroundColor: "var(--bg)",
      resize: "vertical" as const,
    },
    error: {
      fontSize: "0.8125rem",
      color: "#b91c1c",
      marginTop: "0.25rem",
    },
    honeypot: {
      position: "absolute" as const,
      left: "-9999px",
      width: "1px",
      height: "1px",
      overflow: "hidden" as const,
    },
    success: {
      padding: "1rem",
      backgroundColor: "var(--bg-muted)",
      borderRadius: "0.5rem",
      color: "var(--text)",
      fontWeight: 500,
    },
    statusError: {
      padding: "1rem",
      backgroundColor: "#fef2f2",
      borderRadius: "0.5rem",
      color: "#b91c1c",
      marginBottom: "1rem",
    },
  };

  if (status === "success") {
    return (
      <div style={formStyles.form}>
        <p style={formStyles.success}>
          Thank you! We&apos;ve received your request and will be in touch soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-base btn-secondary"
          style={{ marginTop: "1rem" }}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={formStyles.form} noValidate>
      <fieldset style={formStyles.fieldset} disabled={status === "loading"}>
        <div style={formStyles.row} aria-hidden="true">
          <label htmlFor="lead-hp" style={formStyles.honeypot}>
            Leave blank
          </label>
          <input
            id="lead-hp"
            type="text"
            name="honeypot"
            tabIndex={-1}
            autoComplete="off"
            value={state.honeypot}
            onChange={(e) => update("honeypot", e.target.value)}
            style={{ ...formStyles.input, ...formStyles.honeypot }}
          />
        </div>

        <div style={formStyles.row}>
          <label htmlFor="lead-type" style={formStyles.label}>
            Request type
          </label>
          <select
            id="lead-type"
            value={state.type}
            onChange={(e) => update("type", e.target.value as FormType)}
            style={formStyles.input}
          >
            <option value="access">Request Access</option>
            <option value="demo">Schedule a Walkthrough (Demo)</option>
          </select>
        </div>

        <div style={formStyles.row}>
          <label htmlFor="lead-name" style={formStyles.label}>
            Name <span style={formStyles.required}>*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            required
            autoComplete="name"
            value={state.name}
            onChange={(e) => update("name", e.target.value)}
            style={formStyles.input}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p style={formStyles.error}>{errors.name}</p>}
        </div>

        <div style={formStyles.row}>
          <label htmlFor="lead-email" style={formStyles.label}>
            Email <span style={formStyles.required}>*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            required
            autoComplete="email"
            value={state.email}
            onChange={(e) => update("email", e.target.value)}
            style={formStyles.input}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p style={formStyles.error}>{errors.email}</p>}
        </div>

        <div style={formStyles.row}>
          <label htmlFor="lead-school" style={formStyles.label}>
            School
          </label>
          <input
            id="lead-school"
            type="text"
            autoComplete="organization"
            value={state.school}
            onChange={(e) => update("school", e.target.value)}
            style={formStyles.input}
            aria-invalid={!!errors.school}
          />
          {errors.school && <p style={formStyles.error}>{errors.school}</p>}
        </div>

        <div style={formStyles.row}>
          <label htmlFor="lead-district" style={formStyles.label}>
            District
          </label>
          <input
            id="lead-district"
            type="text"
            value={state.district}
            onChange={(e) => update("district", e.target.value)}
            style={formStyles.input}
            aria-invalid={!!errors.district}
          />
          {errors.district && <p style={formStyles.error}>{errors.district}</p>}
        </div>

        <div style={formStyles.row}>
          <label htmlFor="lead-role" style={formStyles.label}>
            Role
          </label>
          <input
            id="lead-role"
            type="text"
            value={state.role}
            onChange={(e) => update("role", e.target.value)}
            style={formStyles.input}
            placeholder="e.g. Teacher, Admin"
            aria-invalid={!!errors.role}
          />
          {errors.role && <p style={formStyles.error}>{errors.role}</p>}
        </div>

        <div style={formStyles.row}>
          <label htmlFor="lead-message" style={formStyles.label}>
            Message
          </label>
          <textarea
            id="lead-message"
            value={state.message}
            onChange={(e) => update("message", e.target.value)}
            style={formStyles.textarea}
            rows={3}
            aria-invalid={!!errors.message}
          />
          {errors.message && <p style={formStyles.error}>{errors.message}</p>}
        </div>

        {status === "error" && errorMessage && (
          <p style={formStyles.statusError} role="alert">
            {errorMessage}
          </p>
        )}

        <div style={{ marginTop: "1.25rem" }}>
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Submit"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
