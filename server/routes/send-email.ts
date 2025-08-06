import { RequestHandler } from "express";
import { z } from "zod";

// Email validation schema
const emailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export interface EmailRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

export const handleSendEmail: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validatedData = emailSchema.parse(req.body);

    const { name, email, subject, message } = validatedData;

    // Create mailto link (client-side email sending)
    const emailSubject = subject || `Contact from ${name}`;
    const emailBody = `
From: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from your portfolio contact form.
    `.trim();

    // In a real application, you would integrate with services like:
    // - SendGrid
    // - AWS SES
    // - Nodemailer with SMTP
    // - Resend
    // - EmailJS

    // For now, we'll return the mailto URL for client-side handling
    const mailtoUrl = `mailto:shubhamdev9128@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    const response: EmailResponse = {
      success: true,
      message: "Email prepared successfully",
    };

    res.json({
      ...response,
      mailtoUrl,
      data: {
        to: "shubhamdev9128@gmail.com",
        subject: emailSubject,
        from: `${name} <${email}>`,
        message: emailBody,
      },
    });
  } catch (error) {
    console.error("Email sending error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    const response: EmailResponse = {
      success: false,
      message: "Failed to process email request",
    };

    res.status(500).json(response);
  }
};
