import express from "express";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 3001);
const IS_PROD = process.env.NODE_ENV === "production";
const SITE_URL = process.env.VITE_SITE_URL ?? "";
const LEADS_DIR = path.join(__dirname, "data");
const LEADS_FILE = path.join(LEADS_DIR, "leads.json");
const EVENTS_FILE = path.join(LEADS_DIR, "events.json");
const WEBHOOK_URL = process.env.AUDIT_WEBHOOK_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.VITE_CONTACT_EMAIL ?? "";

type Lead = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  business: string;
  platform: string;
  monthlyRevenue: string;
  goal: string;
  phone?: string;
  companyUrl?: string;
  source?: string;
};

// ─── Data helpers ────────────────────────────────────────────────────────────

async function ensureDataDir() {
  await fs.mkdir(LEADS_DIR, { recursive: true });
}

async function appendJson(file: string, entry: unknown) {
  await ensureDataDir();
  let list: unknown[] = [];
  try {
    const raw = await fs.readFile(file, "utf8");
    list = JSON.parse(raw) as unknown[];
    if (!Array.isArray(list)) list = [];
  } catch {
    list = [];
  }
  list.push(entry);
  await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Email notification ───────────────────────────────────────────────────────

async function sendLeadEmail(lead: Lead): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping notification.");
    return;
  }
  if (!CONTACT_EMAIL) {
    console.warn("[email] VITE_CONTACT_EMAIL not set — skipping notification.");
    return;
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:#805113;padding:24px 32px">
            <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#f2c879">SellSavvy</p>
            <h1 style="margin:6px 0 0;font-size:20px;color:#fff;font-weight:800">New audit request</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
              ${[
                ["Name", lead.name],
                ["Email", `<a href="mailto:${lead.email}" style="color:#805113">${lead.email}</a>`],
                ["Business", lead.business],
                ["Platform", lead.platform],
                ["Monthly Revenue", lead.monthlyRevenue],
                ["Growth Goal", lead.goal],
                ["Phone", lead.phone ?? "—"],
                ["Store URL", lead.companyUrl ? `<a href="${lead.companyUrl}" style="color:#805113">${lead.companyUrl}</a>` : "—"],
                ["Source", lead.source ?? "—"],
                ["Submitted", new Date(lead.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"],
              ]
                .map(
                  ([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;width:40%">${label}</td>
                <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;font-weight:600;color:#0f172a">${value}</td>
              </tr>`
                )
                .join("")}
            </table>
            <div style="margin-top:24px;padding:16px;background:#fefce8;border-radius:10px;border:1px solid #fde68a">
              <p style="margin:0;font-size:13px;color:#92400e;font-weight:600">💡 Lead ID: <code>${lead.id}</code></p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px 28px;font-size:12px;color:#94a3b8;border-top:1px solid #f0f0f0">
            This notification was sent automatically by SellSavvy when a prospect submitted the audit form.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY);
    
    // 1. Send internal notification
    const internalEmail = resend.emails.send({
      from: "SellSavvy Leads <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      subject: `New audit request — ${lead.name} (${lead.business})`,
      html,
    });

    // 2. Send autoresponder to the lead
    const autoresponderHtml = `
<!DOCTYPE html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#334155;margin:0;padding:0;background-color:#f8fafc">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 25px -5px rgba(0,0,0,0.05)">
        <tr>
          <td style="background-color:#0f172a;padding:40px 32px;text-align:center">
            <h1 style="margin:0;font-size:24px;color:#ffffff;font-weight:800;letter-spacing:-0.02em">Sell<span style="color:#eab308">Savvy</span></h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 32px">
            <p style="font-size:16px;color:#0f172a;font-weight:600">Hi ${lead.name},</p>
            <p style="font-size:15px;color:#475569">We've successfully received your audit request for <strong>${lead.business}</strong>.</p>
            <p style="font-size:15px;color:#475569">Our team is currently reviewing your channels and revenue details. We will prepare your focused audit summary and reach out to you shortly to schedule a walkthrough.</p>
            ${process.env.VITE_CALENDLY_URL ? `
            <div style="margin:32px 0;text-align:center">
              <p style="font-size:14px;color:#64748b;margin-bottom:12px">Ready to lock in a time to chat right now?</p>
              <a href="${process.env.VITE_CALENDLY_URL}" style="display:inline-block;background-color:#eab308;color:#0f172a;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">Pick a time on our calendar</a>
            </div>` : ''}
            <p style="font-size:15px;color:#475569;margin-top:32px">Best regards,<br><strong style="color:#0f172a">The SellSavvy Team</strong></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const autoresponderEmail = resend.emails.send({
      // IMPORTANT: Needs custom domain verified in Resend to send to arbitrary emails
      from: "SellSavvy <onboarding@resend.dev>", 
      to: [lead.email],
      subject: `Your SellSavvy Audit Request is Confirmed!`,
      html: autoresponderHtml,
    });

    const [internalRes, autoresponderRes] = await Promise.all([internalEmail, autoresponderEmail]);

    if (internalRes.error) console.error("[email] Internal notification Resend error:", internalRes.error);
    else console.log(`[email] Internal notification sent to ${CONTACT_EMAIL}`);

    if (autoresponderRes.error) console.error("[email] Autoresponder Resend error:", autoresponderRes.error);
    else console.log(`[email] Autoresponder sent to ${lead.email}`);

  } catch (err) {
    console.error("[email] Failed to send emails:", err);
  }
}

// ─── App setup ────────────────────────────────────────────────────────────────

const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'", "https://plausible.io", "https://www.google-analytics.com"],
        mediaSrc: ["'self'", "blob:"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: IS_PROD ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false, // allows video/media loading
  })
);

app.use(express.json({ limit: "48kb" }));

// ─── CORS ─────────────────────────────────────────────────────────────────────

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigin = IS_PROD && SITE_URL ? SITE_URL : origin;

  if (allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

// ─── Rate limiters ────────────────────────────────────────────────────────────

// Global blanket limiter
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests. Please slow down." },
});

// Strict limiter for audit form submissions
const auditLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many audit requests from this IP. Please try again later." },
  skipSuccessfulRequests: false,
});

