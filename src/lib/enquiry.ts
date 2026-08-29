import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

type EnquiryInput = {
  name: string;
  email: string;
  phone?: string;
  type?: string;
  budget?: string;
  timeline?: string;
  message: string;
  website?: string;
};

export const sendEnquiry = createServerFn({ method: "POST" })
  .validator((data: EnquiryInput) => {
    if (data.website?.trim()) {
        throw new Error("Unable to process enquiry.");
    }

    const name = data.name?.trim();
    const email = data.email?.trim();
    const message = data.message?.trim();
    
    if (!name || !email || !message) {
      throw new Error(
        "Please complete name, email and project details.",
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    return {
      ...data,
      name,
      email,
      message,
    };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      throw new Error(
        "Email service is not configured. Please try again later.",
      );
    }

    const resend = new Resend(apiKey);

    /*
     * ---------------------------------------------------------
     * 1. EMAIL TO SADAR CONSTRUCTIONS
     * ---------------------------------------------------------
     */

    const adminEmail = await resend.emails.send({
      from: "Sadar Constructions <onboarding@resend.dev>",
      to: ["hashirahmad637@gmail.com"],
      replyTo: data.email,
      subject: `New Project Enquiry — ${data.name}`,

      html: `
        <div style="
          margin: 0;
          padding: 40px 20px;
          background: #f6f3ee;
          font-family: Arial, Helvetica, sans-serif;
          color: #222222;
        ">
          <div style="
            max-width: 680px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e5e0d8;
          ">

            <!-- Header -->
            <div style="
              padding: 32px 36px;
              border-bottom: 1px solid #e5e0d8;
            ">
              <div style="
                font-size: 12px;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #8b6f47;
                margin-bottom: 12px;
              ">
                Sadar Constructions
              </div>

              <h1 style="
                margin: 0;
                font-size: 28px;
                line-height: 1.2;
                font-weight: 500;
                color: #222222;
              ">
                New Project Enquiry
              </h1>

              <p style="
                margin: 10px 0 0;
                font-size: 14px;
                color: #777777;
              ">
                Submitted through the Sadar Constructions website.
              </p>
            </div>

            <!-- Client Information -->
            <div style="padding: 32px 36px;">

              <h2 style="
                margin: 0 0 20px;
                font-size: 14px;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                color: #8b6f47;
              ">
                Client Information
              </h2>

              <table style="
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
              ">
                <tr>
                  <td style="
                    padding: 12px 0;
                    width: 150px;
                    color: #777777;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    Name
                  </td>
                  <td style="
                    padding: 12px 0;
                    color: #222222;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    ${escapeHtml(data.name)}
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 12px 0;
                    color: #777777;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    Email
                  </td>
                  <td style="
                    padding: 12px 0;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    <a
                      href="mailto:${escapeHtml(data.email)}"
                      style="color: #222222;"
                    >
                      ${escapeHtml(data.email)}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 12px 0;
                    color: #777777;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    Phone
                  </td>
                  <td style="
                    padding: 12px 0;
                    color: #222222;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    ${escapeHtml(data.phone || "Not provided")}
                  </td>
                </tr>
              </table>

              <!-- Project -->
              <h2 style="
                margin: 36px 0 20px;
                font-size: 14px;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                color: #8b6f47;
              ">
                Project Information
              </h2>

              <table style="
                width: 100%;
                border-collapse: collapse;
                font-size: 14px;
              ">
                <tr>
                  <td style="
                    padding: 12px 0;
                    width: 150px;
                    color: #777777;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    Project Type
                  </td>
                  <td style="
                    padding: 12px 0;
                    color: #222222;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    ${escapeHtml(data.type || "Not specified")}
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 12px 0;
                    color: #777777;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    Budget
                  </td>
                  <td style="
                    padding: 12px 0;
                    color: #222222;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    ${escapeHtml(data.budget || "Not specified")}
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 12px 0;
                    color: #777777;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    Timeline
                  </td>
                  <td style="
                    padding: 12px 0;
                    color: #222222;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    ${escapeHtml(data.timeline || "Not specified")}
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <h2 style="
                margin: 36px 0 16px;
                font-size: 14px;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                color: #8b6f47;
              ">
                Project Details
              </h2>

              <div style="
                padding: 20px;
                background: #f8f6f2;
                border-left: 3px solid #8b6f47;
                font-size: 14px;
                line-height: 1.8;
                color: #444444;
                white-space: pre-wrap;
                ">${escapeHtml(data.message?.trim() || "")}</div>

            </div>

            <!-- Footer -->
            <div style="
              padding: 24px 36px;
              background: #222222;
              color: #ffffff;
            ">
              <div style="
                font-size: 12px;
                letter-spacing: 1.5px;
                text-transform: uppercase;
              ">
                Sadar Constructions
              </div>

              <div style="
                margin-top: 8px;
                font-size: 12px;
                color: #aaaaaa;
              ">
                Bhopal · Built with vision. Executed with precision.
              </div>
            </div>

          </div>
        </div>
      `,
    });

    if (adminEmail.error) {
      console.error("Admin email error:", adminEmail.error);
      throw new Error(
        "Unable to send enquiry. Please try again.",
      );
    }

    /*
     * ---------------------------------------------------------
     * 2. CONFIRMATION EMAIL TO CLIENT
     * ---------------------------------------------------------
     */

    const clientEmail = await resend.emails.send({
      from: "Sadar Constructions <onboarding@resend.dev>",
      to: [data.email],
      subject: "We received your enquiry — Sadar Constructions",

      html: `
        <div style="
          margin: 0;
          padding: 40px 20px;
          background: #f6f3ee;
          font-family: Arial, Helvetica, sans-serif;
          color: #222222;
        ">
          <div style="
            max-width: 620px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e5e0d8;
          ">

            <div style="
              padding: 36px;
              border-bottom: 1px solid #e5e0d8;
            ">
              <div style="
                font-size: 12px;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #8b6f47;
              ">
                Sadar Constructions
              </div>
            </div>

            <div style="padding: 42px 36px;">

              <h1 style="
                margin: 0;
                font-size: 30px;
                line-height: 1.25;
                font-weight: 500;
                color: #222222;
              ">
                Thank you, ${escapeHtml(data.name)}.
              </h1>

              <p style="
                margin: 22px 0 0;
                font-size: 15px;
                line-height: 1.8;
                color: #555555;
              ">
                We've received your project enquiry and appreciate you
                taking the time to share the details with us.
              </p>

              <p style="
                margin: 16px 0 0;
                font-size: 15px;
                line-height: 1.8;
                color: #555555;
              ">
                Our team will review your requirements and get back to
                you shortly.
              </p>

              <div style="
                margin-top: 32px;
                padding: 20px;
                background: #f8f6f2;
                border-left: 3px solid #8b6f47;
              ">
                <div style="
                  font-size: 12px;
                  letter-spacing: 1px;
                  text-transform: uppercase;
                  color: #8b6f47;
                  margin-bottom: 8px;
                ">
                  Your enquiry
                </div>

                <div style="
                  font-size: 14px;
                  line-height: 1.7;
                  color: #444444;
                ">
                  ${escapeHtml(data.type || "Project enquiry")}
                  ${
                    data.timeline
                      ? ` · ${escapeHtml(data.timeline)}`
                      : ""
                  }
                </div>
              </div>

              <p style="
                margin: 32px 0 0;
                font-size: 15px;
                line-height: 1.8;
                color: #555555;
              ">
                Regards,<br />
                <strong style="color: #222222;">
                  Azhar
                </strong><br />
                Sadar Constructions<br />
                Bhopal
              </p>

            </div>

            <div style="
              padding: 24px 36px;
              background: #222222;
              color: #ffffff;
              font-size: 12px;
            ">
              Built with vision. Executed with precision.
            </div>

          </div>
        </div>
      `,
    });

    if (clientEmail.error) {
      /*
       * Important:
       * Admin email was already successfully sent.
       * We don't fail the whole enquiry because the
       * confirmation email failed.
       */
      console.error(
        "Client confirmation email error:",
        clientEmail.error,
      );
    }

    return {
      success: true,
    };
  });

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}