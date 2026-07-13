import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Server-side production validation
    const result = contactFormSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      console.warn("Brevo API key missing. Mocking email delivery.");
      return NextResponse.json({ success: true, mock: true });
    }

    // Professional HTML Email Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; }
            .header { background-color: #003366; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; margin:-20px -20px 20px -20px; }
            .content { padding: 10px; }
            .label { font-weight: bold; color: #0066CC; font-size: 14px; text-transform: uppercase; margin-bottom: 4px; display: block; }
            .value { margin-bottom: 20px; font-size: 16px; background: #f8fafc; padding: 12px; border-radius: 4px; border-left: 4px solid #0066CC;}
            .message-body { background: #f8fafc; padding: 15px; border-radius: 4px; white-space: pre-wrap; font-size: 16px; border-left: 4px solid #0066CC; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div>
                <span class="label">Sender Name</span>
                <div class="value">${name}</div>
              </div>
              
              <div>
                <span class="label">Email Address</span>
                <div class="value"><a href="mailto:${email}" style="color: #0066CC;">${email}</a></div>
              </div>

              <div>
                <span class="label">Subject</span>
                <div class="value">${subject}</div>
              </div>

              <div>
                <span class="label">Message</span>
                <div class="message-body">${message}</div>
              </div>
            </div>
            <div class="footer">
              This email was automatically generated from your website contact form.
            </div>
          </div>
        </body>
      </html>
    `;

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { email: "viveksethaliya@outlook.com", name: "Shree IT Website" },
        to: [{ email: "viveksethaliya@outlook.com" }], 
        replyTo: { email, name },
        subject: `Website Inquiry: ${subject}`,
        htmlContent,
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error("Brevo API Error:", errorData);
      return NextResponse.json({ error: "Failed to process the request with the email provider." }, { status: 502 });
    }

    // Optional: Enroll in Brevo CRM if user checked the subscribe box
    if (result.data.subscribe) {
      try {
        const nameParts = name.split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ") || "";

        const crmResponse = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "api-key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            attributes: {
              FIRSTNAME: firstName,
              LASTNAME: lastName,
            },
            updateEnabled: true, // Updates the contact if they already exist
          }),
        });
        
        if (!crmResponse.ok) {
          console.warn("Failed to add contact to Brevo CRM:", await crmResponse.text());
        }
      } catch (crmError) {
        console.error("Error adding to Brevo CRM:", crmError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ error: "An unexpected server error occurred." }, { status: 500 });
  }
}