// Analytics beacon limiter
const analyticsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many analytics events." },
});

app.use(globalLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "sellsavvy-api",
    env: IS_PROD ? "production" : "development",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/audit", auditLimiter, async (req, res) => {
  try {
    const body = req.body as Record<string, string | undefined>;

    // Honeypot check
    if (body.website?.trim()) {
      res.status(400).json({ error: "Invalid submission." });
      return;
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const business = body.business?.trim() ?? "";
    const platform = body.platform?.trim() ?? "";
    const monthlyRevenue = body.monthlyRevenue?.trim() ?? "";
    const goal = body.goal?.trim() ?? "";

    if (!name || !business || !platform || !monthlyRevenue || !goal) {
      res.status(400).json({ error: "Please complete all required fields." });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ error: "Enter a valid email address." });
      return;
    }

    const lead: Lead = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      email,
      business,
      platform,
      monthlyRevenue,
      goal,
      phone: body.phone?.trim() || undefined,
      companyUrl: body.companyUrl?.trim() || undefined,
      source: body.source?.trim() || req.get("referer") || undefined,
    };

    await appendJson(LEADS_FILE, lead);

    // Fire-and-forget: webhook + email — never block the 201 response
    void (async () => {
      if (WEBHOOK_URL) {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "audit_lead", lead }),
        }).catch((err) => console.error("[webhook]", err));
      }
      await sendLeadEmail(lead);
    })();

    res.status(201).json({ id: lead.id, message: "Audit request received." });
  } catch (error) {
    console.error("[audit]", error);
    res.status(500).json({ error: "Server error. Please try again shortly." });
  }
});

app.post("/api/analytics", analyticsLimiter, async (req, res) => {
  try {
    const { event, props, path: pagePath, ts } = req.body as {
      event?: string;
      props?: Record<string, unknown>;
      path?: string;
      ts?: string;
    };

    if (!event) {
      res.status(400).json({ error: "Missing event" });
      return;
    }

    await appendJson(EVENTS_FILE, {
      event,
      props: props ?? {},
      path: pagePath,
      ts: ts ?? new Date().toISOString(),
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("[analytics]", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ─── Static SPA ───────────────────────────────────────────────────────────────

const distPath = path.join(__dirname, "../dist");
if (existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: IS_PROD ? "1y" : 0 }));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`SellSavvy API listening on http://localhost:${PORT} [${IS_PROD ? "production" : "development"}]`);
});
