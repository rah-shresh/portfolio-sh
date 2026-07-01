import "@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const apiKey = Deno.env.get("RESEND_API_KEY");

if (!apiKey) {
  throw new Error("RESEND_API_KEY is not configured.");
}

const resend = new Resend(apiKey);

Deno.serve(async (req) => {
  // Handle browser preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Method Not Allowed",
      }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const {
      name,
      email,
      company,
      role,
      project_type,
      budget,
      salary,
      timeline,
      message,
      contact_type,
    } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name, Email and Message are required.",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",

      // Replace with your Gmail
      to: ["shresrahangdale@gmail.com"],

      subject: "🚀 New Portfolio Inquiry",

      html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;padding:30px;border-radius:12px;border:1px solid #e5e5e5;background:#ffffff">

        <h2 style="color:#E8541A;margin-bottom:5px;">
          🚀 New Portfolio Inquiry
        </h2>

        <p style="color:#666;">
          A new contact request has been submitted from your portfolio.
        </p>

        <hr>

        <table style="width:100%;border-collapse:collapse;">

          <tr>
            <td><strong>Contact Type</strong></td>
            <td>${contact_type ?? "-"}</td>
          </tr>

          <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
          </tr>

          <tr>
            <td><strong>Company</strong></td>
            <td>${company ?? "-"}</td>
          </tr>

          <tr>
            <td><strong>Role</strong></td>
            <td>${role ?? "-"}</td>
          </tr>

          <tr>
            <td><strong>Project Type</strong></td>
            <td>${project_type ?? "-"}</td>
          </tr>

          <tr>
            <td><strong>Budget</strong></td>
            <td>${budget ?? "-"}</td>
          </tr>

          <tr>
            <td><strong>Salary</strong></td>
            <td>${salary ?? "-"}</td>
          </tr>

          <tr>
            <td><strong>Timeline</strong></td>
            <td>${timeline ?? "-"}</td>
          </tr>

        </table>

        <hr>

        <h3>📝 Message</h3>

        <div style="
          background:#f8f8f8;
          padding:15px;
          border-radius:8px;
          white-space:pre-wrap;
        ">
${message}
        </div>

        <br>

        <small style="color:#777;">
          This email was automatically generated from your portfolio website.
        </small>

      </div>
      `,
    });

    if (error) {
      console.error(error);

      return new Response(
        JSON.stringify({
          success: false,
          message: error.message,
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully.",
        data,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        success: false,
        message:
          err instanceof Error ? err.message : "Unknown server error.",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});