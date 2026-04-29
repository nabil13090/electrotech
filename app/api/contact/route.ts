import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/api/schemas";
import { escapeHtml } from "@/lib/html-escape";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { nom, email, telephone, sujet, message } = parsed.data;

    // Configure email transporter
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP credentials not configured. Email sending disabled.");
      // Return success even if email is not configured (for development)
      return NextResponse.json(
        { message: "Message reçu (email non configuré)" },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const safeNom = escapeHtml(nom);
    const safeEmail = escapeHtml(email);
    const safeTel = telephone ? escapeHtml(telephone) : "";
    const safeSujet = escapeHtml(sujet);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    // Prepare email content
    const emailHtml = `
      <h2>Nouveau message de contact - Electrotech</h2>
      <h3>Informations</h3>
      <ul>
        <li><strong>Nom:</strong> ${safeNom}</li>
        <li><strong>Email:</strong> ${safeEmail}</li>
        ${safeTel ? `<li><strong>Téléphone:</strong> ${safeTel}</li>` : ""}
        <li><strong>Sujet:</strong> ${safeSujet}</li>
      </ul>
      <h3>Message</h3>
      <p>${safeMessage}</p>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || email,
      to: process.env.CONTACT_EMAIL || "contact@electrotech13.fr",
      replyTo: email,
      subject: `Contact - ${sujet}`,
      html: emailHtml,
    });

    // Send confirmation email to client
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@electrotech13.fr",
      to: email,
      subject: "Confirmation de votre message - Electrotech",
      html: `
        <h2>Merci pour votre message !</h2>
        <p>Bonjour ${safeNom},</p>
        <p>Nous avons bien reçu votre message concernant : <strong>${safeSujet}</strong></p>
        <p>Notre équipe vous répondra dans les plus brefs délais.</p>
        <p>Cordialement,<br/>L'équipe Electrotech</p>
      `,
    });

    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending contact message:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
