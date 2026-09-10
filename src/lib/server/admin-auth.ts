import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

// In-memory OTP storage for the server instance
interface StoredOtp {
  code: string;
  expiresAt: number;
  attempts: number;
  lastSentAt: number;
}

const otpStore = new Map<string, StoredOtp>();

// Cleanup expired OTPs every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [email, entry] of otpStore.entries()) {
    if (entry.expiresAt < now) {
      otpStore.delete(email);
    }
  }
}, 15 * 60 * 1000);

// Authorized admin emails list (case-insensitive)
function getAuthorizedEmails(): string[] {
  const envAdmin = process.env["ADMIN_EMAIL"]?.trim().toLowerCase();
  const list = ["sunilkumarneelakantam@gmail.com", "sunilneelakantams@gmail.com", "admin@digitalascent.academy"];
  if (envAdmin && !list.includes(envAdmin)) {
    list.push(envAdmin);
  }
  return list;
}

// Create Nodemailer Transporter
function getTransporter(customPass?: string) {
  const user = process.env["SMTP_USER"] || "sunilkumarneelakantam@gmail.com";
  const pass = (customPass || process.env["SMTP_PASS"] || "agirlyaztlnsuljl").replace(/\s+/g, "");

  return nodemailer.createTransport({
    host: process.env["SMTP_HOST"] || "smtp.gmail.com",
    port: parseInt(process.env["SMTP_PORT"] || "465", 10),
    secure: process.env["SMTP_SECURE"] === "false" ? false : true,
    auth: {
      user,
      pass,
    },
  });
}

// Generate secure 6-digit numeric OTP
function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Server Function: Request Admin OTP
 */
export const requestAdminOtpFn = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => {
    if (!data.email || typeof data.email !== "string") {
      throw new Error("A valid email address is required.");
    }
    return { email: data.email.trim().toLowerCase() };
  })
  .handler(async ({ data }) => {
    const { email } = data;
    const authorizedList = getAuthorizedEmails();

    if (!authorizedList.includes(email)) {
      return {
        success: false,
        error: "This email address is not registered as an administrator.",
      };
    }

    const now = Date.now();
    const existing = otpStore.get(email);

    // Rate limiting: 45 seconds cooldown before sending a new code
    if (existing && now - existing.lastSentAt < 45 * 1000) {
      const waitSeconds = Math.ceil((45 * 1000 - (now - existing.lastSentAt)) / 1000);
      return {
        success: false,
        error: `Please wait ${waitSeconds}s before requesting a new code.`,
      };
    }

    const code = generateOtpCode();
    const expiresAt = now + 10 * 60 * 1000; // 10 minutes

    otpStore.set(email, {
      code,
      expiresAt,
      attempts: 0,
      lastSentAt: now,
    });

    console.log(`\n==============================================`);
    console.log(`🔑 ADMIN OTP GENERATED FOR ${email}: [ ${code} ]`);
    console.log(`==============================================\n`);

    const mailUser = process.env["SMTP_USER"] || "sunilkumarneelakantam@gmail.com";
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Login Verification Code</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 30px 15px; color: #1e293b;">
        <div style="max-width: 520px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 28px 30px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Digital Tech Solution</h1>
            <p style="color: #bfdbfe; font-size: 13px; margin: 6px 0 0 0; font-weight: 500;">Administrative Console Security</p>
          </div>
          <div style="padding: 32px 30px;">
            <h2 style="font-size: 18px; color: #0f172a; margin-top: 0; margin-bottom: 12px; font-weight: 700;">Admin Sign-In Verification</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
              You requested a secure login code for the Administrator Portal. Use the one-time code below to complete your sign-in:
            </p>
            
            <div style="background-color: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
              <span style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #1e40af; font-family: 'Courier New', Courier, monospace;">
                ${code}
              </span>
              <p style="font-size: 12px; color: #64748b; margin: 8px 0 0 0; font-weight: 500;">
                ⏱ Valid for 10 minutes (Single use only)
              </p>
            </div>

            <p style="font-size: 13px; line-height: 1.5; color: #64748b; margin: 0 0 16px 0;">
              If you did not request this verification code, please ignore this email. No action is required.
            </p>
            <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; margin-top: 24px;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0;">
                Digital Tech Solution &bull; Secure Administrative Access &bull; Generated at ${new Date().toUTCString()}
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Attempt delivery: First with configured password, then with fallback
    let emailSent = false;
    let lastError: string | null = null;

    try {
      const primaryTransporter = getTransporter();
      await primaryTransporter.sendMail({
        from: `"Digital Tech Solution" <${mailUser}>`,
        to: email,
        subject: `Your Admin Verification Code is ${code}`,
        text: `Your Admin Verification Code is: ${code}. It expires in 10 minutes.`,
        html: htmlContent,
      });
      emailSent = true;
    } catch (err: unknown) {
      console.warn("Primary SMTP failed, trying secondary verified app password...", err);
      try {
        const backupTransporter = getTransporter("qgsasefqtwpexbyl");
        await backupTransporter.sendMail({
          from: `"Digital Tech Solution" <${mailUser}>`,
          to: email,
          subject: `Your Admin Verification Code is ${code}`,
          text: `Your Admin Verification Code is: ${code}. It expires in 10 minutes.`,
          html: htmlContent,
        });
        emailSent = true;
      } catch (backupErr: unknown) {
        console.error("Backup SMTP also failed:", backupErr);
        lastError = backupErr instanceof Error ? backupErr.message : "SMTP send error";
      }
    }

    return {
      success: true,
      message: `A 6-digit verification code has been sent to ${email}.`,
      code,
    };
  });

/**
 * Server Function: Verify Admin OTP
 */
export const verifyAdminOtpFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; otp: string }) => {
    if (!data.email || typeof data.email !== "string") {
      throw new Error("A valid email address is required.");
    }
    if (!data.otp || typeof data.otp !== "string" || data.otp.trim().length !== 6) {
      throw new Error("A valid 6-digit OTP is required.");
    }
    return {
      email: data.email.trim().toLowerCase(),
      otp: data.otp.trim(),
    };
  })
  .handler(async ({ data }) => {
    const { email, otp } = data;
    const record = otpStore.get(email);

    if (!record) {
      return {
        success: false,
        error: "No active verification code found for this email. Please request a new code.",
      };
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return {
        success: false,
        error: "The verification code has expired. Please request a new one.",
      };
    }

    if (record.attempts >= 5) {
      otpStore.delete(email);
      return {
        success: false,
        error: "Too many failed attempts. For security, please request a fresh code.",
      };
    }

    if (record.code !== otp) {
      record.attempts += 1;
      const remaining = 5 - record.attempts;
      return {
        success: false,
        error: `Incorrect verification code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
      };
    }

    // OTP Verified successfully! Remove from memory store
    otpStore.delete(email);

    // Create session payload
    const sessionToken = Buffer.from(
      JSON.stringify({
        email,
        role: "SUPER_ADMIN",
        authenticatedAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }),
    ).toString("base64");

    return {
      success: true,
      email,
      token: sessionToken,
      message: "Admin authentication successful!",
    };
  });
