import type { AuditForm } from "../data/auditForm";

export type AuditPayload = AuditForm & {
  website?: string;
  phone?: string;
  companyUrl?: string;
  source?: string;
};

export class AuditSubmitError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "AuditSubmitError";
  }
}

export async function submitAudit(payload: AuditPayload): Promise<{ id: string }> {
  const apiBase = import.meta.env.VITE_API_URL ?? "";
  const response = await fetch(`${apiBase}/api/audit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    throw new AuditSubmitError(data.error ?? "Could not submit your request. Please try again.", response.status);
  }

  return response.json() as Promise<{ id: string }>;
}
